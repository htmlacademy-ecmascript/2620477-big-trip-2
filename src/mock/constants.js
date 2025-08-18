const TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Amsterdam', 'Chamonix', 'Geneva'];
const DESCRIPTION = [
  'Located on the ocean with white sandy beaches and crystal clear water',
  'Ancient castle with towers and a moat around it',
  'Mountain resort with beautiful views and skiing opportunities',
  'Huge park with diverse flora and fauna',
  'Historic city center with many landmarks'
];
const ROUTEPOINT_COUNT = 7;
const PHOTO = 'https://loremflickr.com/248/152?random=';
const OFFER_TITLE = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Order Uber'];
const DATE_FORMAT = {
  day: 'MMM D',
  hoursMinutes: 'HH:mm',
  year: 'DD/MM/YY HH:mm',
  fullDate: 'YYYY-MM-DD',
};
const CLASS_NAME = {
  'Add luggage': 'luggage',
  'Switch to comfort class': 'comfort',
  'Add meal': 'meal',
  'Choose seats': 'seats',
  'Travel by train': 'train',
  'Order Uber': 'uber',
};
const TextNoEvent = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

export { TYPE, CITIES, DESCRIPTION, PHOTO, OFFER_TITLE, DATE_FORMAT, CLASS_NAME, TextNoEvent, ROUTEPOINT_COUNT };
