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
  EntryNavLink
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
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
                  molestias deserunt blanditiis veritatis, porro exercitationem
                  quaerat pariatur fugit nam iusto cum ullam animi? Velit
                  voluptatibus provident deserunt, corrupti natus porro.
                  Expedita repudiandae qui at ab eveniet nihil laborum eligendi
                  numquam nemo error, fuga, quasi natus debitis. Soluta labore
                  sed, rem autem alias accusamus dignissimos, nam aut suscipit
                  voluptas, harum nemo!
                </p>
                <p>
                  Porro aliquid sed veritatis cumque maiores adipisci ea et
                  perspiciatis officia deserunt perferendis assumenda mollitia
                  ab nihil quas similique aspernatur labore ipsa asperiores, eum
                  minima repudiandae, at fugiat! Totam, delectus! Ab aut
                  necessitatibus delectus pariatur eaque eveniet velit
                  consequuntur nam odio minus. Non est reiciendis, eveniet aut,
                  ut esse ratione libero temporibus inventore, enim vitae alias
                  necessitatibus error pariatur in.
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
                      {item.name}
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
