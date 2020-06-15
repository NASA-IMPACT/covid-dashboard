import React from 'react';
import styled from 'styled-components';

import config from '../../config';

import { Link } from 'react-router-dom';
import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';
import { glsp } from '../../styles/utils/theme-values';
import media from '../../styles/utils/media-queries';
import { headingAlt } from '../../styles/type/heading';
import Button from '../../styles/button/button';

const { appTitle } = config;

const PageFoot = styled.footer`
  position: relative;
  z-index: 18;
  background: ${themeVal('color.link')};
  color: ${themeVal('color.baseLight')};

  a,
  a:visited {
    color: inherit;
  }
`;

const PageFootInner = styled.div`
  display: flex;
  padding: ${glsp()};
  align-items: center;
  margin: 0 auto;
  height: 100%;
`;

const PageFootTitle = styled(Link)`
  display: block;

  sup {
    display: block;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: ${themeVal('type.base.extrabold')};
    text-transform: uppercase;
    top: 0;
  }

  strong {
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: ${themeVal('type.base.light')};
    letter-spacing: -0.025em;
    display: block;
  }
`;

const PageCredits = styled.address`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  font-style: normal;
  align-items: flex-start;

  ${media.smallUp`
    flex-flow: row nowrap;
  `}

  time {
    display: block;
    font-size: 0.75rem;
    line-height: 1rem;
    opacity: 0.64;
  }
`;

const Colophon = styled.p`
  time {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1rem;
    display: block;
  }
`;

const InfoList = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-gap: ${glsp(0, 1)};
  align-items: start;
  margin-bottom: ${glsp()};

  ${media.smallUp`
    grid-gap: ${glsp(0, 2)};
    margin: 0 0 0 auto;
    order: 2;
  `}

  dt {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1rem;
    grid-row: 1;
  }

  dd {
    grid-row: 2;

    > * {
      vertical-align: top;
      margin-left: -0.125rem;
    }
  }
`;

const CreditsContactButton = styled(Button)`
  &::before {
    ${collecticon('envelope')}
  }
`;

const CreditsGitHubButton = styled(Button)`
  &::before {
    ${collecticon('brand-github')}
  }
`;

const PageFooter = props => {
  return (
    <PageFoot role='contentinfo'>
      <PageFootInner>
        <PageCredits>
          <InfoList>
            <dt>Technical contact</dt>
            <dd>
              <CreditsContactButton
                as='a'
                href='mailto:manil.maskey@nasa.gov'
                title='Get in touch'
                variation='base-plain'
                size='small'
              >
                Manil Maskey
              </CreditsContactButton>
            </dd>
            <dt>Open source code</dt>
            <dd>
              <CreditsGitHubButton
                as='a'
                href='https://github.com/NASA-IMPACT/covid-dashboard'
                title='Explore the code'
                variation='base-plain'
                size='small'
              >
                GitHub
              </CreditsGitHubButton>
            </dd>
          </InfoList>
          <Colophon>
            <PageFootTitle to='/' title='Go to welcome page'>
              <sup>NASA - Earthdata</sup>
              <strong>{appTitle}</strong>
            </PageFootTitle>
            <time dateTime='2020'>2020</time>
          </Colophon>
        </PageCredits>
      </PageFootInner>
    </PageFoot>
  );
};

PageFooter.propTypes = {
};

export default PageFooter;
