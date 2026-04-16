/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-testimonial
 * Base: carousel
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-scrolling-cards-collection with .cardtestimonial children
 * Structure: Each row = [content] (text-only testimonial slides)
 * Note: Testimonial cards are dynamically loaded; content may be empty in static HTML.
 */
export default function parse(element, { document }) {
  // Find all testimonial card containers (found: div.cardtestimonial)
  const testimonialCards = element.querySelectorAll('.cardtestimonial rhcl-content-card, rhcl-content-card');
  const cells = [];

  testimonialCards.forEach((card) => {
    // Extract quote text and attribution
    const quote = card.querySelector('blockquote, p, span');
    const attribution = card.querySelector('cite, .attribution, span:last-child');

    const contentCell = [];
    if (quote) contentCell.push(quote);
    if (attribution && attribution !== quote) contentCell.push(attribution);

    // Only add non-empty cards
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
  });

  // If no content was found (dynamically loaded), create a placeholder slide
  if (cells.length === 0) {
    const p = document.createElement('p');
    p.textContent = '[Testimonial content - dynamically loaded]';
    cells.push([[p]]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-testimonial', cells });
  element.replaceWith(block);
}
