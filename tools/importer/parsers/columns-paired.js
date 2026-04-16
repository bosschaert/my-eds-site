/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-paired
 * Base: columns
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-paired-content
 * Structure: 1 row with 2 columns [image | value propositions]
 */
export default function parse(element, { document }) {
  // Extract illustration image (found: img inside rhcl-block-paired-content, before content cards)
  const img = element.querySelector(':scope > img, :scope > picture, img');

  // Extract value proposition cards (found: rhcl-content-card with h2 + span)
  const propCards = element.querySelectorAll('rhcl-content-card');

  // Build content column with all value propositions
  const contentCol = [];
  propCards.forEach((card) => {
    const heading = card.querySelector('h2, h3');
    const desc = card.querySelector('span, p');
    if (heading) contentCol.push(heading);
    if (desc) contentCol.push(desc);
  });

  // Build cells: 1 row with 2 columns [image | content]
  const cells = [];
  if (img && contentCol.length > 0) {
    cells.push([img, contentCol]);
  } else if (contentCol.length > 0) {
    cells.push([contentCol]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-paired', cells });
  element.replaceWith(block);
}
