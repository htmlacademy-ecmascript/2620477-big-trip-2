import Presenter from './presenter/presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new Presenter({
  tripMainElement,
  filterContainer,
  eventsContainer,
});

boardPresenter.init();
