import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListSortView from '../view/trip-sort-view.js';
import TripPointListView from '../view/trip-point-list-view.js';
import EmptyPointsListView from '../view/empty-point-list-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorLoadingView from '../view/error-loading-view.js';
import TripEventPresenter from './trip-point-presenter.js';
import NewTripEventPresenter from './new-trip-presenter.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { generateSortTypesList, sortPointsByDay, sortPointsByTime, sortPointsByPrice, filter } from '../utils/utils.js';
import { FilterType, SortingType, UpdateType, UserAction, TimeLimit } from '../constants.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;

  #pointsModel = null;
  #filterModel = null;

  #listSortComponent = null;
  #tripPointListComponent = new TripPointListView();
  #loadingComponent = new LoadingView();
  #errorLoadingComponent = new ErrorLoadingView();
  #emptyPointsListComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #pointPresentersList = new Map();
  #newTripEventPresenter = null;
  #currentSortType = SortingType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isErrorLoading = false;

  constructor({ tripEventsContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newTripEventPresenter = new NewTripEventPresenter({
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
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
    this.#renderPointsList();
  }

  createNewPoint() {
    this.#currentSortType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripEventPresenter.init(this.#pointsModel);
  }

  #isCountFiltersEmpty() {
    const points = this.#pointsModel.points;
    const countFilters = [
      filter[FilterType.EVERYTHING](points).length,
      filter[FilterType.FUTURE](points).length,
      filter[FilterType.PRESENT](points).length,
      filter[FilterType.PAST](points).length,
    ];
    return countFilters.every((count) => count === 0);
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
      offersById: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationById(point.destination),
      offersByType: this.#pointsModel.getOffersByType(point.type),
      handlePointDataChange: this.#handleViewAction,
      onOpenEditForm: this.#handleOpenEditPoint,
      allTypesEvent: this.#pointsModel.allTypesEvent,
      allNamesDestination: this.#pointsModel.allNamesDestination,
      pointsModel: this.#pointsModel,
      tripPointListComponent: this.#tripPointListComponent.element,
    });

    tripEventPresenter.init(point);
    this.#pointPresentersList.set(point.pointId, tripEventPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderErrorLoading() {
    render(this.#errorLoadingComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyPointsList() {
    this.#emptyPointsListComponent = new EmptyPointsListView({
      filterType: this.#isCountFiltersEmpty() ? FilterType.EVERYTHING : this.#filterType,
    });

    render(this.#emptyPointsListComponent, this.#tripEventsContainer);
  }

  #handleOpenEditPoint = () => {
    this.#newTripEventPresenter.destroy();
    this.#pointPresentersList.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresentersList.get(update.pointId).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresentersList.get(update.pointId).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newTripEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newTripEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresentersList.get(update.pointId).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresentersList.get(update.pointId).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresentersList.get(data.pointId).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#isErrorLoading = true;
        this.#renderPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearPointsList();
    this.#renderPointsList();
  };

  #clearPointsList({ resetSortType = false } = {}) {
    this.#newTripEventPresenter.destroy();
    this.#pointPresentersList.forEach((presenter) => presenter.destroy());
    this.#pointPresentersList.clear();

    remove(this.#tripPointListComponent);
    remove(this.#listSortComponent);
    remove(this.#loadingComponent);

    if (this.#emptyPointsListComponent) {
      remove(this.#emptyPointsListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isErrorLoading) {
      this.#renderErrorLoading();
      return;
    }

    if (this.#tripPointCount() === 0) {
      this.#renderEmptyPointsList();
      return;
    }

    this.#renderSort();

    render(this.#tripPointListComponent, this.#tripEventsContainer);
    this.#renderPoints(this.points);
  }

  #tripPointCount = () => this.points.length;
}
