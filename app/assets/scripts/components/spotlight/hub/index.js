import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

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
import Heading from '../../../styles/type/heading';
import {
  PageConstrainer,
  EntriesList,
  EntryNavLink,
  EntryNavLinkTitle,
  EntryNavLinkMedia
} from '../../../styles/hub-pages';

import { wrapApiResult } from '../../../redux/reduxeed';

class SpotlightAreasHub extends React.Component {
  render () {
    const { spotlightList } = this.props;

    const spotlightAreas = spotlightList.isReady() && spotlightList.getData();

    return (
      <App pageTitle='Spotlight areas'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Spotlight Areas</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <Heading as='h2' size='large'>
                Explore the Spotlight Areas
                </Heading>
                <p>
                  The global trajectory of the virus and different levels of response to its spread have led to regional variations in environmental and economic indicators.
                </p>
                <p>
                  This dashboard highlights 6 key Spotlight Areas around the world, allowing you to explore how specific locations’ response to COVID-19 have influenced local environmental signals.
                </p>
              </Prose>

              <Heading as='h2' size='large'>
                Spotlight Areas
              </Heading>
              <EntriesList>
                {spotlightAreas &&
                  spotlightAreas.map((item) => (
                    <li key={item.id}>
                      <EntryNavLink
                        to={`/spotlight/${item.id}`}
                        title={`View spotlight area ${item.label}`}
                      >
                        <EntryNavLinkTitle>{item.label}</EntryNavLinkTitle>
                        <EntryNavLinkMedia>
                          <img src='https://loremflickr.com/960/480' width='960' height='480' alt='Area thumbnail' />
                        </EntryNavLinkMedia>
                      </EntryNavLink>
                    </li>
                  ))}
              </EntriesList>
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
