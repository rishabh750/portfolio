# Portfolio — Architecture & Design

A single-page portfolio that renders résumé/LinkedIn content as an interactive
tree. On desktop the tree is a set of **Miller columns** (cascading panes that
expand left → right on hover); on mobile the same tree becomes a stack of
**swipeable carousels**. All content is data-driven from one JSON file.

---

## 1. Tech stack

| Concern            | Choice                                             |
| ------------------ | -------------------------------------------------- |
| Framework          | React 18 + TypeScript (strict, `noUnusedLocals`)   |
| Build tool         | Vite 5                                             |
| Component surfaces  | MUI (`@mui/material`) — only `Card` + theme        |
| Styling            | Plain CSS with custom properties (design tokens)   |
| State              | React Context (read-only resume data) + local state |
| Data               | `public/data.json` fetched at runtime              |

MUI is used deliberately lightly: only the `Card` surface and a theme that
carries the font and primary colour. Everything visual is driven by CSS custom
properties so light/dark and the orange/yellow palette stay in one place.

---

## 2. High-level flow

```mermaid
flowchart TD
    JSON["public/data.json"] -->|fetch at runtime| RC["ResumeProvider (Context)"]
    RC -->|useResume()| PT["PortfolioTree"]
    PT -->|section builders| NODES["TreeNode[]  (branch / leaf tree)"]
    NODES --> TC["TreeColumns"]
    TC -->|useIsMobile| DECIDE{"viewport <= 720px?"}
    DECIDE -->|no| MC["Miller columns (desktop)"]
    DECIDE -->|yes| CAR["Stacked swipe carousels (mobile)"]
    MC --> LEAF["Leaf content card (Panels)"]
    CAR --> LEAF
```

1. `main.tsx` mounts the app inside `ThemeProvider` + `ResumeProvider`, and
   injects the theme font into CSS as `--font` via `GlobalStyles`.
2. `ResumeProvider` fetches `data.json` once, validates the shape against the
   `Resume` type, and exposes it through `useResume()`.
3. `PortfolioTree` turns the typed data into a `TreeNode[]` by calling one
   **section builder** per section, memoised so node references are stable.
4. `TreeColumns` walks the tree and renders it — Miller columns or carousels
   depending on `useIsMobile()`.

---

## 3. Directory structure

```
portfolio/
├─ public/
│  ├─ data.json          # the single content source (edit this to update the site)
│  ├─ photo.jpg          # header avatar
│  └─ bg.jpg             # page background
├─ docs/
│  └─ architecture.md    # this file
└─ src/
   ├─ main.tsx           # entry: providers + inject --font
   ├─ App.tsx            # frozen header + <PortfolioTree/>
   ├─ theme.ts           # single source of typography + MUI primary colour
   ├─ index.css          # imports the modular style layers
   ├─ data/
   │  ├─ types.ts        # Resume domain types (Profile, Experience, SkillSet, …)
   │  └─ ResumeContext.tsx  # fetch data.json + useResume() hook
   ├─ hooks/
   │  └─ useIsMobile.ts  # matchMedia breakpoint hook
   ├─ components/
   │  ├─ PortfolioTree.tsx   # assembles section builders into one tree
   │  ├─ sections/       # one builder per section (data -> TreeNode)
   │  │  ├─ aboutSection.tsx     projectsSection.tsx
   │  │  ├─ skillsSection.tsx    educationSection.tsx
   │  │  ├─ experienceSection.tsx awardsSection.tsx
   │  │  └─ index.ts     # barrel
   │  └─ ui/             # generic, resume-agnostic primitives
   │     ├─ TreeColumns.tsx  # the tree renderer (desktop + mobile switch)
   │     ├─ Carousel.tsx     # mobile swipe carousel (scroll-snap)
   │     ├─ Card.tsx  Panel.tsx  CardHead.tsx
   │     ├─ BulletList.tsx  ChipRow.tsx  SkillStacks.tsx
   │     └─ index.ts     # barrel
   └─ styles/            # modular CSS layers (imported by index.css in order)
      ├─ tokens.css      # design tokens (colour, glass, scrim) + light theme
      ├─ base.css        # reset, viewport lock, header, loading
      ├─ tree.css        # desktop Miller columns + leaf/panel
      ├─ content.css     # content primitives + section tweaks
      └─ responsive.css  # <=720px: scroll unlock + swipe carousel
```

Two clear seams:

- **`ui/` = generic, `sections/` = domain.** UI primitives know nothing about
  résumés; section builders know nothing about layout. They meet at `TreeNode`.
- **CSS mirrors the component layers** (tokens → shell → tree → content →
  responsive), imported in cascade order from `index.css`.

---

## 4. The tree abstraction

Everything hangs off one recursive shape (`ui/TreeColumns.tsx`):

```ts
interface TreeNode {
  title: string
  subtitle?: string       // second line on a branch card (e.g. company)
  children?: TreeNode[]    // BRANCH: reveals the next column/carousel
  content?: ReactNode      // LEAF: renders as a content card
  className?: string
}
```

- A node is a **branch** if it has `children`, a **leaf** if it has `content`.
- `leaf(title, content, className)` is a helper that wraps content so a branch
  can reveal a single content card.
- `drillToLeaf()` extends the active path so it **always ends on a leaf** —
  choosing the first child at each branch — which guarantees a content card is
  always visible (no dead-end "empty right pane").
- The active **path** (array of indices) is the only piece of interaction
  state. Selecting a branch truncates the path at that depth, then re-drills to
  a leaf. `columns` are derived from the path each render.

This is why adding a section is cheap: a builder just returns a `TreeNode`, and
the renderer handles navigation, drill-down, and the desktop/mobile split.

---

## 5. Responsive strategy

`useIsMobile()` (a `matchMedia` hook at 720px) selects the renderer inside
`TreeColumns`, so **the same tree and the same selection state** drive both:

- **Desktop — Miller columns.** Each level is a vertical column of branch
  cards; hovering/focusing expands the next column to the right. The terminal
  leaf column grows to fill remaining width. Per-level widths (160px / 310px)
  are set in `tree.css`.
- **Mobile — stacked swipe carousels.** Each branch level renders as a
  `Carousel`; the card snapped to the centre is the enlarged/active one, and
  the content it drills into appears below. Built on **native CSS scroll-snap**
  (`scroll-snap-type: x mandatory` + `scroll-snap-align: center`) so swiping is
  momentum-native. `Carousel` reports the centred card via `onSelect` (using
  `requestAnimationFrame`-throttled scroll detection) and only re-centres
  programmatically when the *item set* changes — never during the user's swipe,
  which is why `PortfolioTree` memoises the tree (stable references).

The viewport lock (`body { overflow: hidden }`, columns scroll internally) is
relaxed on mobile so the page scrolls vertically instead.

---

## 6. Styling system

- **Design tokens** (`tokens.css`) — all colour, the background scrim, and the
  leaf "glass" live in `:root` custom properties, with a
  `prefers-color-scheme: light` override. Nothing else hard-codes colour.
- **Layered cards** — the leaf is a translucent "group" card (`--group-glass`
  + backdrop blur) that holds opaque **`Panel`s**; each content block (a bullet
  group, a skills block, a degree) is its own panel.
- **Custom-property theming without specificity fights** — e.g. the card edge
  line (`--card-line`) and background (`--card-bg`) are variables the component
  sets, so hover/active states recolour by changing a variable rather than
  overriding rules.
- **Chip themes** — `ChipRow` applies `chip--technical` (orange) or
  `chip--managerial` (yellow-gold, `--accent-2`) consistently everywhere skills
  appear.
- **Typography** — defined once in `theme.ts` and shared with the CSS via the
  injected `--font` variable, so MUI and plain CSS use the same font.

---

## 7. Extending

- **Add a section:** write `xSection(data): TreeNode` in `components/sections/`,
  export it from the barrel, and add one line to `PortfolioTree`'s `sections`
  array.
- **Change content:** edit `public/data.json` — no code changes. Bullet lines
  are marked with a leading `- ` prefix; a line without it renders as plain
  context text (see `BulletList`).
- **Retheme:** edit the tokens in `styles/tokens.css` (and `theme.ts` for the
  MUI primary + font).
- **Change the mobile breakpoint:** the single `720` in `useIsMobile.ts` and the
  `@media` query in `responsive.css`.

---

## 8. Data contract

`public/data.json` conforms to the `Resume` interface in `data/types.ts`:

```
Resume {
  profile:    { name, title, location, availability, summary, highlights[], links{…} }
  skills:     { category, items[] }[]
  experience: { company, role, dates, location, deliverables[], impact[], skills? }[]
  education:  { degree, institution, location, dates }[]
  projects:   { name, org, dates, bullets[], skills? }[]
  awards:     string[]
}
```

`skills` on experience/projects is a `SkillSet { technical?, managerial? }`,
rendered as the two colour-themed chip rows.
