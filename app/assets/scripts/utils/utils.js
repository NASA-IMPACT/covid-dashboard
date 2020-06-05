import React from 'react';
import * as d3 from 'd3';

/**
 * Calculates the integer remainder of a division of a by n, handling negative
 * modulo in the mathematically expected way.
 *
 * This is very helpful for cycling array indexes.
 * If the current index is the first, the last is returned, and vice-versa.
 *
 * Given an index if we want to know the previous:
 * @example
 *   const arr = [1, 2, 3];
 *   const arrIdx = 0;
 *   const newIdx = mod(arrIdx - 1, arr.length); // 2
 *
 * @param {number} a Dividend
 * @param {number} n Divisor
 */
export function mod (a, n) {
  return ((a % n) + n) % n;
}

/**
 * Created a validator function that ensures a number is within the given range.
 *
 * @param {number} min Range lower bound (inclusive)
 * @param {number} max Range upper bound (inclusive)
 *
 * @returns {function} Validator function.
 */
export function validateRangeNum (min, max) {
  return (raw) => {
    const value = Number(raw);
    return !isNaN(value) && raw !== '' && value >= min && value <= max;
  };
}

/**
 * Compares two values using JSON stringification.
 *
 * @param {mixed} a Data to compare
 * @param {mixed} b Data to compare
 */
export function isEqualObj (a, b) {
  // Exist early if they're the same.
  if (a === b) return true;
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Create a date which matches the input date offsetting the timezone to match
 * the user's.
 * If the user is in UTC-5 time and the date string is in UTC the date will be
 * constructed disregarding the input date's timezone.
 * Ex:
 * input: 2019-01-01T00:00:00Z
 * normal output: 2018-12-31T19:00:00 -05:00
 * utcDate output: 2019-01-01T00:00:00 -05:00
 *
 * Basically the real date gets changed by the timezone offset.
 * Times I had timezone related bugs and this fn saved me: 4
 *
 * @param {string} str Date String
 *
 * @returns Date
 */
export function utcDate (str) {
  const date = new Date(str);
  // If the date is not valid, return it and be done.
  if (isNaN(date.getTime())) return date;
  const offset = date.getTimezoneOffset();
  date.setTime(date.getTime() + offset * 60 * 1000);
  return date;
}

/**
 * Removes given props from the component returning a new one.
 * This is used to circumvent a bug with styled-component where unwanted props
 * are passed to the dom causing react to display an error:
 *
 * ```
 *   `Warning: React does not recognize the hideText prop on a DOM element.
 *   If you intentionally want it to appear in the DOM as a custom attribute,
 *   spell it as lowercase hideText instead. If you accidentally passed it from
 *   a parent component, remove it from the DOM element.`
 * ```
 *
 * This commonly happens when an element is impersonating another with the
 * `as` prop:
 *
 *     <Button hideText as={Link}>Home</Button>
 *
 * Because of a bug, all the props passed to `Button` are passed to `Link`
 * without being filtered before rendering, causing the aforementioned error.
 *
 * This utility creates a component that filter out unwanted props and can be
 * safely used as an impersonator.
 *
 *     const CleanLink = filterComponentProps(Link, ['hideText'])
 *     <Button hideText as={CleanLink}>Home</Button>
 *
 * Issue tracking the bug: https://github.com/styled-components/styled-components/issues/2131
 *
 * Note: The props to filter out are manually defined to reduce bundle size,
 * but it would be possible to automatically filter out all invalid props
 * using something like @emotion/is-prop-valid
 *
 * @param {object} Comp The react component
 * @param {array} filterProps Props to filter off of the component
 */
export function filterComponentProps (Comp, filterProps = []) {
  const isValidProp = p => !filterProps.includes(p);

  return React.forwardRef((rawProps, ref) => {
    const props = Object.keys(rawProps).reduce((acc, p) => (
      isValidProp(p) ? { ...acc, [p]: rawProps[p] } : acc
    ), {});
    return <Comp ref={ref} {...props} />;
  });
}

const toDateAccessor = d => utcDate(d.date);
/**
 * Returns the closed object to the given date.
 *
 * @param {array} data Array of data objects. Each object must have a date property
 * @param {Date} date The date by which to bisect the array.
 */
export const bisectByDate = (data, date, accessor = toDateAccessor) => {
  // Define bisector function. Is used to find where this date would fin in the
  // data array
  const bisect = d3.bisector(d => accessor(d).getTime()).left;
  const mouseDate = date.getTime();
  // Returns the index to the current data item.
  const i = bisect(data, mouseDate);

  if (i === 0) {
    return data[i];
  } else if (i === data.length) {
    return data[i - 1];
  } else {
    const docR = data[i];
    const docL = data[i - 1];
    const deltaL = mouseDate - accessor(docL).getTime();
    const deltaR = accessor(docR).getTime() - mouseDate;
    return deltaL > deltaR
      ? docR
      : docL;
  }
};
