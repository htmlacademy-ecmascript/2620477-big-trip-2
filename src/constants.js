const TRIP_POINT_COUNT = 5;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
  ADDING: 'adding',
};

const UserAction = {
  UPDATE_POINT: 'updatePoint',
  ADD_POINT: 'addPoint',
  DELETE_POINT: 'deletePoint',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

const NewPoint = {
  'basePrice': '',
  'dateFrom': new Date(),
  'dateTo': new Date(),
  'destination': 'addNewPointDestinationId',
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
};

export {
  TRIP_POINT_COUNT,
  FilterType,
  SortingType,
  Mode,
  UserAction,
  UpdateType,
  NewPoint,
};
