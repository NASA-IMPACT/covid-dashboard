import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import T from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactTooltip from 'react-tooltip';

import theme, { mediaRanges } from './styles/theme/theme';
import store from './utils/store';
import history from './utils/history';

import GlobalStyles from './styles/global';
import ErrorBoundary from './fatal-error-boundary';
import { GlobalLoading } from './components/common/global-loading';
import SizeAwareElement from './components/common/size-aware-element';

// Views
import Home from './components/home';
import SuperSitesSingle from './components/super-sites/single';
import DatasetsSingle from './components/datasets/single';
import Sandbox from './components/sandbox';
import UhOh from './components/uhoh';
import About from './components/about';
import MobileMessage from './components/common/mobile-message';

import config from './config';

const { gaTrackingCode } = config;

// Google analytics
if (gaTrackingCode) {
  ReactGA.initialize(gaTrackingCode);
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(location => ReactGA.pageview(location.pathname + location.search));
}

// Route for components only displayed on large screens
function LargeOnlyRoute ({ component: Component, isLargeUp, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLargeUp ? <Component {...routeProps} /> : <MobileMessage />}
    />
  );
}

LargeOnlyRoute.propTypes = {
  component: T.object,
  isLargeUp: T.bool
};

// Root component. Used by the router.
class Root extends React.Component {
  constructor (props) {
    super(props);

    this.state = { isLargeUp: false };

    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount () {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }

  resizeListener ({ width }) {
    this.setState({
      isLargeUp: width >= mediaRanges.large[0]
    });
  }

  render () {
    const { isLargeUp } = this.state;

    return (
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme.main}>
            <ErrorBoundary>
              <SizeAwareElement onChange={this.resizeListener}>
                <GlobalStyles />
                <Switch>
                  <LargeOnlyRoute
                    isLargeUp={isLargeUp}
                    exact
                    path={['/', '/areas/:id']}
                    component={Home}
                  />
                  <LargeOnlyRoute
                    exact
                    isLargeUp={isLargeUp}
                    path='/super-sites/:datasetId'
                    component={SuperSitesSingle}
                  />
                  <LargeOnlyRoute
                    exact
                    isLargeUp={isLargeUp}
                    path='/datasets/:datasetId'
                    component={DatasetsSingle}
                  />
                  <Route path='/sandbox' component={Sandbox} />
                  <Route path='/about' component={About} />
                  <Route path='*' component={UhOh} />
                </Switch>
                <GlobalLoading />
                <ReactTooltip
                  effect='solid'
                  className='type-primary'
                />
              </SizeAwareElement>
            </ErrorBoundary>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

render(<Root store={store} />, document.querySelector('#app-container'));
