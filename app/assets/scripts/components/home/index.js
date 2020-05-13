import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import get from 'lodash.get';
import { format, isAfter, isBefore } from 'date-fns';

import App from '../common/app';
import ExpMapPrimePanel from './prime-panel';
import ExpMapSecPanel from './sec-panel';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import MbMap from './mb-map';
import Timeline from './timeline';

import { showGlobalLoading, hideGlobalLoading } from '../common/global-loading';
import { themeVal } from '../../styles/utils/general';
import { fetchConfig as fetchConfigAction } from '../../redux/app-config';
import {
  fetchAdminAreas as fetchAdminAreasAction,
  fetchSingleAdminArea as fetchSingleAdminAreaAction
} from '../../redux/admin-areas';
import {
  fetchTimeSeriesDaily as fetchTimeSeriesDailyAction,
  fetchTimeSeriesOverview as fetchTimeSeriesOverviewAction
} from '../../redux/time-series';
import { fetchLayerData as fetchLayerDataAction } from '../../redux/layer-data';
import { wrapApiResult, getFromState } from '../../redux/reduxeed';
import history from '../../utils/history';
import { utcDate } from '../../utils/utils';

import mapLayers from '../../datasets';

/**
 * The different timeseries overviews have different date domains.
 * To ensure that the data is displayed correctly the intersection of the
 * domains is computed.
 *
 * @param {array} overview Array with timeseries overview data
 */
export const intersectOverviewDateDomain = (overview) => {
  return overview.reduce((acc, o) => {
    const agg = o.getData().aggregate;
    const domain = [agg[0].date, agg[agg.length - 1].date].map((d) =>
      utcDate(d)
    );
    return acc === null
      ? domain
      : [
        isAfter(domain[0], acc[0]) ? domain[0] : acc[0],
        isBefore(domain[1], acc[1]) ? domain[1] : acc[1]
      ];
  }, null);
};

/**
 * The different timeseries overviews have different date domains.
 * Compute the union of different date domains
 *
 * @param {array} overview Array with timeseries overview data
 */
export const unionOverviewDateDomain = (overview) => {
  return overview.reduce((acc, o) => {
    const agg = o.getData().aggregate;
    const domain = [agg[0].date, agg[agg.length - 1].date].map((d) =>
      utcDate(d)
    );
    return acc === null
      ? domain
      : [
        isBefore(domain[0], acc[0]) ? domain[0] : acc[0],
        isAfter(domain[1], acc[1]) ? domain[1] : acc[1]
      ];
  }, null);
};
const ExploreCanvas = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: min-content 1fr min-content;
  overflow: hidden;

  > * {
    grid-row: 1;
  }
`;

const ExploreCarto = styled.section`
  position: relative;
  height: 100%;
  background: ${themeVal('color.baseAlphaA')};
  display: grid;
  grid-template-rows: 1fr auto;
`;

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.onPanelAction = this.onPanelAction.bind(this);
    this.onMapAction = this.onMapAction.bind(this);
    this.resizeMap = this.resizeMap.bind(this);

    // Ref to the map component to be able to trigger a resize when the panels
    // are shown/hidden.
    this.mbMapRef = React.createRef();

    this.state = {
      activeLayers: [],
      timelineDate: null,
      mapLoaded: false,
      compare: false
    };
  }

  // async componentDidMount () {
  //   // TODO: adminAreas are being fetched but not used. Review need.
  //   const { fetchConfig, fetchAdminAreas } = this.props;
  //   showGlobalLoading();
  //   await Promise.all([fetchConfig(), fetchAdminAreas()]);
  //   this.loadAdminArea();
  //   hideGlobalLoading();
  // }

  // componentDidUpdate (prevProps, prevState) {
  //   const { id } = this.props.match.params;
  //   if (prevProps.match.params.id !== id) {
  //     this.loadAdminArea();
  //   }
  // }

  // async loadAdminArea () {
  //   const { fetchSingleAdminArea } = this.props;
  //   const { id } = this.props.match.params;
  //   if (!id) return;

  //   showGlobalLoading();
  //   await fetchSingleAdminArea(id);
  //   hideGlobalLoading();
  // }

  getLayersWithState () {
    const { activeLayers } = this.state;
    return mapLayers.map((l) => ({
      ...l,
      visible: activeLayers.includes(l.id)
    }));
  }

  resizeMap () {
    if (this.mbMapRef.current) {
      // Delay execution to give the panel animation time to finish.
      setTimeout(() => {
        this.mbMapRef.current.mbMap.resize();
      }, 200);
    }
  }

  onPanelAction (action, payload) {
    switch (action) {
      case 'layer.toggle':
        this.toggleLayer(payload);
        break;
      case 'compare.set':
        this.setState({ compare: payload.compare });
        break;
      case 'date.set': {
        this.setState({
          timelineDate: payload.date
        });
        // this.getActiveTimeseriesLayers().forEach(l => {
        //   this.props.fetchTimeSeriesDaily(
        //     l.id,
        //     format(payload.date, 'yyyy-MM-dd')
        //   );
        // });
      }
    }
  }

  async onMapAction (action, payload) {
    switch (action) {
      case 'admin-area.click':
        history.push(`/areas/${payload.id}`);
        break;
      case 'map.loaded': {
        this.setState({ mapLoaded: true });
        // Enable default layers sequentially so they trigger needed actions.
        const layersToLoad = mapLayers.filter(l => l.enabled);
        for (const l of layersToLoad) {
          await this.toggleLayer(l);
        }
      }
    }
  }

  async toggleLayer (layer) {
    const { layerData, fetchLayerData, fetchTimeSeriesOverview } = this.props;
    const layerId = layer.id;

    const { activeLayers } = this.state;
    const isEnabled = activeLayers.includes(layerId);

    if (layer.type === 'feature-data') {
      // Check if there layer data for this layer.
      // If not, load the data and only enable the layer if successful.
      const data = layerData[layerId];
      if (!data || data.hasError()) {
        showGlobalLoading();
        const res = await fetchLayerData(layerId);
        hideGlobalLoading();
        if (res.error) return;
      } else if (!data.isReady()) {
        return;
      }
    }

    if (layer.type === 'timeseries') {
      // Check if there layer data for this layer.
      // If not, load the data and only enable the layer if successful.
      if (!isEnabled) {
        showGlobalLoading();
        const res = await fetchTimeSeriesOverview(layerId);
        // Before setting a new date see if it is available for all active
        // timeseries layers.
        const activeTSLayers = this.getActiveTimeseriesLayers()
          // Add the one we're about to enable in the format needed
          // by getTimeseriesOverviewData
          .concat({ id: layerId });
        const activeTSOverview = this.getTimeseriesOverviewData(activeTSLayers);
        // Compute date intersection between all the overviews.
        const dateDomain = unionOverviewDateDomain(activeTSOverview);

        // Use the max available date if current date is after it.
        const currDate = this.state.timelineDate;
        const nextDdate = currDate && isBefore(currDate, dateDomain[1])
          ? currDate
          : dateDomain[1];

        this.setState({ timelineDate: nextDdate });
        this.props.fetchTimeSeriesDaily(
          layer.id,
          format(nextDdate, 'yyyy-MM-dd')
        );
        hideGlobalLoading();
        if (res.error) return;
      }
    }

    if (layer.type === 'raster-timeseries') {
      this.setState({ timelineDate: utcDate(layer.domain[1]) });
    }

    // Hide any layers that are not compatible with the current one.
    // This means that when this layer gets enabled some layers must be disabled.
    const exclusiveWithLayers = layer.exclusiveWith || [];

    // remove to make them toggleable
    this.setState((state) => {
      if (isEnabled) {
        return {
          activeLayers: state.activeLayers.filter((l) => l !== layerId)
        };
      }

      // Remove incompatible layers.
      const diff = state.activeLayers.filter(
        (v) => !exclusiveWithLayers.includes(v)
      );
      return {
        activeLayers: [...diff, layerId]
      };
    });
  }

  getActiveTimeseriesLayers () {
    return mapLayers.filter((l) =>
      l.type === 'raster-timeseries' && this.state.activeLayers.includes(l.id)
    );
  }

  // getTimeseriesLayerData (layers) {
  //   const { timelineDate } = this.state;
  //   const { timeSeriesDaily } = this.props;

  //   if (!layers || !layers.length || !timelineDate) return null;

  //   return layers.map(l => {
  //     const timeSeriesKey = `${l.id}--${format(timelineDate, 'yyyy-MM-dd')}`;
  //     const ts = timeSeriesDaily[timeSeriesKey];

  //     return {
  //       id: l.id,
  //       data: !ts || !ts.isReady() ? [] : ts.getData(),
  //       // Store error if there's one so we handle it on the map side.
  //       error: ts && ts.hasError()
  //     };
  //   });
  // }

  getTimeseriesOverviewData (layers) {
    const { timeSeriesOverview } = this.props;
    return layers.map(l => timeSeriesOverview[l.id]);
  }

  render () {
    const {
      layerData,
      currentAdminArea,
      appConfig
    } = this.props;

    const adminAreaFeatId = this.props.match.params.id;

    // if (currentAdminArea.isReady() && currentAdminArea.hasError()) {
    //   return <Redirect to='/' />;
    // }

    const layers = this.getLayersWithState();

    const activeTimeseriesLayers = this.getActiveTimeseriesLayers();
    // const activeTimeseriesLayerData = this.getTimeseriesLayerData(
    //   activeTimeseriesLayers
    // );
    // const activeTimeseriesOverviewData = this.getTimeseriesOverviewData(
    //   activeTimeseriesLayers
    // );

    return (
      <App>
        <Inpage isMapCentric>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Map</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <ExploreCanvas>
              <ExpMapPrimePanel
                layers={layers}
                mapLoaded={this.state.mapLoaded}
                onAction={this.onPanelAction}
                onPanelChange={this.resizeMap}
              />
              <ExploreCarto>
                <MbMap
                  ref={this.mbMapRef}
                  onAction={this.onMapAction}
                  layers={layers}
                  activeLayers={this.state.activeLayers}
                  layerData={layerData}
                  selectedAdminArea={adminAreaFeatId}
                  date={this.state.timelineDate}
                  compare={!!activeTimeseriesLayers.length && this.state.compare}
                  // activeTimeSeriesData={activeTimeseriesLayerData}
                />
                <Timeline
                  isActive={!!activeTimeseriesLayers.length}
                  layers={activeTimeseriesLayers}
                  // overview={activeTimeseriesOverviewData}
                  date={this.state.timelineDate}
                  compare={this.state.compare}
                  onAction={this.onPanelAction}
                />
              </ExploreCarto>
              <ExpMapSecPanel
                onPanelChange={this.resizeMap}
                // selectedAdminArea={adminAreaFeatId}
                adminArea={currentAdminArea}
                indicatorsConfig={get(
                  appConfig.getData(),
                  'staticIndicators.indicators',
                  null
                )}
              />

            </ExploreCanvas>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

Home.propTypes = {
  // fetchConfig: T.func,
  // fetchAdminAreas: T.func,
  // fetchSingleAdminArea: T.func,
  fetchLayerData: T.func,
  fetchTimeSeriesDaily: T.func,
  fetchTimeSeriesOverview: T.func,
  match: T.object,
  appConfig: T.object,
  layerData: T.object,
  currentAdminArea: T.object,
  // timeSeriesDaily: T.object,
  timeSeriesOverview: T.object
};

function mapStateToProps (state, props) {
  const adminAreaFeatId = props.match.params.id;

  const currentAdminArea = wrapApiResult(
    getFromState(state, ['adminAreas', 'single', adminAreaFeatId])
  );

  return {
    appConfig: wrapApiResult(state.appConfig),
    // adminAreas: wrapApiResult(state.adminAreas.list),
    layerData: wrapApiResult(state.layerData, true),
    currentAdminArea,
    timeSeriesDaily: wrapApiResult(state.timeSeries.daily, true),
    timeSeriesOverview: wrapApiResult(state.timeSeries.overview, true)
  };
}

const mapDispatchToProps = {
  fetchConfig: fetchConfigAction,
  fetchAdminAreas: fetchAdminAreasAction,
  fetchLayerData: fetchLayerDataAction,
  fetchSingleAdminArea: fetchSingleAdminAreaAction,
  fetchTimeSeriesDaily: fetchTimeSeriesDailyAction,
  fetchTimeSeriesOverview: fetchTimeSeriesOverviewAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
