import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import Panel, { PanelHeadline, PanelTitle } from '../../common/panel';
import ShadowScrollbar from '../../common/shadow-scrollbar';
import media, { isLargeViewport } from '../../../styles/utils/media-queries';
import { glsp } from '../../../styles/utils/theme-values';

const PanelSelf = styled(Panel)`
  ${media.largeUp`
    width: 30rem;
  `}
`;

const BodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  z-index: 1;
`;

const BodyScrollInner = styled.div`
  padding: ${glsp()};
`;

function SecPanel (props) {
  const { title, onPanelChange, content } = props;

  return (
    <PanelSelf
      collapsible
      direction='right'
      onPanelChange={onPanelChange}
      initialState={isLargeViewport()}
      headerContent={
        <PanelHeadline>
          <PanelTitle>{title}</PanelTitle>
        </PanelHeadline>
      }
      bodyContent={
        <BodyScroll>
          <BodyScrollInner>{content}</BodyScrollInner>
        </BodyScroll>
      }
    />
  );
}

SecPanel.propTypes = {
  title: T.node,
  content: T.node,
  onPanelChange: T.func
};

export default SecPanel;
