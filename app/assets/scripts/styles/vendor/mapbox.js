import { css } from 'styled-components';
import { rgba } from 'polished';

import { themeVal, stylizeFunction } from '../utils/general';
import { glsp } from '../utils/theme-values';
import Button from '../button/button';
import collecticon from '../collecticons';
import { stackSkin } from '../skins';

const _rgba = stylizeFunction(rgba);

// Some dependencies include styles that must be included.
// This file includes the mapbox styles with needed overrides to be used
// by styled components.

export default () => css`
  /* stylelint-disable no-descending-specificity */
  /* Overrides for mapbox styles.
   Move the needed parts from assets/styles/vendor to this file
   and take full advantage of styled-components. */

  .mapboxgl-map {
    color: ${themeVal('type.base.color')};
    font: ${themeVal('type.base.style')} ${themeVal('type.base.weight')}
      ${themeVal('type.base.size')} / ${themeVal('type.base.line')}
      ${themeVal('type.base.family')};

    *:active,
    *:focus {
      outline: none;
    }
  }

  .mapboxgl-ctrl-group.mapboxgl-ctrl-group {
    ${stackSkin()}
    position: relative;
    display: inline-flex;
    flex-flow: column;

    button {
      width: auto;
      height: auto;
    }

    > button + button {
      margin-top: -${themeVal('layout.border')};
    }

    .mapboxgl-ctrl-zoom-in.mapboxgl-ctrl-zoom-in {
      ${Button.getStyles({
        variation: 'base-plain',
        hideText: true,
        useIcon: 'plus--small'
      })}
    }

    .mapboxgl-ctrl-zoom-out.mapboxgl-ctrl-zoom-out {
      ${Button.getStyles({
        variation: 'base-plain',
        hideText: true,
        useIcon: 'minus--small'
      })}
    }

    .mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate {
      ${Button.getStyles({
        variation: 'base-plain',
        hideText: true,
        useIcon: 'crosshair'
      })}
    }

    > button:first-child:not(:last-child) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      clip-path: inset(-100% -100% 0 -100%);
    }

    > button:last-child:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      clip-path: inset(0 -100% -100% -100%);
    }

    > button:not(:first-child):not(:last-child) {
      border-radius: 0;
      clip-path: inset(0 -100%);
    }
  }

  .mapboxgl-control-container {
    position: relative;
    margin: ${glsp(0.5)};
    width: calc(100% - ${glsp(1)}); /* stylelint-disable-line */
    height: calc(100% - ${glsp(1)}); /* stylelint-disable-line */
    pointer-events: none;

    > * {
      float: none;
      pointer-events: auto;

      .mapboxgl-ctrl {
        margin: 0 0 ${glsp(0.5)} 0;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .mapboxgl-ctrl-top-left {
    top: ${glsp(2.5)};
    left: 0;
  }

  .mapboxgl-ctrl-top-right {
    top: ${glsp(2.5)};
    right: 0;
  }

  /* GEOCODER styles */
  .mapboxgl-ctrl.mapboxgl-ctrl-geocoder {
    ${stackSkin()}
    border-radius: ${themeVal('shape.rounded')};
    color: ${themeVal('type.base.color')};
    font: ${themeVal('type.base.style')} ${themeVal('type.base.weight')}
      0.875rem/1.25rem ${themeVal('type.base.family')};

    &::before {
      position: absolute;
      top: 6px;
      left: 8px;
      ${collecticon('magnifier-left')}
    }

    &.mapboxgl-ctrl-geocoder--collapsed {
      width: 2rem;
      min-width: 2rem;
      background: ${themeVal('color.baseDark')};
    }

    .mapboxgl-ctrl-geocoder--icon {
      display: none;
    }

    .mapboxgl-ctrl-geocoder--icon-loading {
      top: 5px;
      right: 8px;
    }

    .mapboxgl-ctrl-geocoder--button {
      width: 2rem;
      height: 2rem;
      top: 0;
      right: 0;
      background: none;
      border-radius: ${themeVal('shape.rounded')};
      transition: all 0.24s ease 0s;
      color: inherit;

      &:hover {
        opacity: 0.64;
      }

      &::before {
        ${collecticon('xmark--small')}
      }
    }

    .mapboxgl-ctrl-geocoder--input {
      height: 2rem;
      width: 100%;
      font: ${themeVal('type.base.style')} ${themeVal('type.base.weight')}
        0.875rem / ${themeVal('type.base.line')} ${themeVal('type.base.family')};
      padding: 0.25rem 2rem;
      color: inherit;

      &::placeholder {
        color: inherit;
        opacity: 0.64;
      }
    }

    .suggestions {
      ${stackSkin()}
      margin-bottom: 0.5rem;
      border-radius: ${themeVal('shape.rounded')};
      font: inherit;
      color: #ffffff;

      a {
        padding: 0.375rem 1rem;
        color: inherit;
        transition: all 0.24s ease 0s;

        &:hover {
          opacity: 1;
          background: ${_rgba(themeVal('color.base'), 0.04)};
          color: inherit;
        }
      }

      li {
        &:first-child a {
          padding-top: 0.5rem;
        }

        &:last-child a {
          padding-bottom: 0.75rem;
        }

        &.active > a {
          background: ${_rgba(themeVal('color.base'), 0.08)};

          &:hover {
            background: ${_rgba(themeVal('color.base'), 0.12)};
          }
        }
      }
    }
  }

  a.mapboxgl-ctrl-logo {
    margin: ${glsp(0.125)};
  }

  .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    border-radius: ${themeVal('shape.rounded')};
    padding: 0 0.5rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    background: ${_rgba(themeVal('color.baseDark'), 0.64)};
    opacity: 1;
  }

  .mapboxgl-ctrl-attrib a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  /* SWIPE COMPARE styles */
  .mapboxgl-compare .compare-swiper-vertical {
    width: 3rem;
    height: 3rem;
    left: 0;
    margin-top: 0;
    transform: translate(-50%, -50%);
    background-size: 3rem;
    background-color: ${themeVal('color.primary')};
  }
`;
