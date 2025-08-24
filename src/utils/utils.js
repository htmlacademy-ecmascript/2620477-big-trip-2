import flatpickr from 'flatpickr';
import { FilterType, SortingType } from '../constants.js';

const MS_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;

const TIME_FORMAT = 'H:i';
const DATE_FORMAT_EVENT = 'M d';
const DATE_FORMAT_FOR_INFO = 'd M';
const DATE_TIME_FORMAT = 'Y-m-dTH:i';
const DATE_YEAR_FORMAT = 'Y-m-d';
const DATE_TIME_FORMAT_EDIT = 'y/m/d H:i';

function generateSortTypesList() {
  return Object.values(SortingType);
}

function humanizePointTime(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), TIME_FORMAT) : '';
}

function humanizePointDate(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_FORMAT_EVENT) : '';
}

function humanizePointDateForInfo(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_FORMAT_FOR_INFO) : '';
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
  let days = Math.floor(duration / (MS_IN_SEC * SEC_IN_HOUR * HOURS_IN_DAY));
  let hours = Math.floor((duration / (MS_IN_SEC * SEC_IN_HOUR)) % HOURS_IN_DAY);
  let minutes = Math.floor((duration / (MS_IN_SEC * SEC_IN_MIN)) % SEC_IN_MIN);

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
  return (new Date(pointB.dateTo) - new Date(pointB.dateFrom)) - (new Date(pointA.dateTo) - new Date(pointA.dateFrom));
}

function sortPointsByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point !== undefined),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date() < new Date(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => new Date() > new Date(point.dateFrom) && new Date() < new Date(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => new Date() > new Date(point.dateTo)),
};

export {
  filter,
  humanizePointTime,
  humanizePointDate,
  humanizeDateTime,
  humanizeDateYear,
  humanizeDateTimeEdit,
  humanizePointDateForInfo,
  msToTime,
  sortPointsByDay,
  sortPointsByTime,
  sortPointsByPrice,
  generateSortTypesList,
};
