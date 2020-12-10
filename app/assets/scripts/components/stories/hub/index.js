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
    <App pageTitle='Discovery hub'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>Discoveries</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <PageConstrainer>
            <HubFold>
              <Prose>
                <p>
                  Explore the guided narratives below to discover how NASA satellites and other Earth observing resources reveal how the COVID-19 pandemic is affecting Earth’s air, land, water, and climate.
                </p>
              </Prose>
            </HubFold>
            <HubFold>
              <InpageHGroup title='Discoveries' dashColor={metadata.color} />
              <StoriesList>
                {storiesList.map((item) => (
                  <li key={item.id}>
                    <StoriesNavLink
                      to={`/discoveries/${item.id}/${item.chapters[0].id}`}
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
                          src={`${baseUrl}/assets/graphics/content/discoveries/${item.thumbnail}`}
                          width='960'
                          height='480'
                          alt='Discovery thumbnail'
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
