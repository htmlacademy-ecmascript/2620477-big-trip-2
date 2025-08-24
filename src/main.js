import TripEventsPresenter from './presenter/trip-points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/trip-points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-points.js';
import { ApiService } from './constants.js';

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripContolsFiltersElement = document.querySelector('.trip-controls__filters');
const addNewPointBtnElement = document.querySelector('.trip-main__event-add-btn');
addNewPointBtnElement.disabled = true;

const pointsApiService = new PointsApiService(ApiService.END_POINT, ApiService.AUTHORIZATION);

const pointsModel = new PointsModel({
  pointsApiService: pointsApiService,
});

const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: tripMainElement,
  pointsModel: pointsModel,
});

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

async function unlockAddNewEventBtn() {
  try {
    await pointsApiService.points;
    addNewPointBtnElement.disabled = false;
  } catch (err) {
    addNewPointBtnElement.disabled = true;
  }
}

pointsModel.init()
  .finally(() => {
    unlockAddNewEventBtn();
  });

tripInfoPresenter.init();
filterPresenter.init();
tripEventsPresenter.init();
