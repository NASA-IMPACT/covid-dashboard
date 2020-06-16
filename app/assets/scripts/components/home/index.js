import React from 'react';
import styled, { css } from 'styled-components';
import T from 'prop-types';

import { rgba } from 'polished';
import { connect } from 'react-redux';

import { themeVal, stylizeFunction } from '../../styles/utils/general';
// import collecticon from '../../styles/collecticons';
// import { visuallyHidden } from '../../styles/helpers';

import { Link } from 'react-router-dom';

import App from '../common/app';
import Button from '../../styles/button/button';
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
import { wrapApiResult, getFromState } from '../../redux/reduxeed';

import { headingAlt } from '../../styles/type/heading';

// import { filterComponentProps } from '../../utils/utils';
import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';

import stories from './stories';

const _rgba = stylizeFunction(rgba);

const Intro = styled.section`
  position: relative;
  height: 100%;
  background: ${themeVal('color.baseAlphaA')};
`;

const IntroCopy = styled.div`
  position: absolute;
  top: ${glsp()};
  left: ${glsp()};
  z-index: 10;
  padding: ${glsp()};
  border-radius: ${themeVal('shape.rounded')};
  max-height: calc(100% - ${glsp(2)});
  width: 100%;
  max-width: 16rem;
  overflow-y: auto;
  display: grid;
  grid-gap: ${glsp()} 0;

  ${() => CSS.supports('backdrop-filter', 'blur(0.5rem)')
    ? css`
        background: ${_rgba(themeVal('color.surface'), 0.48)};
        backdrop-filter: blur(0.5rem);
      ` : css`
        background: ${_rgba(themeVal('color.surface'), 0.80)};
      `
  }

  ${media.smallUp`
    max-width: 24rem;
  `}

  ${media.mediumUp`
    top: ${glsp(2)};
    left: ${glsp(2)};
    padding: ${glsp(2)};
    max-height: calc(100% - ${glsp(4)});
    max-width: 28rem;
  `}

  ${media.largeUp`
    max-height: calc(100% - ${glsp(6)});
    max-width: 36rem;
  `}
`;

const IntroTitle = styled.h1`
  margin: 0;

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

const IntroProse = styled(Prose)`
  background: transparent;
`;

const IntroStats = styled.div`
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

/*
const IntroMedia = styled.figure`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    ${visuallyHidden()}
  }

  &::before {
    ${collecticon('map')}
    opacity: 0.08;
    font-size: 48rem;
  }
`;
*/

const IntroStories = styled.section`
  background: ${themeVal('color.primary')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${glsp()};
  color: ${themeVal('color.surface')};
`;

const IntroStoriesTitle = styled.h1`
  ${headingAlt()}
  margin: 0;
`;

const Story = styled.article`
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

const StoryActions = styled.div``;

const Previous = styled(Button)`
  position: fixed;
  top: 50%;
  left: 0;
`;
const Next = styled(Button)`
  position: fixed;
  top: 50%;
  right: 0;

`;

// const propsToFilter = ['size', 'useIcon', 'variation'];
// const CleanNavLink = filterComponentProps(NavLink, propsToFilter);

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.mbMapRef = React.createRef();
    this.state = {
      storyIndex: 0,
      mapLoaded: false
    };

    this.prevStory = this.prevStory.bind(this);
    this.nextStory = this.nextStory.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
  }

  componentDidMount (prevProps, prevState) {
    this.requestSpotlight();
  }

  componentDidUpdate (prevProps, prevState) {
    const { mapLoaded, storyIndex } = this.state;
    const { spotlight } = this.props;
    if (mapLoaded) {
      if (spotlight !== prevProps.spotlight) {
        const spotlightData = spotlight[stories[storyIndex].spotlightId].getData();
        if (spotlightData.bounding_box) {
          this.mbMapRef.current.mbMap.fitBounds(spotlightData.bounding_box);
        }
      }
    }
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
    }
  }

  prevStory () {
    this.setState(prevState => {
      return ({
        storyIndex: prevState.storyIndex - 1
      });
    }, this.requestSpotlight);
  }

  nextStory () {
    this.setState(prevState => {
      return ({
        storyIndex: prevState.storyIndex + 1
      });
    }, this.requestSpotlight);
  }

  render () {
    const { storyIndex } = this.state;
    const currentStory = stories[storyIndex];
    return (
      <App pageTitle='Home' hideFooter>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Welcome</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Intro>
              <IntroCopy>
                <IntroTitle>
                  <small>Welcome to the</small>
                  <strong>COVID-19 Data Dashboard</strong>
                </IntroTitle>
                <IntroProse>
                  <p>
                    Interact with real NASA data and
                    investigate how social distancing measures and regional
                    shelter-in-place guidelines have affected Earth’s air, land,
                    and water. Explore individual &apos;Spotlight Areas&apos; to
                    see how the indicators in each specific location have
                    changed through time.
                  </p>
                </IntroProse>
                <IntroStats>
                  <dt>Locations</dt>
                  <dd><Link to='/spotlight' title='Explore the spotlight areas'>06</Link></dd>
                  <dt>Indicators</dt>
                  <dd><Link to='/indicators' title='Learn about the indicators'>20</Link></dd>
                  <dt>Stories</dt>
                  <dd><Link to='' title='Dive into the stories'>04</Link></dd>
                </IntroStats>
                <IntroStories>
                  <IntroStoriesTitle>Did you know?</IntroStoriesTitle>
                  <Story>
                    <StoryTitle>{currentStory.title}</StoryTitle>
                    <StoryProse>
                      <p>{currentStory.prose}</p>
                    </StoryProse>
                    <StoryActions>
                      <Button
                        as='a'
                        title='View the global map'
                        to='/'
                        variation='base-raised-light'
                        useIcon={['chevron-right--small', 'after']}
                      >
                        Learn more
                      </Button>
                    </StoryActions>
                  </Story>
                </IntroStories>
              </IntroCopy>
              {/*
              <IntroMedia>
              </IntroMedia>
              */}
              <MbMap
                ref={this.mbMapRef}
                onAction={this.onMapAction}
                layers={[]}
                activeLayers={[]}
                // date={this.state.timelineDate}
                aoiState={null}
                comparing={false}
              />
              <Previous
                as='a'
                title='Previous story'
                disabled={storyIndex === 0}
                to='/'
                variation='base-raised-light'
                useIcon={['chevron-left--small', 'after']}
                hideText
                onClick={this.prevStory}
              />
              <Next
                as='a'
                title='Previous story'
                to='/'
                disabled={storyIndex === stories.length - 1}
                variation='base-raised-light'
                useIcon={['chevron-right--small', 'after']}
                hideText
                onClick={this.nextStory}
              />

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
  const spotlight = Object.keys(state.spotlight.single).reduce((accum, key) => {
    return (
      {
        ...accum,
        [key]: wrapApiResult(getFromState(state, ['spotlight', 'single', key]))
      }
    );
  }, {});
  return {
    spotlight
  };
}

const mapDispatchToProps = {
  fetchSpotlightSingle: fetchSpotlightSingleAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
