import flatpickr from 'flatpickr';
import { FilterType } from '../constants.js';

const TIME_FORMAT = 'H:i';
const DATE_FORMAT_EVENT = 'M d';
const DATE_TIME_FORMAT = 'Y-m-dTH:i';
const DATE_YEAR_FORMAT = 'Y-m-d';
const DATE_TIME_FORMAT_EDIT = 'y/m/d H:i';

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints.filter((point) => point !== undefined),
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((point) => new Date() < new Date(point.dateFrom)),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((point) => new Date() > new Date(point.dateFrom) && new Date() < new Date(point.dateTo)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((point) => new Date() > new Date(point.dateTo)),
};

function humanizePointTime(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), TIME_FORMAT) : '';
}

function humanizePointDate(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_FORMAT_EVENT) : '';
}

function humanizeDateTime(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_TIME_FORMAT) : '';
}

function humanizeDateYear(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_YEAR_FORMAT) : '';
}

function humanizeDateTimeEdit(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_TIME_FORMAT_EDIT) : '';
}

function msToTime(duration) {
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);

  days = (days < 10) ? `0${ days }` : days;
  hours = (hours < 10) ? `0${ hours }` : hours;
  minutes = (minutes < 10) ? `0${ minutes }M` : `${ minutes }M`;

  days = (days > 0) ? `${ days }D ` : '';
  hours = (hours > 0) ? `${ hours }H ` : '';

  return `${ days }${ hours }${ minutes }`;
}

function sortPointsByDay(pointA, pointB) {
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function sortPointsByTime(pointA, pointB) {
  return (new Date(pointA.dateTo) - new Date(pointA.dateFrom))
   - (new Date(pointB.dateTo) - new Date(pointB.dateFrom));
}

function sortPointsByPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

export { getRandomArrayElement, getRandomInteger, filter, humanizePointTime, humanizePointDate,
  humanizeDateTime, humanizeDateYear,humanizeDateTimeEdit, msToTime,
  sortPointsByDay, sortPointsByTime, sortPointsByPrice };
