import React from 'react';
import styled from 'styled-components';
import { PropTypes as T } from 'prop-types';

import { glsp, _rgba } from './utils/theme-values';
import { themeVal } from './utils/general';
import media from './utils/media-queries';

const MediaImageFigure = ({
  className,
  children,
  ...props
}) => (
  <figure className={className}>
    <div>
      <img {...props} />
    </div>
    {children ? (
      <figcaption>
        {children}
      </figcaption>
    ) : null}
  </figure>
);

MediaImageFigure.propTypes = {
  className: T.string,
  children: T.node
};

const MediaImage = styled(MediaImageFigure)`
  display: block;
  width: 100%;

  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }

  img {
    display: block;
    width: 100%;
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.5rem;
    text-align: center;
    padding: ${glsp(0, 1)};
    max-width: 40rem;
    margin: 0 auto;

    ${media.largeUp`
      padding: ${glsp(0, 2)};
    `}

    > *:not(:last-child) {
      margin-bottom: ${glsp()};
    }
  }
`;

export default MediaImage;

export const MediaCompare = styled.figure`
  /* Trying to style a bad structured plugin... */
  > div {
    > div:nth-child(3) > div:nth-child(2) {
      background-color: ${themeVal('color.primary')};
      width: 3rem;
      height: 3rem;
    }

    > div:nth-child(4) > div:nth-child(1),
    > div:nth-child(5) > div:nth-child(1) {
      border-radius: ${themeVal('shape.rounded')};
      background-color: ${_rgba(
        themeVal('color.baseDark'),
        0.64
      )} !important;
    }
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.5rem;
    text-align: center;
    padding: ${glsp(0, 1)};
    max-width: 40rem;
    margin: 0 auto;

    ${media.largeUp`
      padding: ${glsp(0, 2)};
    `}
  }

  /* stylelint-disable-next-line */
  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }
`;
