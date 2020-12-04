import React from 'react';
import get from 'lodash.get';
import find from 'lodash.find';

import { getSpotlightLayers } from '../../common/layers';

export const findById = (haystack = [], id) => {
  const idx = haystack.findIndex((c) => c.id === id);
  return [idx === -1 ? null : idx, haystack[idx]];
};

export const getPreviousItem = (chapters, currChapterIdx, currSectionIdx = 0) => {
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

export const getNextItem = (chapters, currChapterIdx, currSectionIdx = 0) => {
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

export const createItemUrl = (story, item) => {
  if (!item) return '/discoveries';

  const { chapter, section } = item;
  const base = `/discoveries/${story.id}/${chapter.id}`;
  return section ? `${base}/${section.id}` : base;
};

export const getCurrentItemNum = (chapterIdx, sectionIdx = null) => {
  const sec = sectionIdx !== null ? `.${sectionIdx + 1}` : '';
  return `${chapterIdx + 1}${sec}`;
};

export const getCurrentItemName = (chapter, section = null) => {
  return section ? (
    <>
      {chapter.name} ({section.name})
    </>
  ) : (
    <>{chapter.name}</>
  );
};

export const getMapLayers = (spotlightId, layers) => {
  return [
    ...getSpotlightLayers(spotlightId || 'global'),
    // Include any layer that was defined on the story. These will be custom
    // layers specific for this chapter. Mostly external TMS
    ...layers.reduce(
      (acc, l) => (typeof l === 'string' ? acc : [...acc, l]),
      []
    )
  ];
};

export const getMapMessage = (layers, item, date) => {
  const renderMsg = (mapLabel) =>
    mapLabel
      ? typeof mapLabel === 'function'
        ? mapLabel(date)
        : mapLabel
      : '';

  // The map label can come directly from a layer's visual which is the case
  // when there's only one map. Or it can also come from the compare map, when a
  // map is being compared. The item0s mapLabel will take precedence.
  const itemMapLabel = get(item, 'visual.data.mapLabel');
  if (itemMapLabel) {
    return [true, renderMsg(itemMapLabel)];
  }

  // Check if there's any layer that's comparing.
  const comparingLayer = find(layers, 'comparing');
  const isComparing = !!comparingLayer;
  const compareMapLabel = get(comparingLayer, 'compare.mapLabel');

  return [isComparing, renderMsg(compareMapLabel)];
};
