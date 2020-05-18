import React from 'react';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';
import Prose from '../../styles/type/prose';
import Dl from '../../styles/type/definition-list';

import media from '../../styles/utils/media-queries';
import { glsp } from '../../styles/utils/theme-values';
import { visuallyHidden } from '../../styles/helpers';
import { themeVal } from '../../styles/utils/general';

const AboutProse = styled(Prose)`
  max-width: 40rem;
`;

const LogoList = styled(Dl)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0 ${glsp()};
  list-style: none;
  padding: 0;
  margin: 0;

  dt {
    grid-column: 1 / span 12;

    &:not(:first-child) {
      margin-top: ${glsp()};
    }
  }

  dd {
    grid-column: auto / span 12;

    ${media.smallUp`
      grid-column: auto / span 4;
    `}
  }
`;

const LogoLink = styled.a`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 6rem;
  position: relative;
  z-index: 1;
  border-radius: ${themeVal('shape.rounded')};
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
  transition: all .16s ease 0s;

  span {
    ${visuallyHidden()}
  }

  img {
    display: inline-flex;
    width: auto;
    max-width: 100%;
    max-height: 3rem;
  }
`;

// Compensate for mb logo proportions.
// const LogoLinkMb = styled(LogoLink)`
//   img {
//     max-height: 2rem;
//   }
// `;

// Compensate for AWS logo proportions.
// const LogoLinkAWS = styled(LogoLink)`
//   padding: ${glsp(0.5, 1)};

//   img {
//     max-height: 4.5rem;
//   }
// `;

export default class About extends React.Component {
  render () {
    return (
      <App pageTitle='About'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>About</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <InpageBodyInner>
              <AboutProse>
                <h2>The tool</h2>
                <p>The COVID EO dashbord provides streaming data about the pandemic to inform decisionmakers in government, community leaders, health responders, and the business community.</p>

                {/* <LogoList>
                  <dt>Developed by</dt>
                  <dd>
                    <LogoLink
                      href='https://developmentseed.org/'
                      title='Visit Development Seed'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img
                        alt='Development Seed logo'
                        src='/assets/graphics/content/logos/ds-logo-hor--pos.svg'
                      />
                      <span>Development Seed</span>
                    </LogoLink>
                  </dd>
                </LogoList> */}
              </AboutProse>
            </InpageBodyInner>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
