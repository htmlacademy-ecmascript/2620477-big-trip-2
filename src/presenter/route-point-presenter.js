import { render, replace, remove } from '../framework/render.js';
import RoutePoint from '../view/route-point-view.js';
import FormEdit from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePointPresenter {
  #routePointListComponent = null;
  #routePointModel = null;
  #routePointComponent = null;
  #routePointEditComponent = null;
  #routePoint = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ routePointListComponent, routePointModel, onDataChange, onModeChange }) {
    this.#routePointListComponent = routePointListComponent;
    this.#routePointModel = routePointModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#routePoint = point;

    const prevRoutePointComponent = this.#routePointComponent;
    const prevRoutePointEditComponent = this.#routePointEditComponent;

    this.#routePointComponent = new RoutePoint({
      routePoint: this.#routePoint,
      offers: [...this.#routePointModel.getOffersById(point.type, point.offersId)],
      destination: this.#routePointModel.getDestinationsById(point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#routePointEditComponent = new FormEdit({
      routePoint: this.#routePoint,
      offersType: this.#routePointModel.getOffersByType(point.type),
      offers: [...this.#routePointModel.getOffersById(point.type, point.offersId)],
      destination: this.#routePointModel.getDestinationsById(point.destination),
      destinationAll: this.#routePointModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this.#routePointComponent, this.#routePointListComponent.element);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePointComponent, prevRoutePointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#routePointEditComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  destroy() {
    remove(this.#routePointComponent);
    remove(this.#routePointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#routePointEditComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#routePointComponent, this.#routePointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#routePoint, isFavorite: !this.#routePoint.isFavorite });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };
}
