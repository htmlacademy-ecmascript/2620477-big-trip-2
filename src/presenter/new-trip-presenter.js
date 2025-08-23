import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-point-list-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType, Mode, FilterType, NewPoint} from '../constants.js';

export default class NewTripEventPresenter {
  #tripEventsListElement = null;
  #tripEventsElement = null;
  #emptyPointsListElements = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #tripPointListComponent = new TripPointListView();
  #emptyPointsListComponent = new EmptyPointsListView({ filterType: FilterType.EVERYTHING });
  #newPointComponent = null;
  #mode = Mode.ADDING;

  constructor({ onDataChange, onDestroy }) {
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(pointsModel) {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new EditPointView({
      point: NewPoint,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      offersByType: pointsModel.getOffersByType(NewPoint.type),
      allTypesEvent: pointsModel.allTypesEvent,
      allNamesDestination: pointsModel.allNamesDestination,
      pointsModel: pointsModel,
      mode: this.#mode,
    });

    this.#tripEventsElement = document.querySelector('.trip-events');
    this.#tripEventsListElement = this.#tripEventsElement.querySelector('.trip-events__list');
    this.#emptyPointsListElements = document.querySelectorAll('.trip-events__msg');

    document.addEventListener('keydown', this.#escKeyDownHandler);

    if (this.#emptyPointsListElements.length !== 0) {
      this.#deleteEmptyElement();
      render(this.#tripPointListComponent, this.#tripEventsElement);
      render(this.#newPointComponent, this.#tripPointListComponent.element, RenderPosition.AFTERBEGIN);
      return;
    }

    if (this.#tripEventsListElement) {
      this.#deleteEmptyElement();
      render(this.#newPointComponent, this.#tripEventsListElement, RenderPosition.AFTERBEGIN);
    }
  }

  destroy() {
    this.#deleteEmptyElement();

    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);

    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    if(this.#tripEventsListElement && document.querySelectorAll('.trip-events__item').length === 0) {
      this.#tripEventsListElement.remove();
      render(this.#emptyPointsListComponent, this.#tripEventsElement);
      return;
    }

    if(!this.#tripEventsListElement) {
      render(this.#emptyPointsListComponent, this.#tripEventsElement);
    }
  }

  setSaving() {
    if (this.#mode === Mode.ADDING) {
      this.#newPointComponent.updateElement({
        isSaving: true,
        isDisabled: true,
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }

  #deleteEmptyElement() {
    this.#emptyPointsListElements = document.querySelectorAll('.trip-events__msg');
    this.#emptyPointsListElements.forEach((el) => el.remove());
  }

  #handleFormSubmit = (point) => {
    this.#deleteEmptyElement();

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );

    this.#deleteEmptyElement();
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
