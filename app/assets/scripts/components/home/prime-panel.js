import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import Panel, {
  PanelHeadline,
  PanelTitle
} from '../common/panel';
import DataLayersBlock from './data-layers-block';

const PrimePanel = styled(Panel)`
  width: 18rem;
`;

class ExpMapPrimePanel extends React.Component {
  render () {
    const { layers, onAction, onPanelChange, mapLoaded } = this.props;
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
          <DataLayersBlock
            layers={layers}
            mapLoaded={mapLoaded}
            onAction={onAction}
          />
        }
      />
    );
  }
}

ExpMapPrimePanel.propTypes = {
  onPanelChange: T.func,
  onAction: T.func,
  layers: T.array,
  mapLoaded: T.bool
};

export default ExpMapPrimePanel;
