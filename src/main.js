import BoardPresenter from './presenter/presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  filterContainer,
  eventsContainer,
});

boardPresenter.init();
