import { Node, mergeAttributes } from '@tiptap/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const MathExtension = Node.create({
  name: 'math',

  group: 'block',

  content: 'text*',

  marks: '',

  code: true,

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="math"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'math' }), 0];
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div');
      dom.classList.add('math-node');

      const content = node.textContent;
      if (content) {
        try {
          katex.render(content, dom, { displayMode: true, throwOnError: false });
        } catch (error) {
          dom.textContent = content;
        }
      } else {
        dom.textContent = 'Empty math block';
      }

      return {
        dom,
        contentDOM: document.createElement('div'), // We don't allow editing directly inside the rendered block yet, this needs a custom view.
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          const updatedContent = updatedNode.textContent;
          try {
            katex.render(updatedContent, dom, { displayMode: true, throwOnError: false });
          } catch (error) {
             dom.textContent = updatedContent;
          }
          return true;
        },
      };
    };
  },
});
