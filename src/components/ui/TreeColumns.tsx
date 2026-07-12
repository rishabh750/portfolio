import { useState } from 'react'
import type { ReactNode } from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { Card } from './Card'

// A node is a LEAF when it has `content` (renders as a content card) and a
// BRANCH when it has `children` (renders as a title-only card that reveals
// the next column on hover). Columns expand left -> right; the final leaf
// column grows to fill the remaining width.
export interface TreeNode {
  title: string
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

// Extend a path so it always terminates on a leaf, choosing the first child
// at each branch. Keeps a content card visible (and filling width) at all times.
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

export function TreeColumns({ nodes, ariaLabel, defaultPath = [0] }: TreeColumnsProps) {
  const [path, setPath] = useState<number[]>(() => drillToLeaf(nodes, defaultPath))

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

  // Hovering/focusing a branch truncates deeper selection, then auto-drills
  // to a leaf so the right-hand content card is always shown.
  const select = (col: number, idx: number) => setPath(drillToLeaf(nodes, [...path.slice(0, col), idx]))

  return (
    <div className="tree" role="tree" aria-label={ariaLabel}>
      {columns.map((col, c) => {
        const leafCol = col.length > 0 && isLeaf(col[0])
        return (
          <div className={`tree__col${leafCol ? ' tree__col--leaf' : ''}`} role="group" key={c}>
            {col.map((node, i) => {
              if (isLeaf(node)) {
                return (
                  <Card key={i} className={`tree__leaf${node.className ? ` ${node.className}` : ''}`} sx={{ p: 3 }}>
                    {node.content}
                  </Card>
                )
              }
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
                  <span className="tree__branch-title">{node.title}</span>
                  <ChevronRightRoundedIcon fontSize="small" className="tree__chevron" />
                </Card>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
