type Node = { type: string; [key: string]: unknown };
type Parent = Node & { children: Node[] };
type CodeNode = Node & { lang: string | null; value: string };

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function remarkKotlin() {
  return (tree: Node) => {
    const children = (tree as Parent).children;
    if (!Array.isArray(children)) return;
    for (let i = 0; i < children.length; i++) {
      const node = children[i] as CodeNode;
      if (node.type === 'code' && node.lang === 'kotlin') {
        children[i] = {
          type: 'html',
          value: `<pre><code class="language-kotlin">${escape(node.value)}</code></pre>`,
        };
      }
    }
  };
}
