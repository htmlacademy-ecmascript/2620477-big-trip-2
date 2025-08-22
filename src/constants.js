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
  INIT: 'init',
  ERROR: 'error'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EndPoint = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const ApiService = {
  AUTHORIZATION: 'Basic dsfsw323dcfarkhlk8',
  END_POINT: 'https://22.objects.htmlacademy.pro/big-trip',
};

const NewPoint = {
  'basePrice': '',
  'dateFrom': new Date(),
  'dateTo': new Date(),
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

const DestinationOfNewPoint = {
  'name': '',
  'pictures': [],
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  FilterType,
  SortingType,
  Mode,
  UserAction,
  UpdateType,
  NewPoint,
  DestinationOfNewPoint,
  Method,
  EndPoint,
  ApiService,
  TimeLimit,
};
