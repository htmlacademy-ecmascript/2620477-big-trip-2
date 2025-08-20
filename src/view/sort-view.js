import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../mock/constants.js';

function createSortingTemplate(sorting) {
  const sortType = Object.values(SortType);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorting.map((item) => `<div div class="trip-sort__item  trip-sort__item--${item.value}" >
    <input id="sort-${item.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.value}" ${sortType.includes(item.value) ? `data-sort-type="${item.value}"` : ''} ${item.isSelected ? 'checked' : ''} ${item.isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${item.value}">${item.value}</label>
    </div>`).join('')}
    </form>`);
}

export default class Sorting extends AbstractView {
  #handleSortTypeChange;
  #sorting;

  constructor({ onSortTypeChange, sorting }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sorting = sorting;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate(this.#sorting);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
