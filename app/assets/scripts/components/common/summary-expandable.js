import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import styled, { css } from 'styled-components';

import Button from '../../styles/button/button';
import { glsp } from '../../styles/utils/theme-values';

const SummarySelf = styled.section`
  padding: ${glsp()};
`;

const SummaryContent = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: ${glsp(0.5)};
  transition: max-height 320ms ease-in-out, opacity 320ms ease-in-out;
  max-height: ${({ isExpanded }) => (isExpanded ? '400vh' : '6rem')};

  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }

  ${({ isExpanded }) => !isExpanded && css`
    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1rem;
      width: 100%;
      background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }
  `}
`;

class SummaryExpandable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isExpanded: props.initialExpanded
    };
  }

  render () {
    const { children, className } = this.props;
    const { isExpanded } = this.state;

    return (
      <SummarySelf className={className}>
        <SummaryContent isExpanded={isExpanded}>{children}</SummaryContent>
        <Button
          variation='primary-plain'
          useIcon={[isExpanded ? 'chevron-up--small' : 'chevron-down--small', 'after']}
          onClick={() => this.setState(state => ({ isExpanded: !state.isExpanded }))}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      </SummarySelf>
    );
  }
}

SummaryExpandable.propTypes = {
  className: T.string,
  children: T.node,
  initialExpanded: T.bool
};

export default SummaryExpandable;
