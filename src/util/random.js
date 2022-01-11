import { isArray } from "lodash";

export function getRandomInteger(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.round(Math.random() * (max - min) + min);
}
export function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw Error();
    }
    return array[getRandomInteger(0, array.length - 1)];
}
export function getRandomDate(minYear, maxYear) {
    let date1 = `01-01-${minYear}`;
    let date2 = `12-31-${maxYear}`;
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
        return new Date(getRandomInteger(date2, date1));
    } else {
        return new Date(getRandomInteger(date1, date2));
    }
}