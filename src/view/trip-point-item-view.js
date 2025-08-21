import AbstractView from '../framework/view/abstract-view.js';

function createTripPointItemTemplate() {
  return `<li class="trip-events__item">
  </li>`;
}

export default class TripPointItemtView extends AbstractView {
  get template() {
    return createTripPointItemTemplate();
  }
}
