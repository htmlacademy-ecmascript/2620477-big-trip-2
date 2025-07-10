import { render, RenderPosition } from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import TripTitleView from '../view/trip-title-view.js';
import CreateFormView from '../view/create-form-view.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';

export default class Presenter {
  constructor({ tripMainElement, filterContainer, eventsContainer }) {
    this.tripMainElement = tripMainElement;
    this.filterContainer = filterContainer;
    this.eventsContainer = eventsContainer;
    this.pointsModel = new PointsModel();
    this.offersModel = new OffersModel();
    this.destinationsModel = new DestinationsModel();
    this.eventListComponent = new EventListView();
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];
    this.destinations = [...this.destinationsModel.getDestinations()];

    render(new TripTitleView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);

    render(new CreateFormView(), this.eventListComponent.getElement());

    if (this.points.length > 0) {
      const point = this.points[0];
      const offersForType = this.offers.find((offer) => offer.type === point.type)?.offers || [];
      const destination = this.destinations.find((dest) => dest.name === point.destination);
      const editForm = new EditFormView(point, offersForType, destination);
      render(editForm, this.eventListComponent.getElement());
    }

    for (let i = 0; i < this.points.length - 1; i++) {
      const routePoint = new RoutePointView(this.points[i], this.offers, this.destinations[i]);
      render(routePoint, this.eventListComponent.getElement());
    }
  }
}
