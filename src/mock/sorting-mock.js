import { SortingType } from '../constants.js';

function generateSortTypesList() {
  return Object.values(SortingType);
}

export {
  generateSortTypesList,
};
