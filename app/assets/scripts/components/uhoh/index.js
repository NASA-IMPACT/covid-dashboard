import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Prose from '../../styles/type/prose';
import Constrainer from '../../styles/constrainer';
import { Fold } from '../../styles/fold';

const PageProse = styled(Prose)`
  grid-row: 1;
  grid-column: span 8;
`;

export default class UhOh extends React.Component {
  render () {
    return (
      <App pageTitle='Page not found'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Page not found</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Fold>
              <Constrainer>
                <PageProse>
                  <p>We were not able to find the page you are looking for. It may have been archived or removed.</p>
                  <p>You might find an older snapshot of this page at the <a href='http://archive.org/web/' title='Find on Internet Archive'>Internet Archive</a>.<br /> If you think this page should be here let us know via <a href='mailto:' title='Send us an email'>email</a>.</p>
                  <p><Link to='/' title='Visit the homepage'>Visit the homepage</Link></p>
                </PageProse>
              </Constrainer>
            </Fold>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
