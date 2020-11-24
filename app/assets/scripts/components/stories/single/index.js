import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import T from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import find from 'lodash.find';

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
import MapMessage from '../../common/map-message';
import MultiMap from './multi-map';

import { themeVal } from '../../../styles/utils/general';
import media from '../../../styles/utils/media-queries';
import { glsp } from '../../../styles/utils/theme-values';
import { truncated } from '../../../styles/helpers';
import history from '../../../utils/history';
import { getStory } from '../';
import {
  getInitialMapExploreState,
  getLayerState,
  getLayersWithState,
  resizeMap,
  setLayerState,
  toggleLayerCommon,
  toggleLayerCompare
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
    this.setLayerState = setLayerState.bind(this);
    this.getLayerState = getLayerState.bind(this);

    this.onMapAction = this.onMapAction.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();
    // Ref for the multimaps.
    this.multimapRef = React.createRef();

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

  // The multimap is a small multiple map component for the stories. It will
  // initialize all the needed map and it has a function to resize them all
  // which is used when the panel is hidden/show.
  resizeMultimap () {
    const component = this.multimapRef.current;
    if (component) {
      // Delay execution to give the panel animation time to finish.
      setTimeout(() => {
        component.resizeMaps();
      }, 200);
    }
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
      const { bbox, layers = [], date, spotlight, compare } = visual.data;
      if (bbox) {
        this.mbMapRef.current.mbMap.fitBounds(bbox);
      } else {
        // Reset to full world.
        this.mbMapRef.current.mbMap.jumpTo({ center: [0, 0], zoom: 1.5 });
      }
      const mapLayers = [
        ...getSpotlightLayers(spotlight || 'global'),
        // Include any layer that was defined on the story. These will be custom
        // layers specific for this chapter. Mostly external TMS
        ...layers.reduce(
          (acc, l) => (typeof l === 'string' ? acc : [...acc, l]),
          []
        )
      ];

      let layerComparing = null;
      // Map the layer ids to layer definition objects.
      const layersToEnable = layers.map((l, idx) => {
        let returningLayer = l;
        if (typeof l === 'string') {
          const layerDef = mapLayers.find((layer) => layer.id === l);
          if (!layerDef) {
            throw new Error(
              `Layer definition not found for story layer with id [${l}]`
            );
          }
          returningLayer = layerDef;
        }

        // Handle the compare option which works as following:
        //   Note: Compare can only be enabled in one layer, so henceforth, layer
        //   refers to the first entry in the `layers` array.
        // If the compare is `true`, we check if the layer has a compare property
        // defined. This will be the case for non custom layers (i.e. The ones
        // that come with the app). If the property is defined, we use that
        // definition and comparison is enabled. Otherwise an error is thrown.
        // If the compare is an object, this will be used to extend the layer's
        // compare definition (if it exists).
        if (idx === 0 && compare) {
          if (typeof compare === 'object') {
            const returningLayerCompare =
              typeof returningLayer.compare === 'object'
                ? returningLayer.compare
                : {};

            returningLayer.compare = { ...returningLayerCompare, ...compare };
            // If compare is true ensure that there is a compare object.
          } else if (
            compare === true &&
            typeof returningLayer.compare !== 'object'
          ) {
            throw new Error(`Compare is set as 'true' for story layer with is [${returningLayer.id}], but the layer does not have a compare property.
If this is a system layer, check that a compare property is defined. In alternative provide a compare property with the needed properties.`);
          }

          // Store the layer that will have comparison enabled to use layer with
          // the map utils functions.
          layerComparing = returningLayer;
        }

        return returningLayer;
      });

      // The common map functions are being reused so we can take advantage of
      // their layer enabling features.
      this.setState(
        (state) => ({
          // Reset the enabled layers, so the toggling will always enable them.
          activeLayers: [],
          // Reset the layer state. If we reset the active layers it is safe to
          // assume that the layer state will be empty.
          /* eslint-disable-next-line react/no-unused-state */
          layersState: {},
          mapLayers: mapLayers,
          timelineDate: date ? utcDate(date) : null
        }),
        () => {
          for (const l of layersToEnable) {
            toggleLayerCommon.call(this, l);
          }
          if (layerComparing) {
            toggleLayerCompare.call(this, layerComparing);
          }
        }
      );
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

    const currItem = chapter || section;
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

    // Check if there's any layer that's comparing.
    const comparingLayer = find(layers, 'comparing');
    const isComparing = !!comparingLayer;

    const mapLabel = get(comparingLayer, 'compare.mapLabel');
    const compareMessage =
      isComparing && mapLabel
        ? typeof mapLabel === 'function'
          ? mapLabel(this.state.timelineDate)
          : mapLabel
        : '';

    const { type: visualType, data: visualData } = (currItem.visual || {});

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
              {visualType === 'map-layer' && (
                <ExploreCarto>
                  <MapMessage active={isComparing && !!compareMessage}>
                    <p>{compareMessage}</p>
                  </MapMessage>
                  <MbMap
                    ref={this.mbMapRef}
                    onAction={this.onMapAction}
                    layers={layers}
                    activeLayers={activeLayers}
                    date={timelineDate}
                    mapPos={null}
                    aoiState={null}
                    comparing={isComparing}
                  />
                </ExploreCarto>
              )}
              {visualType === 'multi-map' && (
                <ExploreCarto>
                  <MultiMap
                    ref={this.multimapRef}
                    // Because refs for the different maps are created
                    // dynamically, the component needs to be remounted if the
                    // number of maps change.
                    key={`maps-${visualData.maps.length}`}
                    maps={visualData.maps}
                    bbox={visualData.bbox}
                  />
                </ExploreCarto>
              )}

              <SecPanel
                title={itemName}
                onPanelChange={({ revealed }) => {
                  this.resizeMap();
                  this.resizeMultimap();
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
