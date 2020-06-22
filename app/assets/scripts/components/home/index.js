import React from 'react';
import styled, { keyframes } from 'styled-components';
import T from 'prop-types';

import { connect } from 'react-redux';

import { themeVal } from '../../styles/utils/general';
import { visuallyHidden } from '../../styles/helpers';

import { Link } from 'react-router-dom';

import App from '../common/app';
import Button from '../../styles/button/button';
import collecticon from '../../styles/collecticons';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Prose from '../../styles/type/prose';
import MbMap from '../common/mb-map-explore/mb-map';
import { fetchSpotlightSingle as fetchSpotlightSingleAction } from '../../redux/spotlight';
import { wrapApiResult } from '../../redux/reduxeed';

import { headingAlt } from '../../styles/type/heading';
import {
  getLayersWithState,
  getInitialMapExploreState,
  getLayerState,
  setLayerState,
  toggleLayerCommon,
  resizeMap,
  getActiveTimeseriesLayers
} from '../../utils/map-explore-utils';

// import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';
import { surfaceElevatedD } from '../../styles/skins';
import media from '../../styles/utils/media-queries';

import stories from './stories';
import { getSpotlightLayers } from '../common/layers';
import { mod } from '../../utils/utils';

const CYCLE_TIME = 8000;

const Intro = styled.section`
  position: relative;
  min-height: 100%;
  background: ${themeVal('color.baseAlphaA')};
  display: flex;
  flex-flow: column nowrap;
  padding: ${glsp()};

  ${media.mediumUp`
    padding: ${glsp(2)};
  `}
`;

const IntroCopy = styled.div`
  ${surfaceElevatedD()}
  position: relative;
  z-index: 10;
  border-radius: ${themeVal('shape.rounded')};
  overflow: hidden;
  width: 100%;
  display: grid;

  ${media.smallUp`
    max-width: 32rem;
  `}

  ${media.mediumUp`
    max-width: 34rem;
  `}

  ${media.largeUp`
    max-width: 36rem;
  `}

  ${media.xlargeUp`
    max-width: 40rem;
  `}
`;

const IntroTitle = styled.h1`
  ${visuallyHidden()}
`;

const IntroWelcomeTitle = styled.h1`
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 0;


  ${media.mediumUp`
    font-size: 1.5rem;
    line-height: 1.75rem;
  `}

  small {
    ${headingAlt()}
    display: block;

    ${media.mediumUp`
      font-size: 1rem;
      line-height: 1;
    `}
  }

  strong {
    display: block;
    font-size: 2rem;
    line-height: 2.5rem;
    letter-spacing: -0.016em;
  }
`;

const IntroWelcome = styled.section`
  display: grid;
  grid-gap: ${glsp()};
  padding: ${glsp()};
  box-shadow: 0 1px 0 0 ${themeVal('color.baseAlphaB')};

  ${Prose} {
    a {
      font-weight: ${themeVal('type.base.bold')};
    }
  }

  ${media.mediumUp`
    grid-gap: ${glsp()} 0;
    padding: ${glsp(1.25, 2)};
  `}
`;

const IntroStats = styled.section`
  display: grid;
  grid-gap: ${glsp()} 0;
  padding: ${glsp()};

  ${media.mediumUp`
    grid-gap: ${glsp()} 0;
    padding: ${glsp(1.25, 2)};
  `}
`;

const IntroStatsTitle = styled.h1`
  ${visuallyHidden()}
`;

const IntroStatsList = styled.dl`
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  grid-gap: ${glsp(0.25, 1.5)};
  align-items: end;

  * {
    line-height: 1;
    margin: 0;
  }

  dt {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1;
    grid-row: 1;
  }

  dd {
    font-family: ${themeVal('type.base.family')};
    font-weight: ${themeVal('type.heading.weight')};
    font-size: 3rem;
    line-height: 1;
    grid-row: 2;
  }
`;

const IntroMedia = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const grow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const IntroStories = styled.section`
  position: relative;
  background: ${themeVal('color.primary')};
  color: ${themeVal('color.surface')};
  padding: ${glsp(0.75, 1, 1.25, 1)};

  ${media.smallUp`
    min-height: 12rem;
  `}
  
  ${media.mediumUp`
    padding: ${glsp(1.25, 2, 1.75, 2)};
    min-height: auto;
  `}

  &::before {
    ${collecticon('chart-bars')}
    font-size: 8rem;
    line-height: 1;
    opacity: 0.16;
    position: absolute;
    bottom: ${glsp()};
    right: ${glsp()};
    z-index: 1;

    ${media.mediumUp`
      bottom: ${glsp(1.5)};
      right: ${glsp(1.5)};
    `}
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const IntroStoriesHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const IntroStoriesTitle = styled.h1`
  ${headingAlt()}
  margin: 0 auto 0 0;
  padding-right: ${glsp()};
`;

const IntroStoriesToolbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-right: -${glsp(0.5)};

  ${media.mediumUp`
    margin-right: -${glsp(1)};
  `}

  > * {
    vertical-align: top;
  }
`;

const CycleProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0.25rem;
  background-color: rgba(255, 255, 255, 0.16);
  animation: ${grow} ${CYCLE_TIME}ms linear forwards;
`;

const Story = styled.article`
  display: flex;
`;

const StoryContent = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &,
  &:visited {
    color: inherit;
  }
`;

const StoryCopy = styled.div`
  display: grid;
  grid-gap: ${glsp()} 0;
`;

const StoryTitle = styled.h1`
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin: 0;
`;

const StoryProse = styled(Prose)`
  display: grid;
  grid-gap: ${glsp()} 0;
`;

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.mbMapRef = React.createRef();
    this.state = {
      storyIndex: 0,
      mapLoaded: false,
      mapLayers: [],
      storiesCycling: true,
      storiesCyclingIteration: 0,
      ...getInitialMapExploreState()
    };

    this.prevStory = this.prevStory.bind(this);
    this.nextStory = this.nextStory.bind(this);
    this.toggleStoriesCycling = this.toggleStoriesCycling.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
    this.getLayersWithState = getLayersWithState.bind(this);
    this.getLayerState = getLayerState.bind(this);
    this.setLayerState = setLayerState.bind(this);
    this.getActiveTimeseriesLayers = getActiveTimeseriesLayers.bind(this);
    this.resizeMap = resizeMap.bind(this);

    this.storiesCyclingTimeout = null;
  }

  componentDidMount (prevProps, prevState) {
    this.requestSpotlight();
  }

  componentDidUpdate (prevProps, prevState) {
    const { mapLoaded, storyIndex } = this.state;
    const { spotlight } = this.props;
    const { spotlightId, layers } = stories[storyIndex];
    if (mapLoaded) {
      if (spotlight !== prevProps.spotlight) {
        this.resizeMap();
        const spotlightData = spotlight[spotlightId].getData();
        if (spotlightData.bounding_box) {
          const storyLayers = layers;
          const spotlightLayers = getSpotlightLayers(spotlightId)
            .map(layer => ({ ...layer, enabled: storyLayers.includes(layer.id) }));
          this.mbMapRef.current.mbMap.fitBounds(spotlightData.bounding_box);
          this.setState({
            mapLayers: spotlightLayers
          }, () => {
            for (const l of spotlightLayers) {
              if (l.enabled && !this.state.activeLayers.includes(l.id)) {
                this.toggleLayer(l);
              }
            }
          });
        }
      }
    }
  }

  componentWillUnmount () {
    if (this.storiesCyclingTimeout) {
      clearTimeout(this.storiesCyclingTimeout);
    }
  }

  toggleLayer (layer) {
    toggleLayerCommon.call(this, layer, () => {
      if (this.storiesCyclingTimeout) {
        clearTimeout(this.storiesCyclingTimeout);
      }
      if (this.state.storiesCycling) {
        this.setState(state => ({
          storiesCyclingIteration: state.storiesCyclingIteration + 1
        }));
        this.storiesCyclingTimeout = setTimeout(() => {
          this.nextStory();
        }, CYCLE_TIME);
      }
    });
  }

  async requestSpotlight () {
    await this.props.fetchSpotlightSingle(stories[this.state.storyIndex].spotlightId);
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'map.loaded': {
        this.setState({ mapLoaded: true }, this.requestSpotlight);
        break;
      }
      case 'map.move': {
        // Any user interaction with the map will stop the stories.
        if (payload.userInitiated) {
          this.stopStoriesCycling();
        }
        break;
      }
    }
  }

  toggleStoriesCycling () {
    const { storiesCycling } = this.state;
    if (storiesCycling) {
      this.stopStoriesCycling();
    } else {
      this.startStoriesCycling();
    }
  }

  stopStoriesCycling () {
    // Stop timeout when the user paused
    if (this.storiesCyclingTimeout) {
      clearTimeout(this.storiesCyclingTimeout);
    }
    this.setState({ storiesCycling: false });
  }

  startStoriesCycling () {
    // Prepare timeout when the user restarts.
    this.storiesCyclingTimeout = setTimeout(() => {
      this.nextStory();
    }, CYCLE_TIME);
    this.setState({ storiesCycling: true });
  }

  prevStory (e) {
    // If the user is manually navigating, stop the auto play.
    if (e) {
      e.preventDefault();
      this.stopStoriesCycling();
    }
    this.setState(prevState => {
      return ({
        storyIndex: mod(prevState.storyIndex - 1, stories.length)
      });
    }, this.requestSpotlight);
  }

  nextStory (e) {
    // If the user is manually navigating, stop the auto play.
    if (e) {
      e.preventDefault();
      this.stopStoriesCycling();
    }
    this.setState(prevState => {
      return ({
        storyIndex: mod(prevState.storyIndex + 1, stories.length)
      });
    }, this.requestSpotlight);
  }

  render () {
    const {
      storyIndex,
      mapLayers,
      storiesCycling,
      storiesCyclingIteration,
      activeLayers
    } = this.state;
    const currentStory = stories[storyIndex];
    const layers = this.getLayersWithState(mapLayers);

    return (
      <App pageTitle='Home'>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Home</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Intro>
              <IntroCopy>
                <IntroTitle>Start exploring</IntroTitle>
                <IntroWelcome>
                  <IntroWelcomeTitle>Welcome</IntroWelcomeTitle>
                  <Prose>
                    <p>
                      As communities around the world have changed their behavior in response
                      to the spread of COVID-19, NASA satellites have observed changes in the
                      environment. This <strong>experimental</strong> dashboard reflects a rapid response to
                      COVID-19 that is currently underway and will continue to evolve as more
                      data becomes available. <Link to='/about' title='Read more on the about page'>Read more...</Link>
                    </p>
                  </Prose>
                </IntroWelcome>
                <IntroStats>
                  <IntroStatsTitle>Some numbers</IntroStatsTitle>
                  <IntroStatsList>
                    <dt>Areas</dt>
                    <dd><Link to='/explore' title='Explore the areas'>07</Link></dd>
                    <dt>Indicators</dt>
                    <dd><Link to='/indicators' title='Learn about the indicators'>04</Link></dd>
                  </IntroStatsList>
                </IntroStats>
                <IntroStories>
                  {storiesCycling && !!storiesCyclingIteration && <CycleProgressBar key={storiesCyclingIteration} /> }
                  <IntroStoriesHeader>
                    <IntroStoriesTitle>Did you know?</IntroStoriesTitle>
                    <IntroStoriesToolbar>
                      <Button
                        title={storiesCycling ? 'Stop cycling through stories' : 'Start cycling through stories'}
                        variation='achromic-plain'
                        useIcon={storiesCycling ? 'circle-pause' : 'circle-play'}
                        hideText
                        onClick={this.toggleStoriesCycling}
                      >
                        {storiesCycling ? 'Stop' : 'Start'}
                      </Button>
                      <Button
                        element='a'
                        title='View previous story'
                        href='#'
                        variation='achromic-plain'
                        useIcon='chevron-left--small'
                        hideText
                        onClick={this.prevStory}
                      >
                        Previous
                      </Button>
                      <Button
                        element='a'
                        title='View next story'
                        href='#'
                        variation='achromic-plain'
                        useIcon='chevron-right--small'
                        hideText
                        onClick={this.nextStory}
                      >
                        Next
                      </Button>
                    </IntroStoriesToolbar>
                  </IntroStoriesHeader>
                  <Story>
                    <StoryContent title='Explore the data' href={currentStory.link}>
                      <StoryCopy>
                        <StoryProse>
                          <p>{currentStory.prose}</p>
                        </StoryProse>
                      </StoryCopy>
                    </StoryContent>
                  </Story>
                </IntroStories>
              </IntroCopy>
              <IntroMedia>
                <MbMap
                  ref={this.mbMapRef}
                  onAction={this.onMapAction}
                  layers={layers}
                  activeLayers={activeLayers}
                  date={new Date('03/01/20')}
                  aoiState={null}
                  comparing={false}
                  disableControls
                />
              </IntroMedia>
            </Intro>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

Home.propTypes = {
  fetchSpotlightSingle: T.func,
  spotlight: T.object
};

function mapStateToProps (state, props) {
  return {
    spotlight: wrapApiResult(state.spotlight.single, true)
  };
}

const mapDispatchToProps = {
  fetchSpotlightSingle: fetchSpotlightSingleAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
