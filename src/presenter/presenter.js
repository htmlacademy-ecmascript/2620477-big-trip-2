import { render, RenderPosition } from '../framework/render.js';
import Filters from '../view/filter-view.js';
import Sorting from '../view/sort-view.js';
import NewEventBtn from '../view/new-event-btn-view.js';
import NoEvent from '../view/no-event-view.js';
import TripTitleView from '../view/trip-title-view.js';
import { generateFilter } from '../mock/filter-mock.js';
import { generateSorting } from '../mock/utils.js';
import RoutePointPresenter from './route-point-presenter.js';
import RoutePointListView from '../view/route-point-list-view.js';
import { updateItem, sortRoutePointByDate, sortRoutePointByPrice, sortRoutePointByDuration } from '../mock/utils.js';
import { SortType } from '../mock/constants.js';

export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #routePointModel;
  #sorting;
  #title = new TripTitleView();
  #buttonNewEvent = new NewEventBtn();
  #routePointListComponent;
  #routePoints = [];
  #routePointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  constructor({ headerContainer, mainContainer, routePointModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#routePointModel = routePointModel;
    this.#routePointListComponent = new RoutePointListView();
  }

  init() {
    this.#routePoints = [...this.#routePointModel.routePoints].sort(sortRoutePointByDate);
    this.#renderApp();
    render(this.#routePointListComponent, this.#mainContainer);
  }

  #renderRoutePoint(point) {
    const routePointPresenter = new RoutePointPresenter({
      routePointListComponent: this.#routePointListComponent,
      routePointModel: this.#routePointModel,
      onDataChange: this.#handleRoutePointChange,
      onModeChange: this.#handleModeChange,
    });
    routePointPresenter.init(point);
    this.#routePointPresenters.set(point.id, routePointPresenter);
  }

  #clearRoutePointList() {
    this.#routePointPresenters.forEach((presenter) => presenter.destroy());
    this.#routePointPresenters.clear();
  }

  #renderRoutePointList() {
    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i]);
    }
  }

  #handleModeChange = () => {
    this.#routePointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleRoutePointChange = (updatedRoutePoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedRoutePoint);
    this.#routePointPresenters.get(updatedRoutePoint.id).init(updatedRoutePoint);
  };

  #renderFilters() {
    const filters = generateFilter(this.#routePoints);
    render(new Filters({ filters }), this.#headerContainer);
  }

  #renderButtonNewEvent() {
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);
  }

  #renderTripTitle() {
    render(this.#title, this.#headerContainer, RenderPosition.BEFOREBEGIN);
  }

  #renderNoEvent() {
    render(new NoEvent(), this.#mainContainer);
  }

  #sortRoutePoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#routePoints.sort(sortRoutePointByDate);
        break;
      case SortType.TIME:
        this.#routePoints.sort(sortRoutePointByDuration);
        break;
      case SortType.PRICE:
        this.#routePoints.sort(sortRoutePointByPrice);
        break;
      default:
        this.#routePoints.sort(sortRoutePointByDate);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortRoutePoints(sortType);
    this.#clearRoutePointList();
    this.#renderRoutePointList();
  };

  #renderSort() {
    this.#sorting = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      sorting: this.#sortingState,
    });

    render(this.#sorting, this.#mainContainer);
  }

  #renderApp() {
    this.#renderFilters();
    this.#renderButtonNewEvent();
    this.#renderTripTitle();
    if (this.#routePoints.length === 0) {
      this.#renderNoEvent();
      return;
    }

    this.#renderSort();
    this.#renderRoutePointList();
  }
}
