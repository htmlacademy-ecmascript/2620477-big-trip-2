import AbstractView from '../framework/view/abstract-view.js';

function createEmptyPointsListTemplate() {
  return (
    `<p class="trip-events__msg">
      Loading...
    </p>`
  );
}

export default class LoadingView extends AbstractView {
  get template() {
    return createEmptyPointsListTemplate();
  }
}
