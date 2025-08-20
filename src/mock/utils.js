import { SORTING, FilterType } from './constants.js';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
dayjs.extend(durationPlugin);

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function generateSorting(sortType) {
  return SORTING.map((value) => ({
    value,
    isSelected: value === sortType,
    isDisabled: value === 'event' || value === 'offers',
  }));
}

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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortRoutePointByDate(routePointA, routePointB) {
  if (routePointA.dateFrom > routePointB.dateFrom) {
    return 1;
  }
  if (routePointA.dateFrom < routePointB.dateFrom) {
    return -1;
  }
  return 0;
}

function sortRoutePointByDuration(routePointA, routePointB) {

  const getDurationBySort = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start)));

  if (getDurationBySort(routePointA.dateFrom, routePointA.dateTo) < getDurationBySort(routePointB.dateFrom, routePointB.dateTo)) {
    return 1;
  }
  if (getDurationBySort(routePointA.dateFrom, routePointA.dateTo) > getDurationBySort(routePointB.dateFrom, routePointB.dateTo)) {
    return -1;
  }
  return 0;
}

function sortRoutePointByPrice(routePointA, routePointB) {
  if (Number(routePointA.basePrice) < Number(routePointB.basePrice)) {
    return 1;
  }
  if (Number(routePointA.basePrice) > Number(routePointB.basePrice)) {
    return -1;
  }
  return 0;
}

export { getRandomInteger, getRandomArrayElement, generateSorting, humanizeDueDate,
  getDuration, filter, updateItem, sortRoutePointByDate, sortRoutePointByDuration, sortRoutePointByPrice };
