import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import T from 'prop-types';
import { connect } from 'react-redux';
import { glsp } from '../../../styles/utils/theme-values';
import { truncated } from '../../../styles/helpers';

import App from '../../common/app';
import UhOh from '../../uhoh';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageBody,
} from '../../../styles/inpage';
import SecPanel from './sec-panel';
import MbMap from '../../common/mb-map-explore/mb-map';

import { getStory } from '../';
import { themeVal } from '../../../styles/utils/general';
import media from '../../../styles/utils/media-queries';
import {
  getInitialMapExploreState,
  getLayersWithState,
  resizeMap
} from '../../../utils/map-explore-utils';
import Button from '../../../styles/button/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropMenuItem
} from '../../common/dropdown';

const InpageHeaderInnerAlt = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  padding: ${glsp(0.25, 1)};

  ${media.mediumUp`
    padding: ${glsp()};
  `}

  ${media.largeUp`
    padding: ${glsp()};
  `}
`;

const InpageTitleAlt = styled.h1`
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: ${themeVal('type.base.light')};
  margin: ${glsp(0, 0, -0.5, 0)};
`;

const InpageSecTitle = styled.h2`
  min-width: 0;
  
  > a {
    margin-left: ${glsp(-0.75)};

    span {
      ${truncated()}
      max-width: 100%;
    }
  }
`;

const InpageToolbarAlt = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin-left: auto;
  padding-left: ${glsp()};

  > *:last-child {
    margin-right: ${glsp(-0.5)};
  }
`;

const ExploreCanvas = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr min-content;
  overflow: hidden;

  ${media.mediumDown`
    ${({ panelSec }) => panelSec && 'grid-template-columns: 0 min-content;'}
  `}

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
  min-width: 0;
  overflow: hidden;
`;

class StoriesSingle extends React.Component {
  constructor (props) {
    super(props);
    // Functions from helper file.
    this.resizeMap = resizeMap.bind(this);
    this.getLayersWithState = getLayersWithState.bind(this);

    this.onMapAction = this.onMapAction.bind(this);
    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();

    this.state = {
      ...getInitialMapExploreState(),
      mapLayers: [],
      panelSec: false
    };
  }

  async onMapAction (action, payload) {
    console.log('onMapAction', action, payload);
  }

  render () {
    const { mapLayers, activeLayers } = this.state;
    const {
      story,
      match: {
        params: { chapterId }
      }
    } = this.props;
    const layers = this.getLayersWithState(mapLayers);

    if (!story) return <UhOh />;

    const chapterIdx = story.chapters.findIndex((c) => c.id === chapterId);
    const chapter = story.chapters[chapterIdx];
    if (!chapter) return <UhOh />;

    const prevChapter = story.chapters[chapterIdx - 1];
    const nextChapter = story.chapters[chapterIdx + 1];

    return (
      <App hideFooter pageTitle={story.name}>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInnerAlt>
              <InpageHeadline>
                <InpageTitleAlt>{story.name}</InpageTitleAlt>
                <InpageSecTitle>
                  <Dropdown
                    alignment='center'
                    direction='down'
                    triggerElement={
                      <Button
                        as='a'
                        variation='achromic-plain'
                        title='View story chapters'
                        useIcon={['chevron-down--small', 'after']}
                      >
                        <span>{chapter.name}</span>
                      </Button>
                    }
                  >
                    <DropTitle>Chapters</DropTitle>
                    <DropMenu role='menu' selectable>
                      {story.chapters.map((c) => (
                        <li key={c.id}>
                          <DropMenuItem
                            as={Link}
                            active={c.id === chapterId}
                            to={`/stories/${story.id}/${c.id}`}
                            title='View chapter of this story'
                            data-dropdown='click.close'
                          >
                            {c.name}
                          </DropMenuItem>
                        </li>
                      ))}
                    </DropMenu>
                  </Dropdown>
                </InpageSecTitle>
              </InpageHeadline>
              <InpageToolbarAlt>
                <Button
                  element={Link}
                  title='View previous chapter of this story'
                  to={
                    prevChapter
                      ? `/stories/${story.id}/${prevChapter.id}`
                      : '/stories'
                  }
                  variation='achromic-plain'
                  useIcon='chevron-left--small'
                  hideText
                  disabled={!prevChapter}
                >
                  Previous
                </Button>
                <Button
                  element={Link}
                  title='View next chapter of this story'
                  to={
                    nextChapter
                      ? `/stories/${story.id}/${nextChapter.id}`
                      : '/stories'
                  }
                  variation='achromic-plain'
                  useIcon='chevron-right--small'
                  hideText
                  disabled={!nextChapter}
                >
                  Next
                </Button>
              </InpageToolbarAlt>
            </InpageHeaderInnerAlt>
          </InpageHeader>
          <InpageBody>
            <ExploreCanvas panelSec={this.state.panelSec}>
              <ExploreCarto>
                <MbMap
                  ref={this.mbMapRef}
                  onAction={this.onMapAction}
                  layers={layers}
                  activeLayers={activeLayers}
                  date={new Date()}
                  mapPos={null}
                  aoiState={null}
                  comparing={false}
                />
              </ExploreCarto>

              <SecPanel
                onPanelChange={({ revealed }) => {
                  this.resizeMap();
                  this.setState({ panelSec: revealed });
                }}
                content={chapter.contentComp}
              />
            </ExploreCanvas>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

StoriesSingle.propTypes = {
  story: T.object,
  match: T.object
};

function mapStateToProps (state, props) {
  const { storyId } = props.match.params;
  return {
    story: getStory(storyId)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesSingle);
