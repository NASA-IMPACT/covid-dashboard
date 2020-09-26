import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactTooltip from 'react-tooltip';

import theme from './styles/theme/theme';
import store from './utils/store';
import history from './utils/history';
import config from './config';
import { fetchSpotlightList } from './redux/spotlight';
import { fetchIndicatorGroups } from './redux/indicators';
import { fetchLayerData } from './redux/layer-data';

import GlobalStyles from './styles/global';
import ErrorBoundary from './fatal-error-boundary';
import { GlobalLoading } from './components/common/global-loading';

// Views
import Home from './components/home';
import GlobalExplore from './components/global';
import GetStartedHub from './components/getstarted/hub';
import SpotlightHub from './components/spotlight/hub';
import SpotlightSingle from './components/spotlight/single';
import IndicatorsHub from './components/indicators/hub';
import IndicatorsSingle from './components/indicators/single';
import Sandbox from './components/sandbox';
import UhOh from './components/uhoh';
import About from './components/about';
import Development from './components/development';

// Load the spotlight areas list.
store.dispatch(fetchSpotlightList());
store.dispatch(fetchIndicatorGroups());
store.dispatch(fetchLayerData());

const { gaTrackingCode } = config;

// Google analytics
if (gaTrackingCode) {
  ReactGA.initialize(gaTrackingCode);
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(location => ReactGA.pageview(location.pathname + location.search));
}

// Root component. Used by the router.
class Root extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight
    };

    window.addEventListener('resize', () => {
      // Store the height to set the page min height. This is needed for mobile
      // devices to account for the address bar, since 100vh does not work.
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      this.setState({ windowHeight: window.innerHeight });
    });
  }

  componentDidMount () {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme.main}>
            <ErrorBoundary>
              <GlobalStyles innerHeight={this.state.windowHeight} />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route
                  exact
                  path='/getstarted'
                  component={GetStartedHub}
                />
                <Route
                  exact
                  path='/explore'
                  component={SpotlightHub}
                />
                <Route
                  exact
                  path='/explore/global'
                  component={GlobalExplore}
                />
                <Route
                  exact
                  path='/explore/:spotlightId'
                  component={SpotlightSingle}
                />
                <Route exact path='/indicators' component={IndicatorsHub} />
                <Route
                  exact
                  path='/indicators/:indicatorId'
                  component={IndicatorsSingle}
                />
                <Route path='/sandbox' component={Sandbox} />
                <Route path='/about' component={About} />
                <Route path='/development' component={Development} />
                <Route path='*' component={UhOh} />
              </Switch>
              <GlobalLoading />
              <ReactTooltip effect='solid' className='type-primary' />
            </ErrorBoundary>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

render(<Root store={store} />, document.querySelector('#app-container'));
