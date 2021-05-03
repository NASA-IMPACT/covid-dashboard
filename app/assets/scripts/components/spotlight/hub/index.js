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
                    The global trajectory of the global phenomena have led to regional
                    changes in air and water quality, night lights, and other
                    economic factors.
                  </p>
                  <p>
                    This dashboard highlights {spotlightsCount} spotlight areas around the
                    world, allowing you to explore how a specific location&apos;s
                    response to global phenomena has influenced local
                    environmental signals.
                  </p>
                  <p>
                    The {spotlightsCount} spotlight areas were chosen based on their large
                    populations and high level of economic activity, which
                    reveal significant changes in response to global phenomena.
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
              <HubFold>
                <InpageHGroup
                  title='Attribution'
                  dashColor={metadata.color}
                />
                <Prose>
                  <ul>
                    <li>
                      Togo image by{' '}
                      <a
                        href='https://commons.wikimedia.org/wiki/File:ECOWAS_Bank_for_Investment_and_Development_headquarters_in_Lom%C3%A9.jpg'
                        target='_blank'
                        rel='noopener noreferrer'
                        title='View more'
                      >
                        Willem Heerbaart
                      </a>, available under cc-by-2.0
                    </li>
                  </ul>
                </Prose>
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
