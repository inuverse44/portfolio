type Node = { type: string; [key: string]: unknown };
type Parent = Node & { children: Node[] };
type CodeNode = Node & { lang: string | null; value: string };

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function remarkMermaid() {
  return (tree: Node) => {
    const children = (tree as Parent).children;
    if (!Array.isArray(children)) return;
    for (let i = 0; i < children.length; i++) {
      const node = children[i] as CodeNode;
      if (node.type === 'code' && node.lang === 'mermaid') {
        children[i] = {
          type: 'html',
          value: `<div class="mermaid">\n${escape(node.value)}\n</div>`,
        };
      }
    }
  };
}
