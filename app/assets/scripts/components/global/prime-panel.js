import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import Panel from '../common/panel';
import DataLayersBlock from '../common/data-layers-block';
import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle,
  PanelBlockBody
} from '../common/panel-block';
import FilterAoi from './filter-aoi';

import { visuallyHidden } from '../../styles/helpers';

const PrimePanel = styled(Panel)`
  width: 18rem;
`;

const PrimePanelHeader = styled.header`
  ${visuallyHidden()}
`;

class ExpMapPrimePanel extends React.Component {
  render () {
    const { layers, onAction, onPanelChange, mapLoaded, aoiState } = this.props;

    return (
      <PrimePanel
        collapsible
        direction='left'
        onPanelChange={onPanelChange}
        renderHeader={() => (
          <PrimePanelHeader>
            <h1>Explore the map</h1>
          </PrimePanelHeader>
        )}
        bodyContent={
          <>
            <DataLayersBlock
              layers={layers}
              mapLoaded={mapLoaded}
              onAction={onAction}
            />

            <PanelBlock>
              <PanelBlockHeader>
                <PanelBlockTitle>Tools</PanelBlockTitle>
              </PanelBlockHeader>
              <PanelBlockBody>
                <FilterAoi
                  onAction={onAction}
                  aoiState={aoiState}
                />
              </PanelBlockBody>
            </PanelBlock>
          </>
        }
      />
    );
  }
}

ExpMapPrimePanel.propTypes = {
  onPanelChange: T.func,
  onAction: T.func,
  layers: T.array,
  mapLoaded: T.bool,
  aoiState: T.object
};

export default ExpMapPrimePanel;
