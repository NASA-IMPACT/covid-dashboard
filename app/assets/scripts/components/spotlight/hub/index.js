import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import converter from 'number-to-words';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';
import Prose from '../../../styles/type/prose';
import InpageHGroup from '../../../styles/inpage-hgroup';
import {
  PageConstrainer,
  HubFold,
  EntriesList,
  EntryNavLink,
  EntryNavLinkTitle,
  EntryNavLinkMedia
} from '../../../styles/hub-pages';

import { wrapApiResult } from '../../../redux/reduxeed';

import config from '../../../config';
const { baseUrl } = config;

const metadata = {
  color: '#2276AC'
};

class SpotlightAreasHub extends React.Component {
  render () {
    const { spotlightList } = this.props;
    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();
    const spotlightsCount = converter.toWords(spotlightAreas ? spotlightAreas.length : 0);

    return (
      <App pageTitle='Spotlight areas'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Understanding Spotlight Areas</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <HubFold>
                <Prose>
                  <p>
                    The global trajectory of the coronavirus and different
                    levels of response to its spread have led to regional
                    changes to air and water quality, night lights, and other
                    economic indicators.
                  </p>
                  <p>
                    This dashboard highlights {spotlightsCount} spotlight areas around the
                    world, allowing you to explore how a specific location&apos;s
                    response to COVID-19 outbreaks has influenced local
                    environmental signals.
                  </p>
                  <p>
                    The {spotlightsCount} spotlight areas were chosen based on their large
                    populations and high level of economic activity, which
                    reveal significant changes in response to coronavirus
                    lockdown measures. For instance, larger urban areas where
                    more people live and work see more significant fluctuations
                    in NO2, while locations with active ports reveal changes in
                    water quality. This unique vantage point from space allows
                    researchers to track global and regional changes on our
                    planet, particularly during times of stress and crisis.
                  </p>
                  <p>
                    Click below to visit a spotlight area.
                  </p>
                </Prose>
              </HubFold>
              <HubFold>
                <InpageHGroup
                  title='Areas'
                  dashColor={metadata.color}
                />
                <EntriesList>
                  <li>
                    <EntryNavLink
                      to='/explore/global'
                      title='Explore global'
                    >
                      <EntryNavLinkTitle>Global</EntryNavLinkTitle>
                      <EntryNavLinkMedia>
                        <img src={`${baseUrl}/assets/graphics/content/cities/global.jpg`} width='960' height='480' alt='Area thumbnail' />
                      </EntryNavLinkMedia>
                    </EntryNavLink>
                  </li>
                  {spotlightAreas &&
                    spotlightAreas.map((item) => (
                      <li key={item.id}>
                        <EntryNavLink
                          to={`/explore/${item.id}`}
                          title={`View spotlight area ${item.label}`}
                        >
                          <EntryNavLinkTitle>{item.label}</EntryNavLinkTitle>
                          <EntryNavLinkMedia>
                            <img src={`${baseUrl}/assets/graphics/content/cities/${item.id}.jpg`} width='960' height='480' alt='Area thumbnail' />
                          </EntryNavLinkMedia>
                        </EntryNavLink>
                      </li>
                    ))}
                </EntriesList>
              </HubFold>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

SpotlightAreasHub.propTypes = {
  spotlightList: T.object
};

function mapStateToProps (state, props) {
  return {
    spotlightList: wrapApiResult(state.spotlight.list)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightAreasHub);
