import Observable from '../framework/observable.js';
import { TRIP_POINT_COUNT } from '../constants.js';
import { getRandomTripPoint } from '../mock/trip-point-mock.js';
import { mockOffers } from '../mock/offers-mock.js';
import { mockDestinations } from '../mock/destinations-mock.js';

export default class TripPointsModel extends Observable {
  #tripPoints = Array.from({length: TRIP_POINT_COUNT}, getRandomTripPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get tripPoints() {
    return this.#tripPoints;
  }

  get offers() {
    return this.#offers;
  }

  get allTypesEvent() {
    return this.offers.map((offer) => offer.type);
  }

  getOfferByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemsId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    const allDestinations = this.destinations;
    return allDestinations.find((item) => item.destinationId === id);
  }

  get allNamesDestination() {
    return this.destinations.map((destination) => destination.name);
  }

  updatePoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.pointId === update.pointId);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      update,
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.pointId === update.pointId);

    if (!~index) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
