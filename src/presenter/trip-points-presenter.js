import ListSortView from '../view/trip-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-point-list-view.js';
import TripEventPresenter from './trip-point-presenter.js';
import NewTripEventPresenter from './new-trip-presenter.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { generateSortTypesList } from '../mock/sorting-mock.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice, filter } from '../utils/utils.js';
import { FilterType, NewPoint, SortingType, UpdateType, UserAction } from '../constants.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;

  #tripPointsModel = null;
  #filterModel = null;

  #listSortComponent = null;
  #tripPointListComponent = new TripPointListView();
  #emptyPointsListComponent = null;

  #pointPresentersList = new Map();
  #newTripEventPresenter = null;
  #currentSortType = SortingType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ tripEventsContainer, tripPointsModel, filterModel, onNewPointDestroy }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;

    this.#newTripEventPresenter = new NewTripEventPresenter({
      point: NewPoint,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      offersByType: this.#tripPointsModel.getOfferByType(NewPoint.type),
      destination: this.#tripPointsModel.getDestinationById(NewPoint.destination),
      allTypesEvent: this.#tripPointsModel.allTypesEvent,
      allNamesDestination: this.#tripPointsModel.allNamesDestination,
      tripPointsModel: this.#tripPointsModel,
    });

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#tripPointsModel.tripPoints;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortingType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortingType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints.sort(sortPointsByDay);
  }

  init() {
    this.#renderTripPointsList();
  }

  createNewPoint() {
    this.#currentSortType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripEventPresenter.init();
  }

  #renderSort() {
    if (this.#tripPointCount() === 0) {
      return;
    }

    this.#listSortComponent = new ListSortView({
      sortTypes: generateSortTypesList(),
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#listSortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const tripEventPresenter = new TripEventPresenter({
      offersById: [...this.#tripPointsModel.getOfferById(point.type, point.offers)],
      destination: this.#tripPointsModel.getDestinationById(point.destination),
      offersByType: this.#tripPointsModel.getOfferByType(point.type),
      handlePointDataChange: this.#handleViewAction,
      onOpenEditForm: this.#handleOpenEditPoint,
      allTypesEvent: this.#tripPointsModel.allTypesEvent,
      allNamesDestination: this.#tripPointsModel.allNamesDestination,
      tripPointsModel: this.#tripPointsModel,
      tripPointListComponent: this.#tripPointListComponent.element,
    });

    tripEventPresenter.init(point);
    this.#pointPresentersList.set(point.pointId, tripEventPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyPointsList() {
    this.#emptyPointsListComponent = new EmptyPointsListView({
      filterType: this.#filterType,
    });

    render(this.#emptyPointsListComponent, this.#tripEventsContainer);
  }

  #handleOpenEditPoint = () => {
    this.#newTripEventPresenter.destroy();
    this.#pointPresentersList.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresentersList.get(data.pointId).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripPointsList();
        this.#renderTripPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripPointsList({ resetSortType: true });
        this.#renderTripPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTripPointsList();
    this.#renderTripPointsList();
  };

  #clearTripPointsList({ resetSortType = false } = {}) {
    this.#newTripEventPresenter.destroy();
    this.#pointPresentersList.forEach((presenter) => presenter.destroy());
    this.#pointPresentersList.clear();

    remove(this.#tripPointListComponent);
    remove(this.#listSortComponent);

    if (this.#emptyPointsListComponent) {
      remove(this.#emptyPointsListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

  #renderTripPointsList() {
    if (this.#tripPointCount() === 0) {
      this.#renderEmptyPointsList();
      return;
    }

    this.#renderSort();

    render(this.#tripPointListComponent, this.#tripEventsContainer);
    this.#renderPoints(this.tripPoints);
  }

  #tripPointCount = () => this.tripPoints.length;
}
