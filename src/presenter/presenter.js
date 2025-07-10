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
    this.pointsArray = [...this.pointsModel.getPoints()];
    this.offersArray = [...this.offersModel.getOffers()];
    this.destinationsModel = [...this.destinationsModel.getDestinations()];

    render(new TripTitleView(), this.tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new EditFormView(), (this.pointsArray[0], this.offersArray[0], this.destinationsModel[0]), this.eventListComponent.getElement());

    for (let i = 0; i < this.pointsArray.length; i++) {
      render(new RoutePointView(this.pointsArray[i], this.offersArray[i],
        this.destinationsModel[i]), this.routePointListElement.getElement());
    }

    render(new CreateFormView(), this.eventListComponent.getElement());
  }
}
