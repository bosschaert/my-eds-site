/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-stats
 * Base: columns
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-data-visualization
 * Structure: 1 row with 3 columns [heading + description per column]
 */
export default function parse(element, { document }) {
  // Find all data point cards (found: rhcl-content-card inside rhcl-block-data-visualization)
  const dataCards = element.querySelectorAll('rhcl-content-card');
  const row = [];

  dataCards.forEach((card) => {
    // Extract large number heading (found: h3.rhcl-typography--data-point1 or h3.rhcl-typography--data-point3)
    const statHeading = card.querySelector('h3, h2');

    // Extract description (found: span.rhcl-typography--body0 > p)
    const desc = card.querySelector('span p, span, p');

    const col = [];
    if (statHeading) col.push(statHeading);
    if (desc) col.push(desc);
    row.push(col);
  });

  const cells = [];
  if (row.length > 0) {
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stats', cells });
  element.replaceWith(block);
}
