/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base: hero
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-full-width-hero
 */
export default function parse(element, { document }) {
  // Extract background image (found: picture > img inside rhcl-block-full-width-hero)
  const bgImage = element.querySelector('picture') || element.querySelector('img');

  // Extract heading (found: h1.rhcl-typography--display0)
  const heading = element.querySelector('h1, h2');

  // Extract description text (found: rhcl-typography.hydrated as first child text)
  const description = element.querySelector('rhcl-typography, p');

  // Build cells matching hero block structure:
  // Row 1: background image
  // Row 2: heading + description + CTAs
  const cells = [];

  // Row 1: image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: content (heading + description in single cell)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description && description !== heading) contentCell.push(description);
  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
