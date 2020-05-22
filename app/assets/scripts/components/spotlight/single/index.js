import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';
import MbMap from '../../home/mb-map';
import UhOh from '../../uhoh';

import { themeVal } from '../../../styles/utils/general';
import Panel, { PanelHeadline, PanelTitle } from '../../common/panel';
import { glsp } from '../../../styles/utils/theme-values';
import { fetchSpotlightSingle as fetchSpotlightSingleAction } from '../../../redux/spotlight';
import { wrapApiResult, getFromState } from '../../../redux/reduxeed';
import { showGlobalLoading, hideGlobalLoading } from '../../common/global-loading';

const ExploreCanvas = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: min-content 1fr min-content;
  overflow: hidden;

  > * {
    grid-row: 1;
  }
`;

const ExploreCarto = styled.section`
  position: relative;
  height: 100%;
  background: ${themeVal('color.baseAlphaA')};
  display: grid;
  grid-template-rows: 1fr auto;
`;

const PrimePanel = styled(Panel)`
  width: 18rem;
`;

const PanelBodyInner = styled.div`
  padding: ${glsp()};
`;

class SpotlightAreasSingle extends React.Component {
  constructor (props) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();
  }

  componentDidMount () {
    this.requestSpotlight();
  }

  componentDidUpdate (prevProps, prevState) {
    const { spotlightId } = this.props.match.params;
    if (spotlightId !== prevProps.match.params.spotlightId) {
      this.requestSpotlight();
    }
  }

  async requestSpotlight () {
    showGlobalLoading();
    await this.props.fetchSpotlightSingle(this.props.match.params.spotlightId);
    hideGlobalLoading();
  }

  resizeMap () {
    if (this.mbMapRef.current) {
      // Delay execution to give the panel animation time to finish.
      setTimeout(() => {
        this.mbMapRef.current.mbMap.resize();
      }, 200);
    }
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'map.loaded': {
        const spotlightData = this.props.spotlight.getData();
        this.mbMapRef.current.mbMap.fitBounds(spotlightData.bounding_box);
        break;
      }
    }
  }

  render () {
    const { spotlight } = this.props;

    if (spotlight.hasError()) return <UhOh />;

    const spotlightData = spotlight.getData();

    return (
      <App>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Map</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          {spotlight.isReady() && (
            <InpageBody>
              <ExploreCanvas>
                <PrimePanel
                  collapsible
                  direction='left'
                  onPanelChange={this.resizeMap}
                  headerContent={
                    <PanelHeadline>
                      <h2>{spotlightData.label}</h2>
                    </PanelHeadline>
                  }
                  bodyContent={
                    <PanelBodyInner>
                      <p>Layers to control the map.</p>
                    </PanelBodyInner>
                  }
                />
                <ExploreCarto>
                  <MbMap
                    ref={this.mbMapRef}
                    onAction={this.onMapAction}
                    layers={[]}
                    activeLayers={[]}
                    layerData={{}}
                    aoiState={null}
                  />
                </ExploreCarto>
                <Panel
                  collapsible
                  direction='right'
                  onPanelChange={this.resizeMap}
                  headerContent={
                    <PanelHeadline>
                      <PanelTitle>Insights</PanelTitle>
                    </PanelHeadline>
                  }
                  bodyContent={
                    <PanelBodyInner>
                      <p>Detailed information for the area being viewed and/or interacted by the user.</p>
                    </PanelBodyInner>
                  }
                />
              </ExploreCanvas>
            </InpageBody>
          )}
        </Inpage>
      </App>
    );
  }
}

SpotlightAreasSingle.propTypes = {
  fetchSpotlightSingle: T.func,
  spotlight: T.object,
  match: T.object
};

function mapStateToProps (state, props) {
  return {
    spotlight: wrapApiResult(getFromState(state, ['spotlight', 'single', props.match.params.spotlightId]))
  };
}

const mapDispatchToProps = {
  fetchSpotlightSingle: fetchSpotlightSingleAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightAreasSingle);
