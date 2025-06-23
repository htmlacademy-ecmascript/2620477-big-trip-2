import { createElement } from '../render.js';

function createEditFormTemplate() {
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">Taxi</label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Amsterdam">
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="event__label  visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 10:30">
            &mdash;
            <label class="event__label  visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 11:00">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">&euro;</label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="20">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
      </form>
    </li>
  `;
}

export default class EditFormView {
  getTemplate() {
    return createEditFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
