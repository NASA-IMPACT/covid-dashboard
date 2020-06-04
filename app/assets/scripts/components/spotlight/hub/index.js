import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
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
import Constrainer from '../../../styles/constrainer';
import Prose from '../../../styles/type/prose';
import Heading from '../../../styles/type/heading';

import { glsp } from '../../../styles/utils/theme-values';
import { themeVal } from '../../../styles/utils/general';
import { wrapApiResult } from '../../../redux/reduxeed';

const PanelNavLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: ${glsp()};
  font-size: 1rem;
  line-height: 1.25rem;
  transition: all 0.16s ease 0s;
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
  border-radius: ${themeVal('shape.rounded')};

  &,
  &:visited {
    color: inherit;
  }

  &:hover {
    background: ${themeVal('color.baseAlphaA')};
    box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaC')};
    opacity: 1;
  }

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${glsp(0.125)};
    content: '';
    background: ${themeVal('color.baseLight')};
    opacity: 0;
    transition: all 0.16s ease 0s;
  }

  &.active,
  &.active:hover {
    background: rgba(255, 255, 255, 0.04);
    font-weight: bold;

    &:after {
      opacity: 1;
    }
  }
`;

const PageConstrainer = styled(Constrainer)`
  padding-top: ${glsp(4)};
  padding-bottom: ${glsp(4)};

  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

const EntriesList = styled.ul`
  display: grid;
  grid-gap: ${glsp(2)};
  grid-template-columns: repeat(12, 1fr);

  li {
    text-align: center;
    grid-column: auto / span 3;
  }
`;

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
                <InpageTitle>Spotlight areas</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure molestias deserunt blanditiis veritatis, porro exercitationem quaerat pariatur fugit nam iusto cum ullam animi? Velit voluptatibus provident deserunt, corrupti natus porro.
                Expedita repudiandae qui at ab eveniet nihil laborum eligendi numquam nemo error, fuga, quasi natus debitis. Soluta labore sed, rem autem alias accusamus dignissimos, nam aut suscipit voluptas, harum nemo!</p>
                <p>Porro aliquid sed veritatis cumque maiores adipisci ea et perspiciatis officia deserunt perferendis assumenda mollitia ab nihil quas similique aspernatur labore ipsa asperiores, eum minima repudiandae, at fugiat! Totam, delectus!
                Ab aut necessitatibus delectus pariatur eaque eveniet velit consequuntur nam odio minus. Non est reiciendis, eveniet aut, ut esse ratione libero temporibus inventore, enim vitae alias necessitatibus error pariatur in.</p>
              </Prose>

              <Heading as='h2' size='large'>Spotlight Areas</Heading>
              <EntriesList>
                {spotlightAreas && spotlightAreas.map((item) => (
                  <li key={item.id}>
                    <PanelNavLink
                      to={`/spotlight/${item.id}`}
                      title={`View spotlight area ${item.label}`}
                    >
                      {item.label}
                    </PanelNavLink>
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
