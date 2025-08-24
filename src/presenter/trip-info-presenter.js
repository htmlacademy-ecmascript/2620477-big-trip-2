import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortPointsByDay, humanizePointDateForInfo } from '../utils/utils.js';
import TripInfoView from '../view/trip-info-view.js';
import { SORTED_POINTS_LENGTH } from '../constants.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;
  #formattedTripPath = null;
  #formattedDurationOfTrip = null;
  #fullCostOfTrip = null;

  constructor({tripInfoContainer, pointsModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get sortedPointsByDay() {
    const points = this.#pointsModel.points;
    return points.sort(sortPointsByDay);
  }

  getFormattedTripPath(sortedPointsByDay) {
    const sortedPointsNames = sortedPointsByDay.map((point) => this.#pointsModel.getDestinationById(point.destination).name);

    if (sortedPointsByDay.length === 0) {
      return null;
    }
    if (sortedPointsNames.length <= SORTED_POINTS_LENGTH) {
      return sortedPointsNames.join(' &mdash; ');
    } return `${ sortedPointsNames[0] } &mdash; ... &mdash; ${ sortedPointsNames[sortedPointsNames.length - 1] }`;
  }

  getFormattedDurationOfTrip(sortedPointsByDay) {
    const startTripDay = sortedPointsByDay[0].dateFrom;
    const lastTripDay = sortedPointsByDay[sortedPointsByDay.length - 1].dateTo;

    if (sortedPointsByDay.length === 0) {
      return null;
    }
    if (sortedPointsByDay.length === 1) {
      return `${humanizePointDateForInfo(startTripDay)}`;
    } else {
      return `${ humanizePointDateForInfo(startTripDay) }&nbsp;&mdash;&nbsp;${ humanizePointDateForInfo(lastTripDay) }`;
    }
  }

  getFullCostOfTrip(sortedPointsByDay) {
    const pricesOfPoints = sortedPointsByDay.map((point) => point.basePrice);
    const pricesOfPointsSumm = pricesOfPoints.reduce((summ, price) => summ + price, 0);
    let pricesOfPointsOffersSumm = 0;
    const offersFromPoints = sortedPointsByDay.map((point) => this.#pointsModel.getOffersById(point.type, point.offers));

    for (const offersFromPoint of offersFromPoints) {
      for (const offer of offersFromPoint){
        pricesOfPointsOffersSumm += offer.price;
      }
    }
    return pricesOfPointsSumm + pricesOfPointsOffersSumm === 0 ? 0 : pricesOfPointsSumm + pricesOfPointsOffersSumm;
  }

  async init() {
    try {
      const sortedPointsByDay = await this.sortedPointsByDay;

      this.#formattedTripPath = this.getFormattedTripPath(sortedPointsByDay);
      this.#formattedDurationOfTrip = this.getFormattedDurationOfTrip(sortedPointsByDay);
      this.#fullCostOfTrip = this.getFullCostOfTrip(this.sortedPointsByDay);

      const prevTripInfoComponent = this.#tripInfoComponent;

      this.#tripInfoComponent = new TripInfoView({
        formattedTripPath: this.#formattedTripPath,
        formattedDurationOfTrip: this.#formattedDurationOfTrip,
        fullCostOfTrip: this.#fullCostOfTrip,
      });

      if (prevTripInfoComponent === null) {
        render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
        return;
      }

      replace(this.#tripInfoComponent, prevTripInfoComponent);
      remove(prevTripInfoComponent);
    } catch(err) {
      await this.sortedPointsByDay;
    }
  }

  #handleModelEvent = () => {
    this.init();
  };
}
