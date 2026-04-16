/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Robert Half site cleanup.
 * Selectors from captured DOM of https://www.roberthalf.com/us/en
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner (found: #onetrust-consent-sdk, #onetrust-banner-sdk)
    // Remove chat widget iframe (found: #poly-ai-chat)
    // Remove skip navigation (found: #skip, #skipToMainContent)
    // Remove AEM placeholders (found: .cq-placeholder)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#poly-ai-chat',
      '#skip',
      '#skipToMainContent',
      '.cq-placeholder',
    ]);
  }
  if (hookName === H.after) {
    // Remove header experience fragment (found: .cmp-experiencefragment--header)
    // Remove footer experience fragment (found: .cmp-experiencefragment--footer)
    // Remove navigation block (found: rhcl-block-navigation)
    // Remove footer block (found: rhcl-footer)
    // Remove iframes, link tags, noscript, style tags
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
      '.cmp-experiencefragment--footer',
      'rhcl-block-navigation',
      'rhcl-footer',
      'iframe',
      'link',
      'noscript',
      'style',
    ]);
  }
}
