import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../constants.js';

const EmptyPointsListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createEmptyPointsListTemplate(filterType) {
  const createEmptyPointsListTextValue = EmptyPointsListTextType[filterType];

  return `<p class="trip-events__msg">
  ${ createEmptyPointsListTextValue }
  </p>`;
}

export default class EmptyPointsListView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPointsListTemplate(this.#filterType);
  }
}
