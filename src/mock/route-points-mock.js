import { v4 as uuidv4 } from 'uuid';
import { TYPE, CITIES, DESCRIPTION, PHOTO, OFFER_TITLE } from './constants.js';
import { getRandomInteger, getRandomArrayElement } from './utils.js';

const mockOptions = [
  {
    'type': TYPE[0],
    'offers': [{
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
      'id': '4177b75b-1c97-4544-a999-c541892f3f27',
    }]
  },
  {
    'type': TYPE[1],
    'offers': [{
      'title': OFFER_TITLE[4],
      'price': getRandomInteger(50, 200),
      'id': '1fb1cfd4-aa23-4435-88b3-456328036fb3',
    },
    {
      'title': OFFER_TITLE[5],
      'price': getRandomInteger(50, 200),
      'id': '201a92e8-51cd-4e83-90c5-be0721473d1a',
    }]
  },
  {
    'type': TYPE[2],
    'offers': [{
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
      'id': '90696055-db8f-4757-b73f-556217b0024b',
    }]
  },
  {
    'type': TYPE[3],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
      'id': '80f50628-d0a9-4f93-b074-dc93f2accd7a',
    },
    {
      'title': OFFER_TITLE[1],
      'price': getRandomInteger(50, 200),
      'id': '11f50ad8-6f5f-49b2-a49d-3e173228e5f0',
    },
    {
      'title': OFFER_TITLE[5],
      'price': getRandomInteger(50, 200),
      'id': 'ce533be2-b9a0-4e58-b2ea-ae65c07b3ce3',
    }]
  },
  {
    'type': TYPE[4],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
      'id': '3b7ff65d-ab07-488c-bac0-2b069355329d',
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
      'id': '9d4e0d09-c883-4abc-a7fd-0bbec34884c3',
    }]
  },
  {
    'type': TYPE[5],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
      'id': '2bc0e069-d88a-4441-8ffb-92abcd598310',
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
      'id': '240c7b91-98a2-45c1-b389-a06e0fc2b4d7',
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
      'id': '7702eafb-8ad9-4db7-ada9-a8d300ba9fdb',
    }]
  },
  {
    'type': TYPE[6],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
      'id': '609a24b3-38e4-48f1-85d2-272c1ca97a49',
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
      'id': 'cec108dc-894d-4908-b9fa-f8f5ba892ca2',
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
      'id': 'bf8238b1-4d8f-4627-9b09-f0abdcc38832',
    }]
  },
  {
    'type': TYPE[7],
    'offers': []
  },
  {
    'type': TYPE[8],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
      'id': '195eae39-a4d5-4286-a89a-f33c3168c00d',
    },
    {
      'title': OFFER_TITLE[1],
      'price': getRandomInteger(50, 200),
      'id': '44cb5cc9-a412-4dbc-87da-036a16867a56',
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
      'id': 'db6e9c9f-b04e-435a-b5ac-62131e9e76b1',
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
      'id': '1ce4e34c-1574-4d6c-8586-e45ffaa6bfd6',
    }]
  }
];

const mockDestination = [
  {
    'id': '1ce4e34c-1574-4d6c-8586-e47ffaa6bfd6',
    'description': '',
    'name': CITIES[0],
    'photos': [
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[1]}`
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[3]}`
      }
      ,
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[2]}`
      }
    ],
  },
  {
    'id': '1ce4e35c-1574-4d6c-8586-e45ffaa6bfd6',
    'description': `${DESCRIPTION[1]}. ${DESCRIPTION[3]}. ${DESCRIPTION[2]}`,
    'name': CITIES[1],
    'photos': [],
  },
  {
    'id': '1ce4e34c-1544-4d6c-8586-e45ffaa6bfd6',
    'description': `${DESCRIPTION[4]}. ${DESCRIPTION[2]}. ${DESCRIPTION[3]}. ${DESCRIPTION[1]}`,
    'name': CITIES[2],
    'photos': [
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[4]}`
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[2]}`
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[3]}`
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
        'description': `${DESCRIPTION[1]}`
      },
    ],
  }
];

const mockDate = [
  {
    'date-from': '2023-12-15T06:57:04.116Z',
    'date-to': '2023-12-15T17:50:04.116Z',
    'is-favorite': false,
  },
  {
    'date-from': '2023-12-28T22:42:04.116Z',
    'date-to': '2023-12-30T22:55:04.116Z',
    'is-favorite': true,
  },
  {
    'date-from': '2023-12-15T06:57:04.116Z',
    'date-to': '2023-12-15T17:50:04.116Z',
    'is-favorite': true,
  }
];

/**
 * RandomRoutePoint
 * @typedef {Object} RandomRoutePoint
 * @property {string} RandomRoutePoint.id
 * @property {number} RandomRoutePoint.basePrice
 * @property {string} RandomRoutePoint.dateFrom
 * @property {string} RandomRoutePoint.dateTo
 * @property {string} RandomRoutePoint.destination
 * @property {boolean} RandomRoutePoint.favorite
 * @property {string[]} RandomRoutePoint.offersId
 * @property {string} RandomRoutePoint.type
 * @returns {RandomRoutePoint}
 */
const getRandomRoutePoint = () => {
  const options = getRandomArrayElement(mockOptions);
  const date = getRandomArrayElement(mockDate);
  const destination = getRandomArrayElement(mockDestination);
  const { type, offers } = options;
  const offersIdType = offers.map((item) => item.id);
  const offersId = offersIdType.slice(0, getRandomInteger(0, offers.length));

  return {
    id: uuidv4(),
    basePrice: getRandomInteger(100, 2000),
    dateFrom: date['date-from'],
    dateTo: date['date-to'],
    destination: destination.id,
    favorite: date['is-favorite'],
    offersId,
    type,
  };
};

export { getRandomRoutePoint, mockDestination, mockOptions };
