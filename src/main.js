import TripEventsPresenter from './presenter/trip-points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/trip-points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-points.js';
import { ApiService } from './constants.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripContolsFiltersElement = document.querySelector('.trip-controls__filters');
const addNewPointBtnElement = document.querySelector('.trip-main__event-add-btn');
addNewPointBtnElement.disabled = true;

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(ApiService.END_POINT, ApiService.AUTHORIZATION),
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: tripContolsFiltersElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
});


const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: tripEventsElement,
  pointsModel: pointsModel,
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
pointsModel.init()
  .finally(() => {
    addNewPointBtnElement.disabled = false;
  });
