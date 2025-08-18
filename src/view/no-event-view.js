import AbstractView from '../framework/view/abstract-view.js';
import { TextNoEvent } from '../mock/constants.js';

function createNoEventTemplate() {
  return (`<p class="trip-events__msg">${TextNoEvent.everything}</p>`);
}

export default class NoEvent extends AbstractView {
  get template() {
    return createNoEventTemplate();
  }
}
