import React from 'react';
import styled from 'styled-components';
import { PropTypes as T } from 'prop-types';

import { glsp } from './utils/theme-values';

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
    margin-bottom: ${glsp()}
  }

  img {
    display: block;
    width: 100%;
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.5rem;

    > *:not(:last-child) {
      margin-bottom: ${glsp()}
    }
  }
`;

export default MediaImage;
