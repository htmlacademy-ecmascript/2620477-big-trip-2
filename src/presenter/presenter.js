import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import TripTitleView from '../view/trip-title-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  constructor({ filterContainer, eventsContainer, listContainer }) {
    this.filterContainer = filterContainer;
    this.eventsContainer = eventsContainer;
    this.eventListComponent = new EventListView();
    this.listContainer = listContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);

    render(new SortView(), this.eventsContainer);

    render(this.eventListComponent, this.eventsContainer);

    render(new TripTitleView(), this.listContainer.getElement(), RenderPosition.BEFOREBEGIN);

    render(new EditFormView(), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.eventListComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
