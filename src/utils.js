import dayjs from 'dayjs';
import { TIME_MESURES } from './const';

export const getRandomArrayElement = (array) => {
  const randomElement = Math.floor(Math.random() * array.length);

  return array[randomElement];
};

export const getRandomValue = (minPrice, maxPrice) => {
  const randomPrice = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);

  return randomPrice;
};

export const getDestinationFromId = (idNumber, destinationsElementsArray) => {
  let destinationName = '';

  destinationsElementsArray.forEach((destinationsElement) => {
    const {id, name} = destinationsElement;

    if (id === idNumber) {
      destinationName = name;
    }
  });

  return destinationName;
};

export function formatDate(date, format) {
  return dayjs(date).format(format);
}

export function formatDuration(dateFrom, dateTo) {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);
  const durationAllMinutes = endTime.diff(startTime, 'minute');

  const durationDays = Math.floor(durationAllMinutes / 1440);
  const durationHours = Math.floor((durationAllMinutes % 1440) / 60);
  const durationsMinutes = Math.floor((durationAllMinutes % 1440) % 60);
  const durationElements = [durationDays, durationHours, durationsMinutes];
  const durationResult = [];

  for (let i = 0; i < durationElements.length; i++) {
    if (durationElements[i] > 0) {
      if (durationElements[i] < 10) {
        durationResult.push(`0${durationElements[i]}${TIME_MESURES[i]}`);
        continue;
      }

      durationResult.push(`${durationElements[i]}D`);
    }

  }

  return durationResult.join(' ');
}
