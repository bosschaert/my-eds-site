/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-insight
 * Base: cards
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-scrolling-cards-collection:has(.featuredcard)
 * Structure: Each row = [image | heading + description]
 */
export default function parse(element, { document }) {
  // Find all card items (found: div.featuredcard > rhcl-content-card)
  const cardItems = element.querySelectorAll('rhcl-content-card');
  const cells = [];

  cardItems.forEach((card) => {
    // Extract image (found: img.rhcl-content-card__image)
    const img = card.querySelector('img');

    // Extract title link (found: a.rhcl-typography--display5)
    const titleLink = card.querySelector('a');

    // Extract description (found: span.rhcl-typography--body2)
    const desc = card.querySelector('span.rhcl-typography--body2, span');

    // Build card row: [image | title + description]
    const contentCell = [];
    if (titleLink) contentCell.push(titleLink);
    if (desc) contentCell.push(desc);

    if (img) {
      cells.push([img, contentCell]);
    } else {
      cells.push([contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-insight', cells });
  element.replaceWith(block);
}
