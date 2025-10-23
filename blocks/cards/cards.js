import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    let altText = '';
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else {
        div.className = 'cards-card-body';
        // Check for Alt: prefix in text content
        const textNodes = Array.from(div.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE);
        textNodes.forEach((node) => {
          const match = node.textContent.match(/Alt:\s*(.+)/);
          if (match) {
            altText = match[1].trim();
            node.remove();
          }
        });
        // Also check in paragraph tags
        div.querySelectorAll('p').forEach((p) => {
          const match = p.textContent.match(/Alt:\s*(.+)/);
          if (match) {
            altText = match[1].trim();
            p.remove();
          }
        });
      }
    });
    // Store alt text on the li for later use
    if (altText) li.dataset.altText = altText;
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const li = img.closest('li');
    const altText = li?.dataset.altText || img.alt;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, altText, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
