import { filter } from './utils.js';

/**
 * Генерация массива фильтров для точек назначения
 * @typedef {Object} Filter
 * @property {number} Filter.count
 * @property {string} Filter.type
 * @param {RandomRoutePoint[]} routePoints - an array of random points
 * @returns {Filter[]}
 */

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export { generateFilter };
