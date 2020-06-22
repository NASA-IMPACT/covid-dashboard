import React from 'react';
import styled from 'styled-components';
import ReactCompareImage from 'react-compare-image';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold, FoldDetails } from '../../styles/fold';
import {
  IntroLead
} from '../../styles/datasets';
import MediaImage, { MediaCompare } from '../../styles/media-image';
import media from '../../styles/utils/media-queries';

import { glsp } from '../../styles/utils/theme-values';
import Heading from '../../styles/type/heading';
import config from '../../config';

const { baseUrl } = config;

const LeadFold = styled(Fold)`
  padding-bottom: 0;

  ${media.largeUp`
    padding-bottom: ${glsp(3)};
  `}
`;

const IntroFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaCompare} {
    grid-column: full-start / full-end;

    ${media.mediumUp`
      grid-column: content-start / content-end;
    `}

    ${media.largeUp`
      grid-column: full-start / content-8;
      grid-row: 1;
    `}

    figcaption {
      padding: 0 ${glsp()};
      max-width: 30rem;
      text-align: center;
      margin: 0 auto;
    }
  }

  ${FoldDetails} {
    grid-column: content-start / content-end;
    text-align: left;

    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-8 / content-end;
    `}
  }
`;

const ResearchFold = styled(Fold)`
  ${Gridder} {
    align-items: center;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-7;
  }

  ${Prose} {
    grid-column: content-start / content-end;
    grid-row: 2;
    margin-bottom: ${glsp(2)};

    ${media.smallDown`
      column-count: 1;
    `}
  }
`;

const InterpretDataFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaImage} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-7;
    `}
    
    ${media.largeUp`
      grid-row: 1;
      grid-column: content-start / content-8;
    `}

    figcaption {
      padding: 0 ${glsp()};
      max-width: 30rem;
      text-align: center;
      margin: 0 auto;
    }
  }

  ${FoldDetails} {
    grid-column: content-start / content-end;
    text-align: left;

    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-8 / content-end;
    `}
  }
`;

const CreditsFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-end;

    ${media.largeUp`
      grid-column: content-start / content-7;
    `}
  }

  ${Prose} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-start / content-10;
    `}
  }
`;

const FactsFold = styled(Fold)`
  ${Gridder} {
    align-items: center;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-end;

    ${media.largeUp`
      grid-column: content-start / content-7;
    `}
  }

  ${Prose} {
    grid-column: content-start / content-end;
    
    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-start / content-10;
    `}
  }
`;

const metadata = {
  id: 'co2',
  name: 'Carbon Dioxide',
  color: '#2276AC'
};

class CO2LongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <LeadFold>
          <Gridder>
            <IntroLead>
Reductions in carbon dioxide (CO2) emissions due to COVID-19 shutdowns are expected to reduce the rate at which CO2 accumulates in the atmosphere, but not its total atmospheric concentration.

            </IntroLead>
          </Gridder>
        </LeadFold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>

                <p>
Reductions in carbon dioxide (CO2) emissions due to COVID-19 shutdowns are expected to reduce the rate at which CO2 accumulates in the atmosphere, but not its total atmospheric concentration.
                </p>
                <p>

                  Carbon dioxide (CO2) is a greenhouse gas primarily emitted from the combustion of fossil fuels such as petroleum, coal, and natural gas. <a href='https://climate.nasa.gov/scientific-consensus/' target='_blank' rel='noopener noreferrer'>Scientists widely agree </a>that the build-up of excess carbon dioxide and other greenhouse gases within Earth’s atmosphere has contributed to the rapid change in  global climate.
                </p>
                <p>

                  During lockdowns and in response to other social distancing measures throughout the COVID-19 pandemic, there have been significant but temporary reductions in CO2 emissions. These reductions are accompanied by comparable reductions in short-lived air pollutants, such as <a href='https://earthdata.nasa.gov/covid19/indicators/no2' taret='_blank' rel='noopener noreferrer'>nitrogen dioxide (NO2)</a>. While fossil fuel combustion emits far more CO2 than NO2, scientists anticipate much smaller changes in the atmospheric concentration of CO2 due to its larger atmospheric abundance, relatively long lifespan, and role of trees and other plants in its seasonal absorption.
                </p>
                <p>
                  Because of this, regional-scale changes in CO2 concentrations are expected to be no larger than 1 part per million (ppm), out of the 415 ppm CO2 background – a change of only 0.25%. The longer-term implications of this temporary reduction will take time and rigorous scientific study to fully understand.
                </p>

              </Prose>
            </FoldDetails>
          </Gridder>
        </IntroFold>

        <ResearchFold>
          <Gridder>
            <InpageHGroup
              title='Scientific Research'
              dashColor={metadata.color}
            />
            <Prose>
              <p>
                To track the changes in atmospheric CO2 during COVID-19 shutdowns, researchers are using observations from the <a href='https://oco.jpl.nasa.gov/' target='_blank' rel='noopener noreferrer'>NASA Orbiting Carbon Observatory 2 (OCO-2)</a> and <a href='https://www.eorc.jaxa.jp/GOSAT/index.html' target='_blank' rel='noopener noreferrer'>Japan’s Greenhouse gases Observing SATellite (GOSAT)</a>.
              </p>
              <p>
                OCO-2 and GOSAT provide estimates of average column atmospheric CO2 concentrations from Earth’s surface to space. OCO-2, which launched in 2014, provides changes in atmospheric CO2 on regional scales across the globe. GOSAT, which launched in 2009, provides targeted atmospheric CO2 observations that can be used to track changes over large urban areas.
              </p>
              <p>
                Ongoing research by the OCO-2 Science Team at NASA’s Jet Propulsion Laboratory (JPL), Colorado State University, and the Global Modeling and Assimilation Office (GMAO) at NASA’s Goddard Space Flight Center seeks to better understand the atmospheric CO2 effects of the COVID-19 shutdowns. The Japan Aerospace Exploration Agency (JAXA) GOSAT Project Team and the GOSAT Earth Observation Research Center (EORC) generated the GOSAT products.
              </p>

            </Prose>
          </Gridder>
        </ResearchFold>

        <InterpretDataFold>
          <Gridder>
            <FoldDetails>
              <InpageHGroup
                title='Interpreting the Data'
                dashColor={metadata.color}
              />
              <Prose>
                <p>
                  Unlike satellite-derived NO2 measurements, which are captured continuously on a daily basis, the coverage of CO2 measurements from OCO-2 and GOSAT is not as dense. Because of this, measurements from OCO-2 and GOSAT collected over weeks to months must be combined to yield high-resolution global maps of CO2. In addition, in order to account for long-range transport of CO2 by the wind, the data must further be assimilated into atmospheric transport models like those used to predict the weather.

                </p>

                <p>
                  The NASA dashboard uses NASA’s Global Earth Observing System Constituent Data Assimilation System (GEOS CoDAS) developed by GMAO to ingest the OCO-2 data and produce gap-filled maps.

                </p>

                <p>
                  To more clearly discriminate between the COVID-19 related changes and much larger seasonal variations, observations from 2020 are compared with a carefully constructed baseline CO2 climatology derived from a reference simulation that was corrected for persistent biases between the model and OCO-2 observations collected in 2015-2019.

                </p>
              </Prose>
            </FoldDetails>
          </Gridder>
        </InterpretDataFold>

        <CreditsFold>
          <Gridder>
            <InpageHGroup
              title='Credits'
              dashColor={metadata.color}
            />
            <Prose>
              <p>
                Carbon dioxide data courtesy of the OCO-2 Science Team at NASA’s Jet Propulsion Laboratory, Colorado State University, and the Global Modeling and Assimilation Office at NASA’s Goddard Space Flight Center using OCO-2 and GOSAT data.
              </p>
            </Prose>
          </Gridder>
        </CreditsFold>

        <FactsFold>
          <Gridder>
            <InpageHGroup
              title='Additional resources'
              dashColor={metadata.color}
            />
            <Prose>
              <Heading as='h3' size='medium'>NASA Features</Heading>
              <ul>
                <li><a href='https://oco.jpl.nasa.gov/' target='_blank' rel='noopener noreferrer' />Orbiting Carbon Observatory 2 (OCO-2)</li>
                <li><a href='https://ocov3.jpl.nasa.gov/' target='_blank' rel='noopener noreferrer' />Orbiting Carbon Observatory 3 (OCO-3)</li>
                <li><a href='https://aura.gsfc.nasa.gov/omi.html' target='_blank' rel='noopener noreferrer' />Ozone Monitoring Instrument (OMI)</li>

              </ul>
            </Prose>
          </Gridder>
        </FactsFold>
      </React.Fragment>
    );
  }
}

CO2LongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: CO2LongForm
};
