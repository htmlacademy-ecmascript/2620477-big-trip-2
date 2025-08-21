import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filter, currentFilterType) {
  const { type, name, count } = filter;

  return `<div class="trip-filters__filter">
      <input
        id="filter-${ name }"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${ type }"
        ${ type === currentFilterType ? 'checked' : '' }
        ${ count === 0 ? 'disabled' : '' }
      />
      <label class="trip-filters__filter-label" for="filter-${ name }">${ type }</label>
    </div>`;
}

function createListFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class ListFilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilterType, this.#handleFilterTypeChange);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
