var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImage = element.querySelector("picture") || element.querySelector("img");
    const heading = element.querySelector("h1, h2");
    const description = element.querySelector("rhcl-typography, p");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description && description !== heading) contentCell.push(description);
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-insight.js
  function parse2(element, { document }) {
    const cardItems = element.querySelectorAll("rhcl-content-card");
    const cells = [];
    cardItems.forEach((card) => {
      const img = card.querySelector("img");
      const titleLink = card.querySelector("a");
      const desc = card.querySelector("span.rhcl-typography--body2, span");
      const contentCell = [];
      if (titleLink) contentCell.push(titleLink);
      if (desc) contentCell.push(desc);
      if (img) {
        cells.push([img, contentCell]);
      } else {
        cells.push([contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-insight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-stats.js
  function parse3(element, { document }) {
    const dataCards = element.querySelectorAll("rhcl-content-card");
    const row = [];
    dataCards.forEach((card) => {
      const statHeading = card.querySelector("h3, h2");
      const desc = card.querySelector("span p, span, p");
      const col = [];
      if (statHeading) col.push(statHeading);
      if (desc) col.push(desc);
      row.push(col);
    });
    const cells = [];
    if (row.length > 0) {
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-paired.js
  function parse4(element, { document }) {
    const img = element.querySelector(":scope > img, :scope > picture, img");
    const propCards = element.querySelectorAll("rhcl-content-card");
    const contentCol = [];
    propCards.forEach((card) => {
      const heading = card.querySelector("h2, h3");
      const desc = card.querySelector("span, p");
      if (heading) contentCol.push(heading);
      if (desc) contentCol.push(desc);
    });
    const cells = [];
    if (img && contentCol.length > 0) {
      cells.push([img, contentCol]);
    } else if (contentCol.length > 0) {
      cells.push([contentCol]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-paired", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-talent.js
  function parse5(element, { document }) {
    const tabItems = element.querySelectorAll("rhcl-tab-item");
    const cells = [];
    tabItems.forEach((tab) => {
      const tabNameEl = tab.querySelector(":scope > span");
      const tabName = tabNameEl ? tabNameEl.textContent.trim() : "";
      const desc = tab.querySelector("rhcl-typography, p");
      const jobLinks = tab.querySelectorAll("rhcl-content-list-item a, rhcl-content-list a");
      const learnMoreLink = tab.querySelector(":scope > a");
      const contentCell = [];
      if (desc) contentCell.push(desc);
      if (jobLinks.length > 0) {
        const ul = document.createElement("ul");
        jobLinks.forEach((link) => {
          const li = document.createElement("li");
          li.append(link);
          ul.append(li);
        });
        contentCell.push(ul);
      }
      if (learnMoreLink) contentCell.push(learnMoreLink);
      cells.push([tabName, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-talent", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-testimonial.js
  function parse6(element, { document }) {
    const testimonialCards = element.querySelectorAll(".cardtestimonial rhcl-content-card, rhcl-content-card");
    const cells = [];
    testimonialCards.forEach((card) => {
      const quote = card.querySelector("blockquote, p, span");
      const attribution = card.querySelector("cite, .attribution, span:last-child");
      const contentCell = [];
      if (quote) contentCell.push(quote);
      if (attribution && attribution !== quote) contentCell.push(attribution);
      if (contentCell.length > 0) {
        cells.push([contentCell]);
      }
    });
    if (cells.length === 0) {
      const p = document.createElement("p");
      p.textContent = "[Testimonial content - dynamically loaded]";
      cells.push([[p]]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/roberthalf-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#poly-ai-chat",
        "#skip",
        "#skipToMainContent",
        ".cq-placeholder"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        ".cmp-experiencefragment--footer",
        "rhcl-block-navigation",
        "rhcl-footer",
        "iframe",
        "link",
        "noscript",
        "style"
      ]);
    }
  }

  // tools/importer/transformers/roberthalf-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Robert Half homepage with hero, job search, services overview, and promotional content",
    urls: [
      "https://www.roberthalf.com/us/en"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: ["rhcl-block-full-width-hero"]
      },
      {
        name: "cards-insight",
        instances: ["rhcl-block-scrolling-cards-collection:has(.featuredcard)"]
      },
      {
        name: "columns-stats",
        instances: ["rhcl-block-data-visualization"]
      },
      {
        name: "columns-paired",
        instances: ["rhcl-block-paired-content"]
      },
      {
        name: "tabs-talent",
        instances: ["rhcl-block-tabbed-content"]
      },
      {
        name: "carousel-testimonial",
        instances: ["rhcl-block-scrolling-cards-collection:has(.cardtestimonial)"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "rhcl-block-full-width-hero",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Hiring Trends and Insights",
        selector: ["#scrollingcardscollectionblock-2f28d7efd8", ".cmp-rhcl-scrolling-cards-collection-block-wrapper"],
        style: null,
        blocks: ["cards-insight"],
        defaultContent: ["rhcl-block-scrolling-cards-collection > h2"]
      },
      {
        id: "section-3",
        name: "Why Robert Half - Stats",
        selector: "rhcl-block-data-visualization",
        style: null,
        blocks: ["columns-stats"],
        defaultContent: ["rhcl-block-data-visualization > h2"]
      },
      {
        id: "section-4",
        name: "Why Robert Half - Value Props",
        selector: "rhcl-block-paired-content",
        style: null,
        blocks: ["columns-paired"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Specialized Talent Tabs",
        selector: ".cmp-rhcl-tabbed-content-block-wrapper",
        style: "grey",
        blocks: ["tabs-talent"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Testimonials",
        selector: ["#scrollingcardscollectionblock-dc2c367a2e", ".cmp-rhcl-scrolling-cards-collection-block-wrapper:last-of-type"],
        style: null,
        blocks: ["carousel-testimonial"],
        defaultContent: ["#scrollingcardscollectionblock-dc2c367a2e rhcl-block-scrolling-cards-collection > h2"]
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "cards-insight": parse2,
    "columns-stats": parse3,
    "columns-paired": parse4,
    "tabs-talent": parse5,
    "carousel-testimonial": parse6
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
