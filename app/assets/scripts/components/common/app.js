import React, { Component } from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import MetaTags from './meta-tags';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import { reveal } from '../../styles/animation';

import config from '../../config';
import SizeAwareElement from './size-aware-element';
import { mediaRanges } from '../../styles/theme/theme';

const { appTitle, appDescription } = config;

const Page = styled(SizeAwareElement)`
  display: grid;
  grid-template-rows: minmax(3rem, min-content) auto 0;
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
      useShortTitle: false
    };

    this.resizeListener = this.resizeListener.bind(this);
  }

  resizeListener ({ width }) {
    this.setState({
      useShortTitle: width < mediaRanges.small[0]
    });
  }

  render () {
    const { pageTitle, children } = this.props;
    const title = pageTitle ? `${pageTitle} — ` : '';

    return (
      <Page onChange={this.resizeListener}>
        <MetaTags title={`${title}${appTitle}`} description={appDescription} />
        <PageHeader useShortTitle={this.state.useShortTitle} />
        <PageBody role='main'>
          {children}
        </PageBody>
        <PageFooter />
      </Page>
    );
  }
}

App.propTypes = {
  pageTitle: T.string,
  children: T.node
};

export default App;
