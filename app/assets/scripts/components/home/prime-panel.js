import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import Panel, {
  PanelHeadline,
  PanelTitle
} from '../common/panel';
import DataLayersBlock from './data-layers-block';
import FilterAoi from './filter-aoi';

const PrimePanel = styled(Panel)`
  width: 18rem;
`;

class ExpMapPrimePanel extends React.Component {
  render () {
    const { layers, onAction, onPanelChange, mapLoaded, aoiState } = this.props;

    return (
      <PrimePanel
        collapsible
        direction='left'
        onPanelChange={onPanelChange}
        headerContent={
          <PanelHeadline>
            <PanelTitle>Explore the map</PanelTitle>
          </PanelHeadline>
        }
        bodyContent={
          <>
            <FilterAoi
              onAction={onAction}
              aoiState={aoiState}
            />
            <DataLayersBlock
              layers={layers}
              mapLoaded={mapLoaded}
              onAction={onAction}
            />
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
