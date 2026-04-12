type Node = { type: string; [key: string]: unknown };
type Parent = Node & { children: Node[] };
type TextNode = Node & { value: string };
type LinkNode = Node & { url: string; title: null; children: TextNode[] };

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

function isParent(node: Node): node is Parent {
  return Array.isArray((node as Parent).children);
}

function processTextNode(node: TextNode): (TextNode | LinkNode)[] {
  const { value } = node;
  if (!value.includes('[[')) return [node];

  const parts: (TextNode | LinkNode)[] = [];
  let lastIndex = 0;
  const re = new RegExp(WIKILINK_RE.source, 'g');
  let match: RegExpExecArray | null;

  while ((match = re.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }

    const slug = match[1].trim();
    const displayText = match[2]?.trim() ?? slug;

    parts.push({
      type: 'link',
      url: `/posts/${slug}`,
      title: null,
      children: [{ type: 'text', value: displayText }],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: 'text', value: value.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [node];
}

function walk(node: Node): void {
  if (!isParent(node)) return;

  const newChildren: Node[] = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      const replaced = processTextNode(child as TextNode);
      newChildren.push(...replaced);
    } else {
      walk(child);
      newChildren.push(child);
    }
  }
  node.children = newChildren;
}

export function remarkWikiLinks() {
  return (tree: Node) => {
    walk(tree);
  };
}
