import Presenter from './presenter/presenter.js';
import RoutePoint from './model/route-points-model.js';

const siteFiltersElement = document.querySelector('.trip-main__trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const routePointModel = new RoutePoint();

const presenter = new Presenter({
  headerContainer: siteFiltersElement,
  mainContainer: siteMainElement,
  routePointModel,
});

presenter.init();
