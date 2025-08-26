import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateTimeEdit } from '../utils/utils.js';
import flatpickr from 'flatpickr';
import { Mode, DestinationOfNewPoint } from '../constants.js';
import 'flatpickr/dist/flatpickr.min.css';

function createEditPointTemplate(point, offersByType, destination, allTypesEvent, allNamesDestination, mode) {
  const { pointId, type, basePrice, dateFrom, dateTo, offers, isSaving, isDeleting, isDisabled } = point;
  const { description, name, pictures } = destination;

  const isCheckedTypeEvent = (typeEvent) => typeEvent === type ? 'checked' : '';
  const isCheckedOffer = (offersId, id) => offersId.some((offerId) => offerId === id) ? 'checked' : '';

  const eventStartEdit = humanizeDateTimeEdit(dateFrom);
  const eventEndEdit = humanizeDateTimeEdit(dateTo);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post" autocompete="off">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${ pointId }">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${ pointId }" type="checkbox" ${ isDisabled ? 'disabled' : '' }>

        <div class="event__type-list">
          ${ allTypesEvent.length > 0 ? `<fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${ allTypesEvent.map((typeEvent) => `<div class="event__type-item">
              <input id="event-type-${ typeEvent }" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ typeEvent }" ${ isCheckedTypeEvent(typeEvent) }>
              <label class="event__type-label event__type-label--${ typeEvent }" for="event-type-${ typeEvent }">${ typeEvent }</label>
            </div>`).join('') }
          </fieldset>` : '' }
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="${ destination.id }">
          ${ type }
        </label>
        <input class="event__input  event__input--destination" id="${ destination.id }" type="text" name="event-destination" value="${ he.encode(name) }" list="destination-list-${ pointId }" ${ isDisabled ? 'disabled' : '' } required>
        ${ allNamesDestination.length > 0 ? `<datalist id="destination-list-${ pointId }">
          ${ allNamesDestination.map((destinationName) => `<option value="${ destinationName }"></option>`).join('')}
        </datalist>` : '' }
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${ pointId }">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${ pointId }" type="text" name="event-start-time" value="${ eventStartEdit }" ${ isDisabled ? 'disabled' : '' }>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${ pointId }">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${ pointId }" type="text" name="event-end-time" value="${ eventEndEdit }" ${ isDisabled ? 'disabled' : '' }>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${ pointId }">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${ pointId }" type="number" name="event-price" value="${ basePrice }" required ${ isDisabled ? 'disabled' : '' }>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${ isDisabled ? 'disabled' : '' }>
      ${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset" ${ isDisabled ? 'disabled' : '' }>
      ${ mode === Mode.ADDING ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}` }
      </button>
      ${ mode === Mode.ADDING ? '' : `<button class="event__rollup-btn" type="button" ${ isDisabled ? 'disabled' : '' }>
        <span class="visually-hidden">Open event</span>
      </button>` }

    </header>

    <section class="event__details">
      ${ offersByType.offers && offersByType.offers.length > 0 ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${ offersByType.offers.map(({ title, price, id }) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${ id }" type="checkbox" name="event-offer-luggage" ${ isDisabled ? 'disabled' : '' } ${ isCheckedOffer(offers, id) }>
            <label class="event__offer-label" for="${ id }">
              <span class="event__offer-title">${ title }</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${ price }</span>
            </label>
          </div>`).join('') }
        </div>
      </section>` : '' }

      ${ description ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${ description }</p>
        ${ pictures.length > 0 ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${ pictures.map((picture) => `<img class="event__photo" src="${ picture.src }" alt="${ picture.description }">`).join('') }
          </div>
        </div>` : ''}
      </section>` : ''}
    </section>
  </form></li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #offersByType = null;
  #handleEditClick = null;
  #handleFormSubmit = null;
  #allTypesEvent = null;
  #allNamesDestination = null;
  #pointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #mode = Mode.EDITING;

  constructor ({ point, offersByType, onEditClick, onFormSubmit, allTypesEvent, allNamesDestination, pointsModel, onDeleteClick, mode }) {
    super();
    this._setState(EditPointView.parsePointToState({ point }));
    this.#offersByType = offersByType;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#allTypesEvent = allTypesEvent;
    this.#allNamesDestination = allNamesDestination;
    this.#pointsModel = pointsModel;
    this.#handleDeleteClick = onDeleteClick;
    this.#mode = mode;
    this.#setDatepickers();
    this._restoreHandlers();
  }

  _restoreHandlers() {
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#editClickHandler);
    }
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((checkbox) => checkbox.addEventListener('change', this.#offerChangeHandler));
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickers();
  }

  get destination() {
    if (this.#mode === Mode.EDITING) {
      return this.#pointsModel.getDestinationById(this._state.destination);
    } else {
      return this.#pointsModel.getDestinationById(this._state.destination) || DestinationOfNewPoint;
    }
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offersByType, this.destination, this.#allTypesEvent, this.#allNamesDestination, this.#mode);
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState({ point }),
    );
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const offersByType = this.#pointsModel.getOffersByType(evt.target.value);
    this.#offersByType = offersByType;
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: offersByType.offers,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = this.#pointsModel.destinations
      .find((destinationCheck) => destinationCheck.name === evt.target.value);

    if (!targetDestination) {
      evt.target.value = '';
      return;
    }

    const targetDestinationId = targetDestination ? targetDestination.id : null;
    this.updateElement({
      ...this._state,
      destination: targetDestinationId,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const inputPrice = parseInt(evt.target.value, 10);

    if (Number.isNaN(inputPrice) || inputPrice < 0) {
      return;
    }

    this._setState({
      ...this._state,
      basePrice: inputPrice,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const checkOfferId = evt.target.id;

    let updatedOffers;

    if (evt.target.checked) {
      updatedOffers = [...this._state.offers, checkOfferId];
    } else {
      updatedOffers = this._state.offers.filter((id) => id !== checkOfferId);
    }

    this._setState({
      ...this._state,
      offers: updatedOffers,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({ ...this._state.point, dateFrom: userDate});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({ ...this._state.point, dateTo: userDate});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const dateInputs = this.element.querySelectorAll('.event__input--time');
    const dateFormatConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: { firstDayOfWeek: 1 },
      'time_24hr': true,
    };

    dateInputs.forEach((input, index) => {
      if (index === 0) {
        this.#datepickerFrom = flatpickr(
          input,
          {
            ...dateFormatConfig,
            defaultDate: this._state.dateFrom,
            onClose: this.#dateFromChangeHandler,
            maxDate: this._state.dateTo,
          }
        );
      } else if (index === 1) {
        this.#datepickerTo = flatpickr(
          input,
          {
            ...dateFormatConfig,
            defaultDate: this._state.dateTo,
            onClose: this.#dateToChangeHandler,
            minDate: this._state.dateFrom,
          }
        );
      }
    });
  };

  static parsePointToState = ({ point }) => (
    {
      ...point,
      offers: point.offers || [],
      isSaving: false,
      isDeleting: false,
      isDisabled: false,
    }
  );

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isSaving;
    delete point.isDeleting;
    delete point.isDisabled;

    return point;
  };
}
