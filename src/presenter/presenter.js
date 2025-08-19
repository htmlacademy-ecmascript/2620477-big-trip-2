import { render, RenderPosition } from '../framework/render.js';
import Filters from '../view/filter-view.js';
import Sorting from '../view/sort-view.js';
import NewEventBtn from '../view/new-event-btn-view.js';
import NoEvent from '../view/no-event-view.js';
import TripTitleView from '../view/trip-title-view.js';
import { generateFilter } from '../mock/filter-mock.js';
import RoutePointPresenter from './route-point-presenter.js';
import RoutePointListView from '../view/route-point-list-view.js';
import { updateItem } from '../mock/utils.js';

export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #routePointModel;
  #sorting = new Sorting();
  #title = new TripTitleView();
  #buttonNewEvent = new NewEventBtn();
  #routePointListComponent;
  #routePoints = [];
  #routePointPresenters = new Map();

  constructor({ headerContainer, mainContainer, routePointModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#routePointModel = routePointModel;
    this.#routePointListComponent = new RoutePointListView();
  }

  init() {
    this.#routePoints = [...this.#routePointModel.routePoints];
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

  #renderApp() {
    this.#renderFilters();
    this.#renderButtonNewEvent();
    this.#renderTripTitle();
    if (this.#routePoints.length === 0) {
      this.#renderNoEvent();
      return;
    }

    render(this.#sorting, this.#mainContainer);
    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i]);
    }
  }
}
