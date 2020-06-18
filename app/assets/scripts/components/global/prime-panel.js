import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import Panel, { PanelHeadline, PanelTitle } from '../common/panel';
import DataLayersBlock from '../common/data-layers-block';
import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle,
  PanelBlockBody
} from '../common/panel-block';
import FilterAoi from './filter-aoi';
import ExploreNavigation from '../common/explore-navigation';

import media, { isLargeViewport } from '../../styles/utils/media-queries';

const PrimePanel = styled(Panel)`
  ${media.largeUp`
    width: 18rem;
  `}
`;

class ExpMapPrimePanel extends React.Component {
  render () {
    const {
      layers,
      onAction,
      onPanelChange,
      mapLoaded,
      aoiState,
      spotlightList
    } = this.props;

    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();

    return (
      <PrimePanel
        collapsible
        direction='left'
        onPanelChange={onPanelChange}
        initialState={isLargeViewport()}
        headerContent={(
          <PanelHeadline>
            <PanelTitle>Explore</PanelTitle>
          </PanelHeadline>
        )}
        bodyContent={
          <>
            <ExploreNavigation spotlights={spotlightAreas || []} />
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
                <FilterAoi onAction={onAction} aoiState={aoiState} />
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
  aoiState: T.object,
  spotlightList: T.object
};

export default ExpMapPrimePanel;
