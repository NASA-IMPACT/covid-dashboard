import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import T from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import App from '../../common/app';
import UhOh from '../../uhoh';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageBody
} from '../../../styles/inpage';
import SecPanel from './sec-panel';
import MbMap from '../../common/mb-map-explore/mb-map';
import Button from '../../../styles/button/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropMenuItem
} from '../../common/dropdown';
import ShadowScrollbar from '../../common/shadow-scrollbar';

import { themeVal } from '../../../styles/utils/general';
import media from '../../../styles/utils/media-queries';
import { glsp } from '../../../styles/utils/theme-values';
import { truncated } from '../../../styles/helpers';
import history from '../../../utils/history';
import { getStory } from '../';
import {
  getInitialMapExploreState,
  getLayersWithState,
  resizeMap,
  toggleLayerCommon
} from '../../../utils/map-explore-utils';
import { getSpotlightLayers } from '../../common/layers';
import { utcDate } from '../../../utils/utils';

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
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${themeVal('type.base.light')};
  margin: ${glsp(0, 0, -0.25, 0)};
`;

const InpageSecTitle = styled.h2`
  min-width: 0;

  > ${Button} {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-left: ${glsp(-0.75)};

    span {
      ${truncated()}
      max-width: 100%;
    }
  }
`;

const ChapterDropdown = styled(Dropdown)`
  max-width: 20rem;
  overflow: hidden;
  padding: 0;

  > div {
    height: 100%;
  }
`;

const DropdownScrollInner = styled.div`
  padding: ${glsp()};

  li li a {
    padding-left: 2rem;
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

const ChapterCount = styled.strong`
  line-height: 2rem;
  margin-right: ${glsp(0.5)};
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

const findById = (haystack = [], id) => {
  const idx = haystack.findIndex((c) => c.id === id);
  return [idx === -1 ? null : idx, haystack[idx]];
};

const getPreviousItem = (chapters, currChapterIdx, currSectionIdx = 0) => {
  // Try to get the previous section.
  const chapter = chapters[currChapterIdx];
  const prevSec = get(chapter, ['sections', currSectionIdx - 1]);
  if (prevSec) {
    return {
      chapter,
      section: prevSec
    };
  }

  // There's no previous section. Get the previous chapter.
  const prevChapter = chapters[currChapterIdx - 1];
  // There's no previous chapter.
  if (!prevChapter) return null;

  // If the chapter has sections return the last
  if (prevChapter.sections) {
    const lastSection = prevChapter.sections[prevChapter.sections.length - 1];
    return {
      chapter: prevChapter,
      section: lastSection
    };
  } else {
    return {
      chapter: prevChapter
    };
  }
};

const getNextItem = (chapters, currChapterIdx, currSectionIdx = 0) => {
  // Try to get the next section.
  const chapter = chapters[currChapterIdx];
  const nextSec = get(chapter, ['sections', currSectionIdx + 1]);
  if (nextSec) {
    return {
      chapter,
      section: nextSec
    };
  }

  // There's no next section. Get the next chapter.
  const nextChapter = chapters[currChapterIdx + 1];
  // There's no next chapter.
  if (!nextChapter) return null;

  // If the chapter has sections return the first
  if (nextChapter.sections) {
    return {
      chapter: nextChapter,
      section: nextChapter.sections[0]
    };
  } else {
    return {
      chapter: nextChapter
    };
  }
};

const createItemUrl = (story, item) => {
  if (!item) return '/stories';

  const { chapter, section } = item;
  const base = `/stories/${story.id}/${chapter.id}`;
  return section ? `${base}/${section.id}` : base;
};

const getCurrentItemNum = (chapterIdx, sectionIdx = null) => {
  const sec = sectionIdx !== null ? `.${sectionIdx + 1}` : '';
  return `${chapterIdx + 1}${sec}`;
};

const getCurrentItemName = (chapter, section = null) => {
  return section ? (
    <>
      {chapter.name} ({section.name})
    </>
  ) : (
    <>{chapter.name}</>
  );
};

class StoriesSingle extends React.Component {
  constructor (props) {
    super(props);
    // Functions from helper file.
    this.resizeMap = resizeMap.bind(this);
    this.getLayersWithState = getLayersWithState.bind(this);

    this.onMapAction = this.onMapAction.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();

    // Store prev and next urls. This is needed for the keyboard navigation.
    this.prevItemUrl = null;
    this.nextItemUrl = null;

    this.state = {
      ...getInitialMapExploreState(),
      mapLayers: [],
      panelSec: false
    };
  }

  componentDidMount () {
    window.addEventListener('keyup', this.onKeyPress);
  }

  componentDidUpdate (prevProps) {
    const {
      match: {
        params: { storyId, chapterId, sectionId }
      }
    } = this.props;
    const {
      match: {
        params: {
          storyId: storyIdPrev,
          chapterId: chapterIdPrev,
          sectionId: sectionIdPrev
        }
      }
    } = prevProps;

    // Did the story, chapter or section change?
    // If so there are new visuals to display.
    if (
      storyId !== storyIdPrev ||
      chapterId !== chapterIdPrev ||
      sectionId !== sectionIdPrev
    ) {
      const {
        chapter: [, chapter],
        section: [, section]
      } = this.getChapterAndSection();

      this.updateItemVisuals(section || chapter);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.onKeyPress);
  }

  getChapterAndSection () {
    const {
      story,
      match: {
        params: { chapterId, sectionId }
      }
    } = this.props;
    const [chapterIdx, chapter] = findById(story.chapters, chapterId);
    const [sectionIdx, section] = findById(chapter.sections, sectionId);

    return {
      chapter: [chapterIdx, chapter],
      section: [sectionIdx, section]
    };
  }

  // Update the current item's visuals.
  // What the visuals are, are defined in the story file.
  updateItemVisuals (item) {
    const { visual } = item;
    // If there are no visuals, or the map hasn't loaded, there's nothing to do.
    if (!visual || !this.state.mapLoaded) return;

    if (visual.type === 'map-layer') {
      const { bbox, layers = [], date, spotlight } = visual.data;
      if (bbox) {
        this.mbMapRef.current.mbMap.fitBounds(bbox);
      } else {
        // Reset to full world.
        this.mbMapRef.current.mbMap.setZoom(0);
      }
      const mapLayers = getSpotlightLayers(spotlight || 'global');

      // The common map functions are being reused so we can take advantage of
      // their layer enabling features.
      this.setState({
        // Reset the enabled layers, so the toggling will always enable them.
        activeLayers: [],
        mapLayers: mapLayers,
        timelineDate: date ? utcDate(date) : null
      }, () => {
        for (const id of layers) {
          const l = mapLayers.find((layer) => layer.id === id);
          toggleLayerCommon.call(this, l);
        }
      });
    }
  }

  onKeyPress (e) {
    // Right arrow
    if (e.keyCode === 39 && this.nextItemUrl) {
      history.push(this.nextItemUrl);
    }

    // Left arrow
    if (e.keyCode === 37 && this.prevItemUrl) {
      history.push(this.prevItemUrl);
    }
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'map.loaded': {
        this.setState({ mapLoaded: true }, () => {
          const {
            chapter: [, chapter],
            section: [, section]
          } = this.getChapterAndSection();
          this.updateItemVisuals(section || chapter);
        });
        break;
      }
    }
  }

  renderChapterDropdown (itemNum, itemName) {
    const {
      story,
      match: {
        params: { chapterId, sectionId }
      }
    } = this.props;

    return (
      <ChapterDropdown
        alignment='left'
        direction='down'
        triggerElement={
          <Button
            element='a'
            variation='achromic-plain'
            title='View story chapters'
            useIcon={['chevron-down--small', 'after']}
          >
            {itemNum}) {itemName}
          </Button>
        }
      >
        <ShadowScrollbar
          scrollbarsProps={{ autoHeight: true, autoHeightMax: 400 }}
        >
          <DropdownScrollInner>
            <DropTitle>Chapters</DropTitle>
            <DropMenu role='menu' selectable>
              {story.chapters.map((chapter) => {
                const baseUrl = `/stories/${story.id}/${chapter.id}`;
                const chapterUrl = chapter.sections
                  ? `${baseUrl}/${chapter.sections[0].id}`
                  : baseUrl;

                return (
                  <li key={chapter.id}>
                    <DropMenuItem
                      as={Link}
                      active={chapter.id === chapterId && !sectionId}
                      to={chapterUrl}
                      title='View chapter of this story'
                      data-dropdown='click.close'
                    >
                      {chapter.name}
                    </DropMenuItem>
                    {chapter.sections && (
                      <ul>
                        {chapter.sections.map((section) => (
                          <li key={section.id}>
                            <DropMenuItem
                              as={Link}
                              active={
                                chapter.id === chapterId &&
                                section.id === sectionId
                              }
                              to={`${baseUrl}/${section.id}`}
                              title='View chapter of this story'
                              data-dropdown='click.close'
                            >
                              {section.name}
                            </DropMenuItem>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </DropMenu>
          </DropdownScrollInner>
        </ShadowScrollbar>
      </ChapterDropdown>
    );
  }

  render () {
    const { mapLayers, activeLayers, timelineDate } = this.state;
    const {
      story,
      match: {
        params: { chapterId, sectionId }
      }
    } = this.props;
    const layers = this.getLayersWithState(mapLayers);

    if (!story) return <UhOh />;

    const [chapterIdx, chapter] = findById(story.chapters, chapterId);
    if (!chapter) return <UhOh />;

    // Some chapters have sections. See if it exists.
    const [sectionIdx, section] = findById(chapter.sections, sectionId);
    if (sectionId && !section) return <UhOh />;

    const prevItem = getPreviousItem(story.chapters, chapterIdx, sectionIdx);
    const nextItem = getNextItem(story.chapters, chapterIdx, sectionIdx);

    // Name of the chapter plus the chapter's section.
    const itemName = getCurrentItemName(chapter, section);
    // Number of the chapter plus the chapter's section.
    const itemNum = getCurrentItemNum(chapterIdx, sectionIdx);

    // Store the next and previous items as class properties so we don't have to
    // search for them every time.
    this.prevItemUrl = prevItem ? createItemUrl(story, prevItem) : null;
    this.nextItemUrl = nextItem ? createItemUrl(story, nextItem) : null;

    const panelContent = get(section, 'contentComp') || chapter.contentComp;

    return (
      <App hideFooter pageTitle={story.name}>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInnerAlt>
              <InpageHeadline>
                <InpageTitleAlt>{story.name}</InpageTitleAlt>
                <InpageSecTitle>
                  {this.renderChapterDropdown(itemNum, itemName)}
                </InpageSecTitle>
              </InpageHeadline>
              <InpageToolbarAlt>
                <ChapterCount>
                  Chapter {itemNum} of {story.chapters.length}
                </ChapterCount>
                <Button
                  element={Link}
                  title='View previous chapter of this story'
                  to={createItemUrl(story, prevItem)}
                  variation='achromic-plain'
                  useIcon='chevron-left--small'
                  hideText
                  disabled={!prevItem}
                >
                  Previous
                </Button>
                <Button
                  element={Link}
                  title='View next chapter of this story'
                  to={createItemUrl(story, nextItem)}
                  variation='achromic-plain'
                  useIcon='chevron-right--small'
                  hideText
                  disabled={!nextItem}
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
                  date={timelineDate}
                  mapPos={null}
                  aoiState={null}
                  comparing={false}
                />
              </ExploreCarto>

              <SecPanel
                title={itemName}
                onPanelChange={({ revealed }) => {
                  this.resizeMap();
                  this.setState({ panelSec: revealed });
                }}
                content={panelContent}
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
