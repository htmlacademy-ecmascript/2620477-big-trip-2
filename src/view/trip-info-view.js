import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(formattedTripPath, formattedDurationOfTrip, fullCostOfTrip) {
  return `${fullCostOfTrip > 0 ?
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${ formattedTripPath }</h1>
        <p class="trip-info__dates">${ formattedDurationOfTrip }</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${ fullCostOfTrip }</span>
      </p>
    </section>` : ''}`;
}

export default class TripInfoView extends AbstractView {
  #formattedTripPath = null;
  #formattedDurationOfTrip = null;
  #fullCostOfTrip = null;

  constructor({ formattedTripPath, formattedDurationOfTrip, fullCostOfTrip }) {
    super();
    this.#formattedTripPath = formattedTripPath;
    this.#formattedDurationOfTrip = formattedDurationOfTrip;
    this.#fullCostOfTrip = fullCostOfTrip;
  }

  get template() {
    return createTripInfoTemplate(this.#formattedTripPath, this.#formattedDurationOfTrip, this.#fullCostOfTrip);
  }
}
