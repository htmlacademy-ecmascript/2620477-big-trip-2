import { getRandomInteger } from '../utils/utils';

const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '0d9c7f3d-da83-4b0f-b366-38d5fb623e8d',
        'title': 'Upgrade to a business class',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'c30d09fc-04bb-4ee6-99eb-10ea318b0d1a',
        'title': 'Choose the radio station',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'cd9210b6-1fa2-4737-8a69-2fbc2ab17419',
        'title': 'Choose temperature',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'f68538c0-7e58-4140-a900-b59b913625e4',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'b3a97d36-00f9-4d84-9bac-75dce6f7714e',
        'title': 'Drive slowly',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'a2f3dfc4-71e8-4854-8eab-ecf22cea9201',
        'title': 'Infotainment system',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '602bb0cd-4a52-49ed-896b-3b4a7d4e6dd8',
        'title': 'Order meal',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '4a81437d-8acc-49cd-8b95-670956764a4a',
        'title': 'Choose seats',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 'b01b785f-e59f-4e49-a629-5e83ff8621e6',
        'title': 'Book a taxi at the arrival point',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'a1ea5931-3cb9-4640-a18c-6a00693cb5d8',
        'title': 'Order a breakfast',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '16903070-5fe8-4688-b111-a679cec4c25c',
        'title': 'Wake up at a certain time',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'a9dc879d-a3c3-4a55-8b91-18fc58a4f518',
        'title': 'Choose meal',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '23a92795-4393-4790-94df-cbfba46199e0',
        'title': 'Choose seats',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'f997fc5b-8710-433d-a3ea-8deb006191b6',
        'title': 'Upgrade to comfort class',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '2bc2b940-c9fc-4864-b15b-f325db44c871',
        'title': 'Upgrade to business class',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'a283a062-9e6a-42ba-9288-4107a2831cab',
        'title': 'Add luggage',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'c0312fa0-dc07-494c-88db-264936ef6f8f',
        'title': 'Business lounge',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '5b4cbabb-d7ac-445f-96a7-d65a8715a1b7',
        'title': 'Choose the time of check-in',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'd2a1407b-1b29-456f-ad83-66991ccd4385',
        'title': 'Choose the time of check-out',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'bb7a28d1-3eff-43cb-b8a2-a27480907c81',
        'title': 'Add breakfast',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '1773cbf3-d3db-47f3-a535-14056c67040e',
        'title': 'Laundry',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '0e86c137-572c-4c82-9f03-b193e1fdf53f',
        'title': 'Order a meal from the restaurant',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'dadc6559-55c2-43df-a46f-174e4770295b',
        'title': 'Choose meal',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': 'de925011-6ae3-47aa-af14-2648e9373e34',
        'title': 'Choose seats',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '3af9627f-6e2c-4241-95b5-8e59ee2dddbe',
        'title': 'Upgrade to comfort class',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '5ce1765e-b215-4cb7-b37d-86abedaf13f4',
        'title': 'Upgrade to business class',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '4770fd94-2bad-44e9-ac09-f861d488f8e6',
        'title': 'Add luggage',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '1ac6c48a-38ae-4618-bee5-0dcb3727ed32',
        'title': 'Business lounge',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '64a4cf99-72c6-4978-9d95-786f62d2e823',
        'title': 'With automatic transmission',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '2d119eb8-2fdd-4a8a-9491-f719f82022c8',
        'title': 'With air conditioning',
        'price': getRandomInteger(50, 200),
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '9c9ca102-5fe6-4b51-83e6-94eaa0822e87',
        'title': 'Choose live music',
        'price': getRandomInteger(50, 200),
      },
      {
        'id': '26bbc381-3378-4797-9496-32f02da80ad9',
        'title': 'Choose VIP area',
        'price': getRandomInteger(50, 200),
      }
    ]
  }
];

export {
  mockOffers
};
