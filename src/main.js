import TripEventsPresenter from './presenter/trip-points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPointsModel from './model/trip-points-model.js';
import FilterModel from './model/filter-model.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripContolsFiltersElement = document.querySelector('.trip-controls__filters');
const addNewPointBtnElement = document.querySelector('.trip-main__event-add-btn');

const tripPointsModel = new TripPointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: tripContolsFiltersElement,
  filterModel: filterModel,
  tripPointsModel: tripPointsModel,
});

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  tripPointsModel: tripPointsModel,
  filterModel: filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

addNewPointBtnElement.addEventListener('click', handleNewPointButtonClick);

function handleNewPointFormClose() {
  addNewPointBtnElement.disabled = false;
}

function handleNewPointButtonClick() {
  tripEventsPresenter.createNewPoint();
  addNewPointBtnElement.disabled = true;
}

filterPresenter.init();
tripEventsPresenter.init();
