import {getRandomValue, getDestinationFromId} from '../utils.js';
import { destinationsElementsMock } from './destinations-mock.js';
import { EVENT_TYPES } from '../const.js';


const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const FALSE = 0;
const TRUE = 1;


export const pointsElementsMock = [
  {
    'id': '1',
    'base_price': getRandomValue(MIN_PRICE, MAX_PRICE),
    'date_from': '2025-03-28T22:55:56.845Z',
    'date_to': '2025-03-29T22:56:01.234Z',
    'destination': getDestinationFromId('1', destinationsElementsMock),
    'is_favorite': Boolean(getRandomValue(FALSE, TRUE)),
    'offers': ['1', '3'],
    'type': EVENT_TYPES[0]
  },
  {
    'id': '2',
    'base_price': getRandomValue(MIN_PRICE, MAX_PRICE),
    'date_from': '2025-03-30T00:10:30.555Z',
    'date_to': '2025-03-30T08:00:00.123Z',
    'destination': getDestinationFromId('2', destinationsElementsMock),
    'is_favorite': Boolean(getRandomValue(FALSE, TRUE)),
    'offers': ['2'],
    'type': EVENT_TYPES[1]
  },
  {
    'id': '3',
    'base_price': getRandomValue(MIN_PRICE, MAX_PRICE),
    'date_from': '2025-03-31T12:34:56.789Z',
    'date_to': '2025-04-01T00:00:00.001Z',
    'destination': getDestinationFromId('3', destinationsElementsMock),
    'is_favorite': Boolean(getRandomValue(FALSE, TRUE)),
    'offers': ['1', '2'],
    'type': EVENT_TYPES[2]
  },
  {
    'id': '4',
    'base_price': getRandomValue(MIN_PRICE, MAX_PRICE),
    'date_from': '2025-04-05T18:22:44.666Z',
    'date_to': '2025-05-10T05:05:05.505Z',
    'destination': getDestinationFromId('4', destinationsElementsMock),
    'is_favorite': Boolean(getRandomValue(FALSE, TRUE)),
    'offers': [],
    'type': EVENT_TYPES[3]
  }
];
