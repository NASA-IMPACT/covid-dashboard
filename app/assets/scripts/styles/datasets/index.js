import styled from 'styled-components';

import Prose from '../type/prose';
import Constrainer from '../constrainer';
import Gridder from '../gridder';
import InpageHGroup, { headingDash } from '../inpage-hgroup';
import { Fold } from '../fold';
import Heading from '../type/heading';

import { themeVal } from '../utils/general';
import { glsp } from '../utils/theme-values';
import media from '../utils/media-queries';

export const IntroLead = styled(Heading).attrs({
  as: 'p',
  size: 'xlarge'
})`
  grid-column: content-start / content-end;
  grid-row: 1;

  ${media.mediumUp`
    grid-column: content-start / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-9;
  `}
`;

export const IntroDescription = styled(Prose)`
  grid-row: 2;
  grid-column: 7 / span 6;
`;

export const StatsFold = styled(Fold)`
  background: ${themeVal('color.baseAlphaB')};
  overflow: hidden;
  position: relative;

  ${Constrainer} {
    position: relative;

    ::after {
      position: absolute;
      top: -50%;
      left: calc(100% - ${glsp(2)});
      width: 200vw;
      height: 200vh;
      z-index: 1;
      content: '';
      background: ${themeVal('color.surface')};
    }

    > * {
      z-index: 2;
    }
  }
`;

export const StatsHeader = styled.header`
  grid-row: 1;
  grid-column: 9 / span 4;

  ${Heading} {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 12rem;
    margin-bottom: ${glsp()};

    ::before {
      margin-bottom: ${glsp(0.5)};
    }
  }
`;

export const StatsList = styled.dl`
  grid-row: 1;
  grid-column: span 8;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr auto;
  grid-auto-flow: column;
  grid-column-gap: ${glsp(2)};

  dt, dd {
    grid-column: span 4;
  }

  dt {
    font-weight: ${themeVal('type.heading.bold')};
  }

  dd {
    font-size: 7rem;
    line-height: 1;
    font-weight: ${themeVal('type.heading.medium')};

    ${headingDash(glsp(0.75), glsp(1.25))}
  }
`;

export const DetectionFold = styled(Fold)`
  ${InpageHGroup} {
    margin-bottom: ${glsp(2)};
  }
`;

export const DetectionLead = styled(Heading).attrs({
  as: 'div',
  size: 'xlarge'
})`
  padding: ${glsp(4)} 0;

  ${Gridder} {
    align-items: center;

    > * {
      grid-column: content-3 / content-11;
    }
  }
  
  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;
