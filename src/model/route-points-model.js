import { getRandomRoutePoint, mockDestination, mockOptions } from '../mock/route-points-mock.js';
import { ROUTEPOINT_COUNT } from '../mock/constants.js';

export default class routePointModel {

  /**
    * @type {RandomRoutePoint[]}
    */

  #routePoints = Array.from({ length: ROUTEPOINT_COUNT }, getRandomRoutePoint);

  /**
    * @type {AllOffers[]}
    */

  #offers = mockOptions;

  /**
    * @type {Destination[]}
    */

  #destination = mockDestination;

  /**
    * @returns {RandomRoutePoint[]}
    */

  get routePoints() {
    return structuredClone(this.#routePoints);
  }

  /**
    * @returns {AllOffers[]}
    */

  get offers() {
    return structuredClone(this.#offers);
  }

  /**
    * @param {RandomRoutePoint.type} type
    * @returns {offer[]} offers
    */

  getOffersByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  /**
    * @param {RandomRoutePoint.type} type
    * @param {RandomRoutePoint.offersId} itemsId
    * @returns {offer[]} offers
    */

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  /**
    * @returns {Destination[]}
    */

  get destinations() {
    return structuredClone(this.#destination);
  }

  /**
    * @param {RandomRoutePoint.destination} id
    * @returns {Destination[]} destinations
    */

  getDestinationsById(id) {
    const allDestination = this.destinations;
    return allDestination.find((item) => item.id === id);
  }
}
