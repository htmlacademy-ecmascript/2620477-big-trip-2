import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointTime, humanizePointDate, humanizeDateTime, humanizeDateYear, msToTime } from '../utils/utils.js';

function createTripPointTemplate(point, offersById, destination) {
  const { type, basePrice, dateFrom, dateTo, isFavorite } = point;
  const { name } = destination;

  const eventDate = humanizePointDate(dateFrom);
  const eventStartDate = humanizePointTime(dateFrom);
  const eventEndDate = humanizePointTime(dateTo);
  const eventStartDateYear = humanizeDateYear(dateFrom);
  const eventStartDateTime = humanizeDateTime(dateFrom);
  const eventEndDateTime = humanizeDateTime(dateTo);
  const durationEvent = msToTime(new Date(dateTo) - new Date(dateFrom));

  function isFavoritePoint(favorite) {
    return favorite
      ? 'event__favorite-btn event__favorite-btn--active'
      : 'event__favorite-btn';
  }

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${ eventStartDateYear }">${ eventDate }</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${ type }.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${ type } ${ name }</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${ eventStartDateTime }">${ eventStartDate }</time>
          &mdash;
          <time class="event__end-time" datetime="${ eventEndDateTime }">${ eventEndDate }</time>
        </p>
        <p class="event__duration">${ durationEvent }</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${ offersById.map(({ title, price }) => `<li class="event__offer">
          <span class="event__offer-title">${ title }</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${ price }</span>
        </li>`).join('') }
      </ul>
      <button class="${ isFavoritePoint(isFavorite) }" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class TripPointView extends AbstractView {
  #point = null;
  #offersById = null;
  #destination = null;
  #onEditClick = null;
  #onClickFavoriteButton = null;

  constructor({ point, offersById, destination, onEditClick, onClickFavoriteButton }) {
    super();
    this.#point = point;
    this.#offersById = offersById;
    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#onClickFavoriteButton = onClickFavoriteButton;

    this.#addEventListeners();
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#offersById, this.#destination);
  }

  #addEventListeners() {
    this.#addRollupButtonListener();
    this.#addFavoriteButtonListener();
  }

  #addRollupButtonListener() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  #addFavoriteButtonListener() {
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#onClickFavoriteButtonHandler);
  }

  #editClickHandler = () => {
    this.#onEditClick();
  };

  #onClickFavoriteButtonHandler = () => {
    this.#onClickFavoriteButton();
  };
}
