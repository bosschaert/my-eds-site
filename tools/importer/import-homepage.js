/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import cardsInsightParser from './parsers/cards-insight.js';
import columnsStatsParser from './parsers/columns-stats.js';
import columnsPairedParser from './parsers/columns-paired.js';
import tabsTalentParser from './parsers/tabs-talent.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/roberthalf-cleanup.js';
import sectionsTransformer from './transformers/roberthalf-sections.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Robert Half homepage with hero, job search, services overview, and promotional content',
  urls: [
    'https://www.roberthalf.com/us/en',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['rhcl-block-full-width-hero'],
    },
    {
      name: 'cards-insight',
      instances: ['rhcl-block-scrolling-cards-collection:has(.featuredcard)'],
    },
    {
      name: 'columns-stats',
      instances: ['rhcl-block-data-visualization'],
    },
    {
      name: 'columns-paired',
      instances: ['rhcl-block-paired-content'],
    },
    {
      name: 'tabs-talent',
      instances: ['rhcl-block-tabbed-content'],
    },
    {
      name: 'carousel-testimonial',
      instances: ['rhcl-block-scrolling-cards-collection:has(.cardtestimonial)'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'rhcl-block-full-width-hero',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Hiring Trends and Insights',
      selector: ['#scrollingcardscollectionblock-2f28d7efd8', '.cmp-rhcl-scrolling-cards-collection-block-wrapper'],
      style: null,
      blocks: ['cards-insight'],
      defaultContent: ['rhcl-block-scrolling-cards-collection > h2'],
    },
    {
      id: 'section-3',
      name: 'Why Robert Half - Stats',
      selector: 'rhcl-block-data-visualization',
      style: null,
      blocks: ['columns-stats'],
      defaultContent: ['rhcl-block-data-visualization > h2'],
    },
    {
      id: 'section-4',
      name: 'Why Robert Half - Value Props',
      selector: 'rhcl-block-paired-content',
      style: null,
      blocks: ['columns-paired'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Specialized Talent Tabs',
      selector: '.cmp-rhcl-tabbed-content-block-wrapper',
      style: 'grey',
      blocks: ['tabs-talent'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Testimonials',
      selector: ['#scrollingcardscollectionblock-dc2c367a2e', '.cmp-rhcl-scrolling-cards-collection-block-wrapper:last-of-type'],
      style: null,
      blocks: ['carousel-testimonial'],
      defaultContent: ['#scrollingcardscollectionblock-dc2c367a2e rhcl-block-scrolling-cards-collection > h2'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'cards-insight': cardsInsightParser,
  'columns-stats': columnsStatsParser,
  'columns-paired': columnsPairedParser,
  'tabs-talent': tabsTalentParser,
  'carousel-testimonial': carouselTestimonialParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
