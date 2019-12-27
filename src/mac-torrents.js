import ByCategory from './src/getByCategory';
import getLastTorrents from './src/getLast';
/**
 * Return array from category
 *
 * @param {string} category -Category:
 * string application/adobe
 * @example
 *
 * const result = await getByCategory("application/adobe")
 */
async function getByCategory(category) {
  return ByCategory(category);
}

export { getByCategory, getLastTorrents };
