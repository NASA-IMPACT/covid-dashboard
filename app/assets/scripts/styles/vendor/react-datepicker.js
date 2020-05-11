import { css } from 'styled-components';

import { themeVal } from '../utils/general';
import collecticon from '../collecticons';
import { visuallyHidden } from '../helpers';

// Some dependencies include styles that must be included.
// This file overrides to be used the default react-datepicker styles.

export default () => css`
  .react-datepicker {
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: ${themeVal('type.base.family')};
    font-size: ${themeVal('type.base.size')};
    color: inherit;
    background: ${themeVal('color.surface')};
  }

  .react-datepicker__header {
    padding: 0;
    font-size: ${themeVal('type.base.size')};
    border: none;
  }

  .react-datepicker__month-container {
    text-align: center;
  }

  .react-datepicker__header,
  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: ${themeVal('type.base.color')};
  }

  .react-datepicker__month {
    box-shadow: 0 -1px 0 0 ${themeVal('color.glimmer')};
    margin-top: 0;
    padding-top: 0.25rem;
  }

  .react-datepicker-year-header {
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .react-datepicker__day-name {
    width: 2rem;
    line-height: 1.5rem;
    font-size: 0.75rem;
  }

  .react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    outline: 0;
    text-align: center;
    transition: background-color 0.24s ease 0s;

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  .react-datepicker__day--in-range {
    color: #FFF;
    background: rgba(255, 255, 255, 0.02);

    &.react-datepicker__day--range-start,
    &.react-datepicker__day--range-end{
      color: #FFF;
      background: rgba(255, 255, 255, 0.08);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  }

  .react-datepicker__day--in-selecting-range {
    color: #FFF;
    background: rgba(255, 255, 255, 0.02);
    transition: background-color 0.24s ease 0s;

    &.react-datepicker__day--selecting-range-end {
      color: #FFF;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .react-datepicker__month-text,
  .react-datepicker__quarter-text {
    transition: background-color 0.24s ease 0s;

    &:hover {
      color: #FFF;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .react-datepicker__day--today,
  .react-datepicker__month-text--today,
  .react-datepicker__quarter-text--today {
    font-weight: inherit;
  }

  .react-datepicker__day--disabled {
    opacity: 0.48;
    pointer-events: none;
  }

  .react-datepicker__navigation {
    overflow: visible;
    text-indent: initial;
    border: none;
    top: 0;
    line-height: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    outline: 0;
    border-radius: ${themeVal('shape.rounded')};
    transition: background-color 0.24s ease 0s;
    text-align: center;

    span {
      ${visuallyHidden()}
    }

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    &:active {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .react-datepicker__navigation--next::before {
    ${collecticon('chevron-right--small')}
    color: ${themeVal('type.base.color')};
  }

  .react-datepicker__navigation--previous::before {
    ${collecticon('chevron-left--small')}
    color: ${themeVal('type.base.color')};
  }

  .react-datepicker-year-header,
  .react-datepicker__current-month {
    cursor: pointer;
    display: inline-block;
    padding: 0 0.25rem;
    transition: background-color 0.24s ease 0s;

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    &:active {
      background: rgba(255, 255, 255, 0.08);
    }

    &::after {
      ${collecticon('swap-horizontal')}
      vertical-align: top;
      margin-left: 0.5rem;
    }
  }
`;
