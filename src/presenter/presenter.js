import { render, replace, RenderPosition } from '../framework/render.js';
import FormEdit from '../view/edit-form-view.js';
import Filters from '../view/filter-view.js';
import Sorting from '../view/sort-view.js';
import RoutePoint from '../view/route-point-view.js';
import NewEventBtn from '../view/new-event-btn-view.js';
import NoEvent from '../view/no-event-view.js';
import TripTitleView from '../view/trip-title-view.js';
export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #routePointModel;
  #filters = new Filters();
  #sorting = new Sorting();
  #title = new TripTitleView();
  #buttonNewEvent = new NewEventBtn();
  #routePoints = [];

  constructor({ headerContainer, mainContainer, routePointModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#routePointModel = routePointModel;
  }

  init() {
    this.#routePoints = [...this.#routePointModel.routePoints];
    this.#renderApp();
  }

  #renderRoutePoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const routePoint = new RoutePoint({
      routePoint: point,
      offers: [...this.#routePointModel.getOffersById(point.type, point.offersId)],
      destination: this.#routePointModel.getDestinationsById(point.destination),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formEdit = new FormEdit({
      routePoint: point,
      offersType: this.#routePointModel.getOffersByType(point.type),
      offers: [...this.#routePointModel.getOffersById(point.type, point.offersId)],
      destination: this.#routePointModel.getDestinationsById(point.destination),
      destinationAll: this.#routePointModel.destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(formEdit, routePoint);
    }

    function replaceFormToPoint() {
      replace(routePoint, formEdit);
    }
    render(routePoint, this.#mainContainer);
  }

  #renderApp() {
    render(this.#title, this.#headerContainer);
    render(this.#filters, this.#headerContainer);
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);

    if (this.#routePoints.length === 0) {
      render(new NoEvent(), this.#mainContainer);
      return;
    }

    render(this.#sorting, this.#mainContainer);
    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint(this.#routePoints[i]);
    }
  }
}
