'use strict';
import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import Dropdown from '../../common/dropdown';
import Button, { buttonVariationHoverCss } from '../../../styles/button/button';
import { FormSwitch } from '../../../styles/form/switch';
import { headingAlt } from '../../../styles/type/heading';
import { themeVal } from '../../../styles/utils/general';
import { glsp } from '../../../styles/utils/theme-values';

const DropTitle = styled.h6`
  ${headingAlt()}
  color: ${({ theme }) => rgba(theme.type.base.color, 0.64)};
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 0 0 ${glsp()} 0;
`;

const LayersList = styled.ul`
  list-style: none;
  margin: 0 -${glsp()};
  padding: 0;

  > li {
    padding: ${glsp()};
    box-shadow: 0 ${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaB')};
  }

  > li:first-child {
    padding-top: 0;
  }

  > li:last-child {
    padding-bottom: 0;
    box-shadow: none;
  }

  > li > *:last-child {
    margin-bottom: 0;
  }
`;

const LayerSwitch = styled(FormSwitch)`
  display: grid;
  grid-template-columns: 1fr auto;
`;

// Why you ask? Very well:
// Mapbox's css has an instruction that sets the hover color for buttons to
// near black. The only way to override it is to increase the specificity and
// we need the button functions to get the correct color.
// The infamous instruction:
// .mapboxgl-ctrl > button:hover {
//   background-color: rgba(0, 0, 0, 0.05);
// }
const LayersButton = styled(Button)`
  &&&:hover {
    background-color: red;
    ${({ theme }) => buttonVariationHoverCss(theme.type.base.color, 'raised', 'light', { theme })}
  }
`;

// React component for the layer control.
// It is disconnected from the global state because it needs to be included
// via the mapbox code.
export default class LayerControlDropdown extends React.Component {
  render () {
    const {
      overlayState,
      handleOverlayChange
    } = this.props;

    return (
      <Dropdown
        triggerElement={
          <LayersButton
            variation='base-raised-light'
            useIcon='iso-stack'
            hideText
          >
            Select map overlays
          </LayersButton>
        }
        direction='right'
        alignment='top'
      >
        <DropTitle>Toggle overlays</DropTitle>
        <LayersList>
          <li>
            <LayerSwitch
              name='switch-spotlight'
              title='Toggle spotlight markers on/off'
              checked={overlayState.spotlightMarkers}
              onChange={() => handleOverlayChange('spotlightMarkers')}
            >
              Spotlight markers
            </LayerSwitch>
          </li>
        </LayersList>
      </Dropdown>
    );
  }
}

LayerControlDropdown.propTypes = {
  overlayState: T.object,
  handleOverlayChange: T.func
};
