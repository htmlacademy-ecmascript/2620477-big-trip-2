import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTempalate (sortType, currentSortType) {
  return `<div class="trip-sort__item  trip-sort__item--${ sortType }">
      <input id="sort-${ sortType }"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${ sortType }"
      data-sort-type="${ sortType }"
      ${currentSortType === sortType ? 'checked' : ''}
      ${sortType === 'event' || sortType === 'offers' ? 'disabled' : ''}
      />
      <label class="trip-sort__btn" for="sort-${ sortType }">${ sortType }</label>
    </div>`;
}

function createListSortTemplate(sortTypes, currentSortType) {
  const sortItemsTemplate = sortTypes
    .map((sortType) => createSortItemTempalate(sortType, currentSortType))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${ sortItemsTemplate }
  </form>`;
}

export default class ListSortView extends AbstractView {
  #sortTypes = null;
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({sortTypes, currentSortType, onSortTypeChange}) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#sortTypes, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
