import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
  EntryNavLinkMedia,
  EntryNavLinkInfo
} from '../../../styles/hub-pages';
import storiesList from '../';
import { format } from 'date-fns';
import media from '../../../styles/utils/media-queries';

import config from '../../../config';
const { baseUrl } = config;

const metadata = {
  color: '#2276AC'
};

export const StoriesList = styled(EntriesList)`
  grid-template-columns: 1fr;

  ${media.mediumUp`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const StoriesNavLink = styled(EntryNavLink)`
  min-height: 12rem;

  ${media.mediumUp`
    min-height: 16rem;
  `}
`;

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
                  aliquam libero, id finibus risus mattis quis. Morbi ornare sit
                  amet mi ut efficitur. Proin sodales tellus enim, quis feugiat
                  purus facilisis quis. Praesent facilisis, quam et eleifend
                  finibus, erat urna porttitor sem, at suscipit urna libero eu
                  felis. Duis ullamcorper lectus ut tempus interdum. Donec
                  lobortis, ante sit amet euismod sollicitudin, nisi lectus
                  finibus enim, id mollis eros sapien in neque. Aenean fermentum
                  mauris sed nunc posuere venenatis. Vestibulum mi ex, sagittis
                  a semper non, pretium a purus. Orci varius natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec
                  id libero lobortis, scelerisque est vitae, fringilla sapien.
                </p>
              </Prose>
            </HubFold>
            <HubFold>
              <InpageHGroup title='Stories' dashColor={metadata.color} />
              <StoriesList>
                {storiesList.map((item) => (
                  <li key={item.id}>
                    <StoriesNavLink
                      to={`/stories/${item.id}/${item.chapters[0].id}`}
                      title={`View story ${item.name}`}
                    >
                      <EntryNavLinkTitle>{item.name}</EntryNavLinkTitle>
                      <EntryNavLinkInfo>
                        <p>{item.chapters.length} chapters</p>
                        <p>
                          Published on{' '}
                          {format(new Date(item.publishDate), 'MMM do, yyyy')}
                        </p>
                      </EntryNavLinkInfo>
                      <EntryNavLinkMedia>
                        <img
                          src={`${baseUrl}/assets/graphics/content/stories/${item.thumbnail}`}
                          width='960'
                          height='480'
                          alt='Story thumbnail'
                        />
                      </EntryNavLinkMedia>
                    </StoriesNavLink>
                  </li>
                ))}
              </StoriesList>
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
