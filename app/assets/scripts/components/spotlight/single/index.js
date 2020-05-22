import React from 'react';
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
import { getSpotlightArea } from '..';

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

  componentDidUpdate (prevProps, prevState) {
    const { data } = this.props;
    if (data && data.id !== prevProps.data.id) {
      this.mbMapRef.current.mbMap.flyTo({
        center: this.props.data.center,
        zoom: 9
      });
    }
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
      case 'map.loaded':
        this.mbMapRef.current.mbMap.flyTo({
          center: this.props.data.center,
          zoom: 9
        });
        break;
    }
  }

  render () {
    if (!this.props.data) return <UhOh />;

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
          <InpageBody>
            <ExploreCanvas>
              <PrimePanel
                collapsible
                direction='left'
                onPanelChange={this.resizeMap}
                headerContent={
                  <PanelHeadline>
                    <h2>{this.props.data.label}</h2>
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
        </Inpage>
      </App>
    );
  }
}

SpotlightAreasSingle.propTypes = {
};

function mapStateToProps (state, props) {
  return {
    data: getSpotlightArea(props.match.params.datasetId)
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightAreasSingle);
