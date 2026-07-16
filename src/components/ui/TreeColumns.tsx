import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { useIsMobile } from '../../hooks/useIsMobile'
import { Card } from './Card'

// A node is a LEAF when it has `content` (renders as a content card) and a
// BRANCH when it has `children`. On desktop the tree renders as Miller columns
// expanding left -> right; on mobile each branch level renders as a 3-card
// carousel whose centred (active) card is enlarged, with its content below.
export interface TreeNode {
  title: string
  /** optional second line under the title on a branch card (subheading font) */
  subtitle?: string
  children?: TreeNode[]
  content?: ReactNode
  /** extra class on the leaf content card */
  className?: string
}

interface TreeColumnsProps {
  nodes: TreeNode[]
  ariaLabel?: string
  /** column index to pre-open on first render (default: first item) */
  defaultPath?: number[]
}

/** Wrap leaf content as a single-child branch reveals a content card. */
export const leaf = (title: string, content: ReactNode, className?: string): TreeNode[] => [
  { title, content, className },
]

const isLeaf = (n: TreeNode) => !n.children || n.children.length === 0
const isLeafColumn = (col: TreeNode[]) => col.length > 0 && isLeaf(col[0])

// Extend a path so it always terminates on a leaf, choosing the first child
// at each branch. Keeps a content card visible at all times.
function drillToLeaf(nodes: TreeNode[], path: number[]): number[] {
  const result: number[] = []
  let level: TreeNode[] | undefined = nodes
  let i = 0
  while (level && level.length) {
    const idx = i < path.length ? path[i] : 0
    const node: TreeNode | undefined = level[idx]
    if (!node) break
    result.push(idx)
    if (isLeaf(node)) break
    level = node.children
    i++
  }
  return result
}

const leafCard = (node: TreeNode, key: number) => (
  <Card
    key={key}
    className={`tree__leaf${node.className ? ` ${node.className}` : ''}`}
    sx={{ px: 3, pt: 1.5, pb: 3 }}
  >
    {node.content}
  </Card>
)

export function TreeColumns({ nodes, ariaLabel, defaultPath = [0] }: TreeColumnsProps) {
  const [path, setPath] = useState<number[]>(() => drillToLeaf(nodes, defaultPath))
  const isMobile = useIsMobile()

  // Derive the visible columns by walking the active path.
  const columns: TreeNode[][] = [nodes]
  let current = nodes
  for (let c = 0; c < path.length; c++) {
    const node = current[path[c]]
    if (node?.children && node.children.length) {
      columns.push(node.children)
      current = node.children
    } else {
      break
    }
  }

  // Selecting a branch truncates deeper selection, then auto-drills to a leaf
  // so a content card is always shown.
  const select = (col: number, idx: number) => setPath(drillToLeaf(nodes, [...path.slice(0, col), idx]))

  // -------- mobile: stacked carousels + content card --------
  if (isMobile) {
    return (
      <div className="tree tree--mobile" role="tree" aria-label={ariaLabel}>
        {columns.map((col, c) => {
          if (isLeafColumn(col)) {
            return (
              <div className="tree__leaf-wrap" key={c}>
                {col.map((node, i) => leafCard(node, i))}
              </div>
            )
          }
          const active = path[c] ?? 0
          return (
            <div className="carousel" role="group" key={c}>
              <div className="carousel__track" style={{ '--active': active } as CSSProperties}>
                {col.map((node, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`carousel__card${i === active ? ' carousel__card--active' : ''}`}
                    aria-current={i === active}
                    onClick={() => select(c, i)}
                  >
                    <span className="carousel__title">{node.title}</span>
                    {node.subtitle && <span className="carousel__subtitle">{node.subtitle}</span>}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // -------- desktop: Miller columns --------
  return (
    <div className="tree" role="tree" aria-label={ariaLabel}>
      {columns.map((col, c) => (
        <div
          className={`tree__col tree__col--l${c}${isLeafColumn(col) ? ' tree__col--leaf' : ''}`}
          role="group"
          key={c}
        >
          {col.map((node, i) => {
            if (isLeaf(node)) return leafCard(node, i)
            const active = path[c] === i
            return (
              <Card
                key={i}
                role="treeitem"
                aria-expanded={active}
                tabIndex={0}
                className={`tree__branch${active ? ' tree__branch--active' : ''}`}
                sx={{ px: 2, py: 1.5 }}
                onMouseEnter={() => select(c, i)}
                onFocus={() => select(c, i)}
                onClick={() => select(c, i)}
              >
                <span className="tree__branch-label">
                  <span className="tree__branch-title">{node.title}</span>
                  {node.subtitle && <span className="tree__branch-subtitle">{node.subtitle}</span>}
                </span>
                <ChevronRightRoundedIcon fontSize="small" className="tree__chevron" />
              </Card>
            )
          })}
        </div>
      ))}
    </div>
  )
}
