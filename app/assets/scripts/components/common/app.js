import React, { Component } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import MetaTags from './meta-tags';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import { reveal } from '../../styles/animation';

import config from '../../config';
import SizeAwareElement from './size-aware-element';
import { mediaRanges } from '../../styles/theme/theme';

const { appTitle, appDescription } = config;

const Page = styled.div`
  display: grid;
  grid-template-rows: minmax(2rem, min-content) 1fr ${({ hideFooter }) => hideFooter ? 0 : 'auto'};
  min-height: 100vh;
`;

const PageBody = styled.main`
  padding: 0;
  margin: 0;

  /* Animation */
  animation: ${reveal} 0.48s ease 0s 1;
`;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isMediumDown: false
    };

    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  // Handle cases where the page is updated without changing
  componentDidUpdate (prevProps) {
    if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  resizeListener ({ width, height }) {
    this.setState({
      isMediumDown: width < mediaRanges.large[0]
    });
  }

  render () {
    const { pageTitle, hideFooter, children } = this.props;
    const title = pageTitle ? `${pageTitle} — ` : '';

    return (
      <SizeAwareElement
        element={Page}
        className='page'
        onChange={this.resizeListener}
        hideFooter={hideFooter}
      >
        <MetaTags title={`${title}${appTitle}`} description={appDescription} />
        <PageHeader isMediumDown={this.state.isMediumDown} />
        <PageBody role='main'>{children}</PageBody>
        <PageFooter />
      </SizeAwareElement>
    );
  }
}

App.propTypes = {
  pageTitle: T.string,
  hideFooter: T.bool,
  children: T.node,
  location: T.object
};

export default withRouter(App);
