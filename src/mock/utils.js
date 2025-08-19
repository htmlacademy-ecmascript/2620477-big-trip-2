import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
dayjs.extend(durationPlugin);
import { FilterType } from './constants.js';

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizeDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
};

function checksTravelIsSame(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function checksTravelIsBefore(dueDate) {
  return dueDate && dayjs(dueDate).isBefore(dayjs(), 'D');
}

function checksTravelIsAfter(dueDate) {
  return dueDate && dayjs(dueDate).isAfter(dayjs(), 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => checksTravelIsBefore(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checksTravelIsSame(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => checksTravelIsAfter(point.dateFrom)),
};
export { getRandomInteger, getRandomArrayElement, humanizeDueDate, getDuration, filter };
