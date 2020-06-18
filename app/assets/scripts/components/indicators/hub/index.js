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

import indicatorsList from '../';

class IndicatorsHub extends React.Component {
  render () {
    const { indicatorsList } = this.props;

    return (
      <App pageTitle='Indicators'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Indicators</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <Heading as='h2' size='large'>
                Understanding the Indicators
                </Heading>

                <p>
                  Although NASA cannot directly observe COVID-19 from space, we can observe how human actions in response to COVID-19 affect the world around us. We refer to these as indicators.
                </p>
                <p>
                  This dashboard explores 10 key indicators -- 4 environmental and 6 economic -- that show how the planet is responding to our changing behavior.
                </p>
              </Prose>

              <Heading as='h2' size='large'>
                Indicators
              </Heading>

              <EntriesList>
                {indicatorsList.map((item) => (
                  <li key={item.id}>
                    <EntryNavLink
                      to={`/indicators/${item.id}`}
                      title={`View indicator ${item.name}`}
                    >
                      <EntryNavLinkTitle>{item.name}</EntryNavLinkTitle>
                      <EntryNavLinkMedia>
                        <img src='https://loremflickr.com/960/480' width='960' height='480' alt='Indicator thumbnail' />
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

IndicatorsHub.propTypes = {
  indicatorsList: T.array
};

function mapStateToProps (state, props) {
  return {
    indicatorsList: indicatorsList.filter(d => !!d.LongForm)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsHub);
