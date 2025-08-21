import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import { remove, render, replace } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../constants.js';

export default class TripEventPresenter {
  #point = null;
  #offersById = null;
  #destination = null;
  #offersByType = null;
  #handlePointDataChange = null;
  #tripPointListComponent = null;
  #tripPointComponent = null;
  #editPointComponent = null;
  #onOpenEditForm = null;
  #allTypesEvent = null;
  #allNamesDestination = null;
  #tripPointsModel = null;
  #mode = Mode.DEFAULT;

  constructor({ offersById, destination, offersByType, handlePointDataChange, onOpenEditForm,
    allTypesEvent, allNamesDestination, tripPointsModel, tripPointListComponent }) {
    this.#offersById = offersById;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#handlePointDataChange = handlePointDataChange;
    this.#onOpenEditForm = onOpenEditForm;
    this.#allTypesEvent = allTypesEvent;
    this.#allNamesDestination = allNamesDestination;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPointListComponent = tripPointListComponent;
  }

  init (point) {
    if (point) {
      this.#point = point;
    }

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#tripPointComponent = new TripPointView({
      point: this.#point,
      offersById: this.#offersById,
      destination: this.#destination,
      onEditClick: this.#openEdit,
      onClickFavoriteButton: this.#toggleFavoriteState,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      offersByType: this.#offersByType,
      destination: this.#destination,
      onEditClick: this.#closeEdit,
      onFormSubmit: this.#saveEdit,
      allTypesEvent: this.#allTypesEvent,
      allNamesDestination: this.#allNamesDestination,
      tripPointsModel: this.#tripPointsModel,
      onDeleteClick: this.#deletePoint,
      mode: Mode.EDITING,
    });

    if (prevTripPointComponent === null || prevEditPointComponent === null) {
      render(this.#tripPointComponent, this.#tripPointListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevTripPointComponent);
    remove(prevEditPointComponent);
  }

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  };

  #replaceEditToPoint = () => {
    replace(this.#tripPointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeEdit();
    }
  };

  #toggleFavoriteState = () => {
    this.#handlePointDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #openEdit = () => {
    this.#onOpenEditForm();
    this.#replacePointToEdit();
  };

  #closeEdit = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditToPoint();
  };

  #saveEdit = (update) => {
    const isMinorUpdate =
      this.#point.dateFrom === update.dateFrom &&
      this.#point.dateTo === update.dateTo &&
      this.#point.basePrice === update.basePrice;

    this.#handlePointDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.MAJOR,
      update,
    );
    this.#replaceEditToPoint();
  };

  #deletePoint = (point) => {
    this.#handlePointDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  };

  destroy = () => {
    remove(this.#tripPointComponent);
    remove(this.#editPointComponent);
  };
}
