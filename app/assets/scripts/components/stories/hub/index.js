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
import InpageHGroup from '../../../styles/inpage-hgroup';
import {
  PageConstrainer,
  HubFold,
  EntriesList,
  EntryNavLink,
  EntryNavLinkTitle,
  EntryNavLinkMedia
} from '../../../styles/hub-pages';
import storiesList from '../';

const metadata = {
  color: '#2276AC'
};

const StoriesHub = (props) => {
  const { storiesList } = props;

  return (
    <App pageTitle='Stories hub'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>Stories</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <PageConstrainer>
            <HubFold>
              <Prose>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum fringilla vulputate porttitor. Donec feugiat
                  aliquam libero, id finibus risus mattis quis. Morbi ornare
                  sit amet mi ut efficitur. Proin sodales tellus enim, quis
                  feugiat purus facilisis quis. Praesent facilisis, quam et
                  eleifend finibus, erat urna porttitor sem, at suscipit urna
                  libero eu felis. Duis ullamcorper lectus ut tempus interdum.
                  Donec lobortis, ante sit amet euismod sollicitudin, nisi
                  lectus finibus enim, id mollis eros sapien in neque. Aenean
                  fermentum mauris sed nunc posuere venenatis. Vestibulum mi
                  ex, sagittis a semper non, pretium a purus. Orci varius
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec id libero lobortis, scelerisque est
                  vitae, fringilla sapien.
                </p>
              </Prose>
            </HubFold>
            <HubFold>
              <InpageHGroup
                title='Stories'
                dashColor={metadata.color}
              />
              <EntriesList>
                {storiesList.map((item) => (
                  <li key={item.id}>
                    <EntryNavLink
                      to={`/stories/${item.id}`}
                      title={`View story ${item.name}`}
                    >
                      <EntryNavLinkTitle>{item.name}</EntryNavLinkTitle>
                      <EntryNavLinkMedia>
                        <img src='https://via.placeholder.com/480x240' width='960' height='480' alt='Indicator thumbnail' />
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
};

StoriesHub.propTypes = {
  storiesList: T.array
};

function mapStateToProps (state, props) {
  return {
    storiesList: storiesList
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesHub);
