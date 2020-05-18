import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { multiply } from '../../styles/utils/math';
import { themeVal, stylizeFunction } from '../../styles/utils/general';
import { visuallyHidden } from '../../styles/helpers';

const _rgba = stylizeFunction(rgba);

const PageFoot = styled.footer`
  ${visuallyHidden()}
  background-color: ${themeVal('color.baseAlphaA')};
  font-size: 0.875rem;
  line-height: 1rem;
`;

const PageFootInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: ${multiply(themeVal('layout.space'), 1.5)} ${multiply(themeVal('layout.space'), 2)};
`;

const PageCredits = styled.p`
  color: ${_rgba(themeVal('color.base'), 0.64)};
`;

const PageFooter = props => {
  return (
    <PageFoot role='contentinfo'>
      <PageFootInner>
        <PageCredits>2020 Development Seed</PageCredits>
      </PageFootInner>
    </PageFoot>
  );
};

PageFooter.propTypes = {
};

export default PageFooter;
