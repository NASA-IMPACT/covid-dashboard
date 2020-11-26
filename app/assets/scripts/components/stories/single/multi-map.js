import React, { createRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import T from 'prop-types';
import mapboxgl from 'mapbox-gl';
import syncMove from '@mapbox/mapbox-gl-sync-move';

import config from '../../../config';
import { glsp } from '../../../styles/utils/theme-values';
import { themeVal } from '../../../styles/utils/general';
import media from '../../../styles/utils/media-queries';
import { visuallyHidden } from '../../../styles/helpers';

// Set mapbox token.
mapboxgl.accessToken = config.mbToken;

const renderGridColumn = ({ mapCount }) => {
  if (mapCount < 2) return;

  if (mapCount % 3 !== 0 && mapCount % 2 === 0) {
    return css`
      grid-template-columns: repeat(2, 1fr);
    `;
  } else {
    return css`
      grid-template-columns: repeat(3, 1fr);
    `;
  }
};

const MapsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
`;

const MapsNav = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: ${glsp()};

  li:not(:last-child) {
    margin-right: ${glsp(0.5)};
  }

  ${media.largeUp`
    display: none;
  `}
`;

const MapsNavItem = styled.a`
  &::before {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    background: #fff;
    box-shadow: 0 0 4px 4px ${themeVal('color.baseAlphaA')};
    border-radius: ${themeVal('shape.ellipsoid')};

    ${({ active }) => active && css`
      background: ${themeVal('color.primary')};
    `}
  }

  span {
    ${visuallyHidden()}
  }
`;

const MapsWrapperInner = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  ${media.largeUp`
    display: grid;
    grid-template-columns: 1fr;
    ${renderGridColumn}
  `}
`;

const MapContainer = styled.section`
  position: relative;
  min-width: 100vw;
  height: 100%;

  ${media.largeUp`
    min-width: auto;

    &:not(:last-child) .mapboxgl-ctrl-logo {
      display: none;
    }
  `}

  h1 {
    position: absolute;
    top: ${glsp(0.5)};
    left: ${glsp(0.5)};
    z-index: 10;
    padding: ${glsp(1 / 2, 0.75)};
    background: #fff;
    box-shadow: 0 0 4px 4px ${themeVal('color.baseAlphaA')};
    border-radius: ${themeVal('shape.rounded')};
    font-size: 0.875rem;
    font-weight: ${themeVal('type.base.regular')};
    line-height: 1rem;
    text-align: center;
    margin: 0;

    ${media.largeUp`
      left: 50%;
      transform: translate(-50%, 0);
    `}
  }

  > div {
    box-shadow: 0 0 0 1px ${themeVal('color.baseAlphaC')};
    height: 100%;
  }
`;

// The small multiple map is setup upon initialization. There's no way to
// dynamically update it. The mapbox map is set as the passed in ref value.
const SmallMultipleMap = React.forwardRef((props, ref) => {
  const { source, id, label, bbox, mapStyle } = props;
  const mapContainer = useRef(null);

  // Initialize map
  useEffect(() => {
    const mbMap = (ref.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: mapStyle || config.map.styleUrl,
      logoPosition: 'bottom-right',
      pitchWithRotate: false,
      dragRotate: false
    }));

    if (bbox) {
      mbMap.fitBounds(bbox);
    } else {
      mbMap.jumpTo({ center: [0, 0], zoom: 2 });
    }

    mbMap.on('load', function () {
      mbMap.addSource(id, source);
      mbMap.addLayer(
        {
          id: id,
          type: 'raster',
          source: id
        },
        // Assumption is that any style used has 'admin-0-boundary-bg' layer.
        'admin-0-boundary-bg'
      );
    });

    return () => {
      mbMap.remove();
    };
  }, [ref]);

  return (
    <MapContainer>
      <h1>{label}</h1>
      <div ref={mapContainer} />
    </MapContainer>
  );
});

SmallMultipleMap.propTypes = {
  source: T.object,
  id: T.string,
  label: T.string,
  mapStyle: T.string,
  bbox: T.array
};

// The MultiMap component displays a series of raster maps in a small multiples
// fashion. On small screens it displays them side-by-side with a navigation.
// Because the component needs to keep refs to all the maps to enable syncing
// this component does not support map updates. If the amount of maps changes,
// the component must be remounted. Easiest way to achieve this is by using a
// different key property.
/* eslint-disable-next-line react/display-name */
const MultiMap = React.forwardRef((props, ref) => {
  const { maps, bbox, mapStyle } = props;

  // On small screens the maps are rendered side by side and the container is
  // programmatically scrolled to the correct place when the navigation is used.
  // This allows us to keep the same structure for large screens, handle the
  // syncing and manage display through css.
  // For this we need a reference to the scrollable DOM node and the clicked
  // navigation item.
  const mapsScrollContainer = useRef(null);
  const [visibleMapMobile, setVisibleMapMobile] = useState(0);

  // Create refs for all the maps.
  const theRefs = useRef(maps.map((m) => createRef(null)));

  // Set the ref as an object with functions. In this case is a function to
  // resize the minimaps when the panel is opened/closed.
  ref.current = {
    resizeMaps: () => {
      theRefs.current.forEach((r) => r.current.resize());
    }
  };

  // Enable syncing on mount.
  useEffect(() => {
    syncMove(theRefs.current.map((r) => r.current));
  }, []);

  // Scroll to the correct map.
  useEffect(() => {
    mapsScrollContainer.current.scrollLeft =
      window.innerWidth * visibleMapMobile;
  }, [visibleMapMobile]);

  return (
    <MapsWrapper>
      <MapsNav>
        {maps.map((m, idx) => (
          <li key={m.id}>
            <MapsNavItem
              href='#'
              active={visibleMapMobile === idx}
              title={`View map ${idx + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setVisibleMapMobile(idx);
              }}
            >
              <span>View map {idx + 1}</span>
            </MapsNavItem>
          </li>
        ))}
      </MapsNav>
      <MapsWrapperInner ref={mapsScrollContainer} mapCount={maps.length}>
        {maps.map((m, idx) => (
          <SmallMultipleMap
            ref={theRefs.current[idx]}
            key={m.id}
            bbox={bbox}
            mapStyle={mapStyle}
            id={m.id}
            {...m}
          />
        ))}
      </MapsWrapperInner>
    </MapsWrapper>
  );
});

MultiMap.propTypes = {
  bbox: T.array,
  mapStyle: T.string,
  maps: T.array
};

export default MultiMap;
