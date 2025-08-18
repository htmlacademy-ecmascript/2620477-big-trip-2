import { getRandomRoutePoint, mockDestination, mockOptions } from '../mock/route-points-mock.js';
import { ROUTEPOINT_COUNT } from '../mock/constants.js';

export default class routePointModel {
  #routePoints = Array.from({ length: ROUTEPOINT_COUNT }, getRandomRoutePoint);
  #offers = mockOptions;
  #destination = mockDestination;

  get routePoints() {
    return structuredClone(this.#routePoints);
  }

  get offers() {
    return structuredClone(this.#offers);
  }

  getOffersByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  get destinations() {
    return structuredClone(this.#destination);
  }

  getDestinationsById(id) {
    const allDestination = this.destinations;
    return allDestination.find((item) => item.id === id);
  }
}
