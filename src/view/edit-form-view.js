import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDueDate } from '../mock/utils.js';
import { DATE_FORMAT, TYPE, CLASS_NAME } from '../mock/constants.js';

function createTypeTemplate(routePoint, destination, destinationAll) {
  const { type, id } = routePoint;
  const { name: namePoint } = destination;
  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${TYPE.map((item) => `<div class="event__type-item">
            <input id="event-type-${item}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === type ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${id}">${item}</label>
          </div>`).join('')}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${namePoint}" list="destination-list-${id}">
      <datalist id="destination-list-${id}">
      ${destinationAll.map(({ name: nameDestination }) => `<option value="${nameDestination}"></option>`).join('')}
      </datalist>
    </div>
  `;
}

function createDateTemplate(routePoint) {
  const { dateFrom, dateTo, id } = routePoint;
  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDueDate(dateFrom, DATE_FORMAT.year)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDueDate(dateTo, DATE_FORMAT.year)}">
    </div>
  `;
}

function createPriceTemplate(routePoint) {
  const { basePrice, id } = routePoint;
  return `
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
    </div>
  `;
}

function createSaveButton() {
  return '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';
}

function createResetButton() {
  return '<button class="event__reset-btn" type="reset">Delete</button>';
}

function createRollupButton() {
  return `
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createOffersTemplate(offers, offersType) {
  const idPoints = offers.map((item) => item.id);
  if (offersType.offers.length !== 0) {
    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersType.offers.map(({ title: titleOffersType, id: idOfferType, price }) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${CLASS_NAME[titleOffersType]}-${idOfferType}" type="checkbox" name="event-offer-${CLASS_NAME[titleOffersType]}" ${idPoints.includes(idOfferType) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${CLASS_NAME[titleOffersType]}-${idOfferType}">
              <span class="event__offer-title">${titleOffersType}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`).join('')}
        </div>
      </section>
    `;
  }
  return '';
}

function createPhotosTemplate(destination) {
  const { photos } = destination;
  if (photos.length === 0) {
    return '';
  }
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${photos.map(({ description: descriptionPhoto, src }) => `<img class="event__photo" src="${src}" alt="${descriptionPhoto}">`).join('')}
      </div>
    </div>
  `;
}

function createDestinationTemplate(destination) {
  const { description, photos } = destination;
  if (description.length === 0 && photos.length === 0) {
    return '';
  }
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${createPhotosTemplate(destination)}
    </section>
  `;
}

function createFormEditTemplate(routePoint, offers, destination, offersType, destinationAll) {

  return `
    <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeTemplate(routePoint, destination, destinationAll)}
        ${createDateTemplate(routePoint)}
        ${createPriceTemplate(routePoint)}
        ${createSaveButton()}
        ${createResetButton()}
        ${createRollupButton()}
      </header>
      <section class="event__details">
        ${createOffersTemplate(offers, offersType)}
        ${createDestinationTemplate(destination)}
      </section>
    </form>
  </li>
  `;
}

export default class FormEdit extends AbstractView {
  #routePoint;
  #offers;
  #destination;
  #offersType;
  #destinationAll;
  #handleFormSubmit;

  constructor({ routePoint, offers, destination, offersType, destinationAll, onFormSubmit }) {
    super();
    this.#routePoint = routePoint;
    this.#offers = offers;
    this.#destination = destination;
    this.#offersType = offersType;
    this.#destinationAll = destinationAll;

    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('.event--edit')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', (evt) => evt.preventDefault());
  }

  get template() {
    return createFormEditTemplate(this.#routePoint, this.#offers, this.#destination, this.#offersType, this.#destinationAll);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#routePoint);
  };
}
