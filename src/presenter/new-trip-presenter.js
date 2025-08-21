import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-point-list-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, Mode, FilterType } from '../constants.js';

export default class NewTripEventPresenter {
  #point = null;
  #tripEventsListElement = null;
  #tripEventsElement = null;
  #emptyPointsListElements = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offersByType = null;
  #destination = null;
  #allTypesEvent = null;
  #allNamesDestination = null;
  #tripPointsModel = null;
  #tripPointListComponent = new TripPointListView();
  #emptyPointsListComponent = new EmptyPointsListView({ filterType: FilterType.EVERYTHING });
  #newPointComponent = null;
  #mode = Mode.ADDING;

  constructor({ point, onDataChange, onDestroy, offersByType, destination, allTypesEvent, allNamesDestination, tripPointsModel }) {
    this.#point = point;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#offersByType = offersByType;
    this.#destination = destination;
    this.#allTypesEvent = allTypesEvent;
    this.#allNamesDestination = allNamesDestination;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      offersByType: this.#offersByType,
      destination: this.#destination,
      allTypesEvent: this.#allTypesEvent,
      allNamesDestination: this.#allNamesDestination,
      tripPointsModel: this.#tripPointsModel,
      mode: this.#mode,
    });

    this.#tripEventsElement = document.querySelector('.trip-events');
    this.#tripEventsListElement = this.#tripEventsElement.querySelector('.trip-events__list');
    this.#emptyPointsListElements = document.querySelectorAll('.trip-events__msg');

    document.addEventListener('keydown', this.#escKeyDownHandler);

    if (this.#emptyPointsListElements.length !== 0) {
      this.deleteEmptyElement();
      render(this.#tripPointListComponent, this.#tripEventsElement);
      render(this.#newPointComponent, this.#tripPointListComponent.element, RenderPosition.AFTERBEGIN);
      return;
    }

    if (this.#tripEventsListElement) {
      this.deleteEmptyElement();
      render(this.#newPointComponent, this.#tripEventsListElement, RenderPosition.AFTERBEGIN);
    }
  }

  destroy() {
    this.deleteEmptyElement();

    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);

    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    if(this.#tripEventsListElement && this.#tripEventsListElement.querySelectorAll('.trip-events__item').length === 0) {
      this.deleteEmptyElement();
      this.#tripEventsListElement.remove();
      render(this.#emptyPointsListComponent, this.#tripEventsElement);
      return;
    }

    if(!this.#tripEventsListElement) {
      this.deleteEmptyElement();
      render(this.#emptyPointsListComponent, this.#tripEventsElement);
    }
  }

  deleteEmptyElement() {
    this.#emptyPointsListElements = document.querySelectorAll('.trip-events__msg');
    this.#emptyPointsListElements.forEach((el) => el.remove());
  }

  #handleFormSubmit = (point) => {
    this.destroy();

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      { pointId: nanoid(), ...point },
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
