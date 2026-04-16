/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-talent
 * Base: tabs
 * Source: https://www.roberthalf.com/us/en
 * Selector: rhcl-block-tabbed-content
 * Structure: Each row = [tab-name | content]
 */
export default function parse(element, { document }) {
  // Find all tab items (found: rhcl-tab-item inside tabbedcontenthorizontal divs)
  const tabItems = element.querySelectorAll('rhcl-tab-item');
  const cells = [];

  tabItems.forEach((tab) => {
    // Extract tab name (found: span as first child of rhcl-tab-item)
    const tabNameEl = tab.querySelector(':scope > span');
    const tabName = tabNameEl ? tabNameEl.textContent.trim() : '';

    // Extract description (found: rhcl-typography.rhcl-typography--body0)
    const desc = tab.querySelector('rhcl-typography, p');

    // Extract job title links (found: rhcl-content-list-item > a)
    const jobLinks = tab.querySelectorAll('rhcl-content-list-item a, rhcl-content-list a');

    // Extract learn more link (found: direct a child with href to service page)
    const learnMoreLink = tab.querySelector(':scope > a');

    // Build content cell
    const contentCell = [];
    if (desc) contentCell.push(desc);

    // Add job links as a list
    if (jobLinks.length > 0) {
      const ul = document.createElement('ul');
      jobLinks.forEach((link) => {
        const li = document.createElement('li');
        li.append(link);
        ul.append(li);
      });
      contentCell.push(ul);
    }

    if (learnMoreLink) contentCell.push(learnMoreLink);

    cells.push([tabName, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-talent', cells });
  element.replaceWith(block);
}
