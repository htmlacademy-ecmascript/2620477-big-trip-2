import { getRandomArrayElement } from '../utils/utils.js';

const mockTripPoints = [
  {
    'pointId': 'bf3e3a8d-bac2-4d15-8935-ede26303deb5',
    'basePrice': 4481,
    'dateFrom': '2025-06-22T07:18:15.030Z',
    'dateTo': '2025-06-23T17:03:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': false,
    'offers': [
      '5ce1765e-b215-4cb7-b37d-86abedaf13f4',
      '4770fd94-2bad-44e9-ac09-f861d488f8e6',
      '1ac6c48a-38ae-4618-bee5-0dcb3727ed32'
    ],
    'type': 'ship'
  },
  {
    'pointId': 'd358b84c-e337-4acd-8867-bd2ad8ab852d',
    'basePrice': 6364,
    'dateFrom': '2025-04-25T00:16:15.030Z',
    'dateTo': '2025-06-25T13:49:15.030Z',
    'destination': '68a1d117-8840-43b1-b17f-da26b7bdf852',
    'isFavorite': false,
    'offers': [
      '1773cbf3-d3db-47f3-a535-14056c67040e',
      '0e86c137-572c-4c82-9f03-b193e1fdf53f'
    ],
    'type': 'check-in'
  },
  {
    'pointId': '107e8ac9-21a3-45c9-9bb2-d37bb2df7ae2',
    'basePrice': 586,
    'dateFrom': '2025-03-27T06:51:15.030Z',
    'dateTo': '2025-03-28T14:14:15.030Z',
    'destination': '5e3dbf84-1e6e-4d57-8bfe-613b4da57a6a',
    'isFavorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'pointId': 'b3b27c1f-ab3f-4cf5-b7bf-5eadcb82510b',
    'basePrice': 7122,
    'dateFrom': '2025-06-29T11:41:15.030Z',
    'dateTo': '2025-06-29T21:03:15.030Z',
    'destination': 'aff1aa63-5a8d-4619-9614-12ef1a66cc9e',
    'isFavorite': true,
    'offers': [
      '2d119eb8-2fdd-4a8a-9491-f719f82022c8'
    ],
    'type': 'drive'
  },
  {
    'pointId': '82173ca0-71b9-4062-8bc7-ee6e0edaaf1a',
    'basePrice': 813,
    'dateFrom': '2025-03-30T03:37:15.030Z',
    'dateTo': '2025-04-01T00:58:15.030Z',
    'destination': '5e3dbf84-1e6e-4d57-8bfe-613b4da57a6a',
    'isFavorite': true,
    'offers': [
      'c0312fa0-dc07-494c-88db-264936ef6f8f'
    ],
    'type': 'flight'
  },
  {
    'pointId': 'bae24ed2-4a83-4e97-aa01-933856038571',
    'basePrice': 7175,
    'dateFrom': '2025-04-03T01:01:15.030Z',
    'dateTo': '2025-06-04T09:39:15.030Z',
    'destination': '68a1d117-8840-43b1-b17f-da26b7bdf852',
    'isFavorite': true,
    'offers': [
      'dadc6559-55c2-43df-a46f-174e4770295b',
      'de925011-6ae3-47aa-af14-2648e9373e34',
      '3af9627f-6e2c-4241-95b5-8e59ee2dddbe',
      '5ce1765e-b215-4cb7-b37d-86abedaf13f4',
      '4770fd94-2bad-44e9-ac09-f861d488f8e6',
      '1ac6c48a-38ae-4618-bee5-0dcb3727ed32'
    ],
    'type': 'ship'
  },
  {
    'pointId': '68b40022-3133-46f2-b721-12e296c536f3',
    'basePrice': 1448,
    'dateFrom': '2025-04-06T10:00:15.030Z',
    'dateTo': '2025-04-07T08:50:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'pointId': 'dedc28fa-528d-44ff-97a1-0a876d3a55a6',
    'basePrice': 7282,
    'dateFrom': '2025-04-08T12:47:15.030Z',
    'dateTo': '2025-06-08T23:53:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': false,
    'offers': [
      '26bbc381-3378-4797-9496-32f02da80ad9'
    ],
    'type': 'restaurant'
  },
  {
    'pointId': '64483c60-4a3d-4567-8922-360a95e99e67',
    'basePrice': 7542,
    'dateFrom': '2025-04-10T20:33:15.030Z',
    'dateTo': '2025-04-12T04:51:15.030Z',
    'destination': '521db956-3198-4441-a56f-878663fdf739',
    'isFavorite': false,
    'offers': [
      'f997fc5b-8710-433d-a3ea-8deb006191b6',
      '2bc2b940-c9fc-4864-b15b-f325db44c871',
      'a283a062-9e6a-42ba-9288-4107a2831cab',
      'c0312fa0-dc07-494c-88db-264936ef6f8f'
    ],
    'type': 'flight'
  },
  {
    'pointId': '2b873260-e9c4-44e0-b07f-747e003f43d6',
    'basePrice': 7960,
    'dateFrom': '2025-04-13T01:12:15.030Z',
    'dateTo': '2025-04-13T17:02:15.030Z',
    'destination': '37708f07-f190-47a5-8bd9-49c18e1d6aab',
    'isFavorite': true,
    'offers': [
      'de925011-6ae3-47aa-af14-2648e9373e34',
      '3af9627f-6e2c-4241-95b5-8e59ee2dddbe',
      '5ce1765e-b215-4cb7-b37d-86abedaf13f4',
      '4770fd94-2bad-44e9-ac09-f861d488f8e6',
      '1ac6c48a-38ae-4618-bee5-0dcb3727ed32'
    ],
    'type': 'ship'
  },
  {
    'pointId': 'bad9a57d-93ed-4e5f-bb8d-bb858dda238f',
    'basePrice': 1737,
    'dateFrom': '2025-04-15T00:18:15.030Z',
    'dateTo': '2025-04-16T21:35:15.030Z',
    'destination': '521db956-3198-4441-a56f-878663fdf739',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'pointId': 'd2eadb0a-2515-4068-a0b0-2d6bcd8fa58a',
    'basePrice': 7709,
    'dateFrom': '2025-06-18T05:18:15.030Z',
    'dateTo': '2025-06-19T04:53:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': false,
    'offers': [],
    'type': 'check-in'
  },
  {
    'pointId': '015e5ad1-0189-41a6-bc6a-97e4771d3210',
    'basePrice': 3466,
    'dateFrom': '2025-04-20T07:15:15.030Z',
    'dateTo': '2025-04-21T01:50:15.030Z',
    'destination': '521db956-3198-4441-a56f-878663fdf739',
    'isFavorite': false,
    'offers': [
      '0e86c137-572c-4c82-9f03-b193e1fdf53f'
    ],
    'type': 'check-in'
  },
  {
    'pointId': '80523eb3-f40f-4a6f-84ec-a67469668d74',
    'basePrice': 3737,
    'dateFrom': '2025-04-22T06:00:15.030Z',
    'dateTo': '2025-04-23T08:12:15.030Z',
    'destination': '0a9fd66f-b3e9-4466-8217-c8d001649364',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'pointId': 'dee8ad3e-403e-4e7d-9cb5-ef3b5a13cc67',
    'basePrice': 3880,
    'dateFrom': '2025-04-24T19:59:15.030Z',
    'dateTo': '2025-04-26T08:40:15.030Z',
    'destination': '5e3dbf84-1e6e-4d57-8bfe-613b4da57a6a',
    'isFavorite': true,
    'offers': [
      '4a81437d-8acc-49cd-8b95-670956764a4a'
    ],
    'type': 'bus'
  },
  {
    'pointId': 'ac657213-4969-40f5-84a4-aed77f37bb66',
    'basePrice': 5946,
    'dateFrom': '2025-06-26T14:48:15.030Z',
    'dateTo': '2025-06-26T23:01:15.030Z',
    'destination': '521db956-3198-4441-a56f-878663fdf739',
    'isFavorite': true,
    'offers': [
      '9c9ca102-5fe6-4b51-83e6-94eaa0822e87',
      '26bbc381-3378-4797-9496-32f02da80ad9'
    ],
    'type': 'restaurant'
  },
  {
    'pointId': '04fa6681-4209-4ff1-a770-14c0ca0e7db1',
    'basePrice': 6768,
    'dateFrom': '2025-04-28T08:50:15.030Z',
    'dateTo': '2025-04-29T00:40:15.030Z',
    'destination': '4246f4f8-ccdb-4faf-bdcb-ae5f5c1f6724',
    'isFavorite': true,
    'offers': [
      'a2f3dfc4-71e8-4854-8eab-ecf22cea9201',
      '602bb0cd-4a52-49ed-896b-3b4a7d4e6dd8',
      '4a81437d-8acc-49cd-8b95-670956764a4a'
    ],
    'type': 'bus'
  },
  {
    'pointId': '60e30a99-619c-4790-b6dc-8f3a2f86f791',
    'basePrice': 363,
    'dateFrom': '2025-05-30T20:02:15.030Z',
    'dateTo': '2025-06-01T02:19:15.030Z',
    'destination': '37708f07-f190-47a5-8bd9-49c18e1d6aab',
    'isFavorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'pointId': '7ed15aaf-cdd0-4de9-96c7-558a4b470cce',
    'basePrice': 7389,
    'dateFrom': '2025-05-01T18:51:15.030Z',
    'dateTo': '2025-05-29T06:27:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': false,
    'offers': [
      '9c9ca102-5fe6-4b51-83e6-94eaa0822e87',
      '26bbc381-3378-4797-9496-32f02da80ad9'
    ],
    'type': 'restaurant'
  },
  {
    'pointId': '8ed4d682-9ba3-4f0a-abe7-d58667ffa4ad',
    'basePrice': 7694,
    'dateFrom': '2025-05-04T04:50:15.030Z',
    'dateTo': '2025-05-05T12:17:15.030Z',
    'destination': '0a9fd66f-b3e9-4466-8217-c8d001649364',
    'isFavorite': false,
    'offers': [
      'd2a1407b-1b29-456f-ad83-66991ccd4385',
      'bb7a28d1-3eff-43cb-b8a2-a27480907c81',
      '1773cbf3-d3db-47f3-a535-14056c67040e',
      '0e86c137-572c-4c82-9f03-b193e1fdf53f'
    ],
    'type': 'check-in'
  },
  {
    'pointId': 'b2e915b9-5baf-43dd-92d8-583676e378a3',
    'basePrice': 4927,
    'dateFrom': '2025-05-05T21:25:15.030Z',
    'dateTo': '2025-05-07T15:58:15.030Z',
    'destination': 'a195c37a-8a24-4efb-a89e-8f1142e74d37',
    'isFavorite': false,
    'offers': [
      '64a4cf99-72c6-4978-9d95-786f62d2e823',
      '2d119eb8-2fdd-4a8a-9491-f719f82022c8'
    ],
    'type': 'drive'
  },
  {
    'pointId': '36a31237-aa25-40d3-9d4b-46be5a86616e',
    'basePrice': 4675,
    'dateFrom': '2025-05-08T11:19:15.030Z',
    'dateTo': '2025-05-09T08:57:15.030Z',
    'destination': '3fd41f58-8be1-420b-9460-145cf3c5eb5f',
    'isFavorite': false,
    'offers': [
      'c30d09fc-04bb-4ee6-99eb-10ea318b0d1a',
      'cd9210b6-1fa2-4737-8a69-2fbc2ab17419',
      'f68538c0-7e58-4140-a900-b59b913625e4',
      'b3a97d36-00f9-4d84-9bac-75dce6f7714e'
    ],
    'type': 'taxi'
  },
  {
    'pointId': '60cf4f2b-0ab7-4d2e-9e3a-eca009fb9907',
    'basePrice': 655,
    'dateFrom': '2025-05-11T00:32:15.030Z',
    'dateTo': '2025-05-12T04:55:15.030Z',
    'destination': '37708f07-f190-47a5-8bd9-49c18e1d6aab',
    'isFavorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'pointId': '2f3abe58-f2d1-4235-b8e9-5f9b8a5b51f1',
    'basePrice': 8674,
    'dateFrom': '2025-05-13T01:46:15.030Z',
    'dateTo': '2025-05-13T13:24:15.030Z',
    'destination': '37708f07-f190-47a5-8bd9-49c18e1d6aab',
    'isFavorite': true,
    'offers': [
      'b3a97d36-00f9-4d84-9bac-75dce6f7714e'
    ],
    'type': 'taxi'
  },
  {
    'pointId': '087b69c2-a75f-4d07-b5ab-f58a69406078',
    'basePrice': 7322,
    'dateFrom': '2025-05-10T10:50:15.030Z',
    'dateTo': '2025-05-20T22:25:15.030Z',
    'destination': '3fd41f58-8be1-420b-9460-145cf3c5eb5f',
    'isFavorite': false,
    'offers': [
      '5ce1765e-b215-4cb7-b37d-86abedaf13f4',
      '4770fd94-2bad-44e9-ac09-f861d488f8e6',
      '1ac6c48a-38ae-4618-bee5-0dcb3727ed32'
    ],
    'type': 'ship'
  }
];

function getRandomTripPoint() {
  return getRandomArrayElement(mockTripPoints);
}

export { getRandomTripPoint };
