import React from 'react';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold, FoldDetails } from '../../styles/fold';
import { IntroLead } from '../../styles/datasets';
import media from '../../styles/utils/media-queries';

import { glsp } from '../../styles/utils/theme-values';
import Heading from '../../styles/type/heading';

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

  ${FoldDetails} {
    grid-column: content-start / content-end;
  }

  ${media.largeUp`
    ${Prose} {
        column-count: 2;
        column-gap: ${glsp(2)};
      }
  `}
`;

const ResearchFold = styled(Fold)`
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

const InterpretDataFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${FoldDetails} {
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
  id: 'agriculture',
  name: 'Agriculture',
  color: '#2276AC'
};

class AgLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <LeadFold>
          <Gridder>
            <IntroLead>
              Food supply flows and food access across the globe have been
              disrupted due to shelter-in-place and social distancing measures
              during the novel coronavirus pandemic.
            </IntroLead>
          </Gridder>
        </LeadFold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>
                <p>
                  Goverments and agricultural organizations typically rely on
                  in-person surveys to track key farming milestones like sowing,
                  crop progress, and harvesting. Due to social distancing
                  measures during the COVID-19 pandemic, groups are increasingly
                  relying on satellite Earth observations to safely track these
                  variables.
                </p>
                <p>
                  Despite these common obstacles, the spread of the novel
                  coronavirus has unevenly impacted global food supply chains.
                  In higher income countries with more isolated agricultural
                  communities and less intensive cultivation techniques, the
                  virus’s spread has had a minimal effect on key staple crops
                  like wheat, maize, rice, and soybeans. Yet, in some middle
                  and lower income countries where mandatory shelter-in-place
                  orders have strained the cultivation of labor-intensive
                  crops, the U.N. World Food Programme estimates that the
                  pandemic could double the number of people facing acute
                  food shortages by the end of 2020.
                </p>
                <p>
                  Researchers are using data from the{' '}
                  <a
                    href='https://cropmonitor.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Group on Earth Observation’s Global Agricultural Monitoring
                    Intiative (GEOGLAM) global Crop Monitor{' '}
                  </a>
                  during the COVID-19 pandemic to predict unexpected
                  agricultural shortfalls in order to strengthen global food
                  security. The GEOGLAM Crop Monitor combines Earth
                  observation satellite data on precipitation, soil moisture,
                  and other agricultural indicators from more than 40 global
                  partners in one convenient tool.
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
                NASA supports satellite observations that can be used to study
                changes in agricultural land use, as well as agricultural
                productivity and sustainability. During the pandemic,
                researchers can leverage this data to rapidly map and depict
                how the nature and distribution of a country’s agricultural
                fields might be changing during the pandemic. In addition,
                ongoing work within{' '}
                <a
                  href='https://nasaharvest.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  NASA Harvest
                </a>
                a partnership between NASA and the University of Maryland
                within{' '}
                <a
                  href='https://appliedsciences.nasa.gov/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  NASA’s Earth Science Applied Sciences Program
                </a>
                , seeks to enable and advance the adoption of satellite Earth
                observations by public and private organizations to benefit
                food security, agriculture, and human and environmental
                resiliency worldwide.
              </p>
              <p>
                Researchers and the GEOGLAM Crop Monitor use a variety of
                methods to assess crop conditions, including Normalized
                Difference Vegetation Index (NDVI), precipitation, soil
                moisture, evapotranspiration, and temperature. Each of these
                aspects can be observed using satellites.
              </p>
              <p>
                NDVI is used to monitor the amount of healthy vegetation in a
                study area. Healthy vegetation reflects more near-infrared
                wavelengths and absorbs more red and blue light – this is why
                healthy vegetation appears green to the human eye. Changes in
                NDVI tell us when vegetation is consistently healthy over a
                specific time frame or season. Precipitation anomaly datasets
                provide an idea of which areas are experiencing too much or too
                little rain for crops to survive. Soil Moisture maps show how
                much water is being stored in the soil. If the soil-water ratio
                is balanced, crops will be able to take root more easily than
                in drier conditions. Evapotranspiration, or the evaporation of
                water from plants and the land surface, is measured using the{' '}
                <a
                  href='https://servirglobal.net/Global/Evaporative-Stress-Index/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Evaporative Stress Index (ESI){' '}
                </a>
                to monitor normal evapotranspiration rates and detect potential
                drought in a region. And temperature is an important factor to
                assess crop growth because certain crops have specific
                temperature thresholds. Monitoring temperature anomalies helps
                indicate whether temperatures are too warm or cold over time
                for a crop to thrive.
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
                  The agricultural data presented in the dashboard are taken
                  from the GEOGLAM Crop Monitor developed to provide open,
                  timely, science-driven information on crop conditions in
                  support of market transparency for the{' '}
                  <a
                    href='http://www.amis-outlook.org/amis-about'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    G20 Agricultural Market Information System (AMIS)
                  </a>
                  . This system helps promote transparency and policy
                  coordination in international food markets and helps
                  prevent unexpected price hikes. The data reflect an
                  international, multi-source, consensus assessment of global
                  crop growing conditions, status, and climatic factors likely
                  to impact production, such as temperature and precipitation
                  changes.
                </p>
                <p>
                  Within the Crop Monitor data, each timestep shows the
                  global synthesis crop condition map of all crops being
                  monitored. Each color represents a different crop condition.
                  Blue is “Exceptional,” where crop conditions are much better
                  than average. This label is used only during the
                  grain-filling through harvest stages. Green is favourable,
                  where crop conditions range from slightly below to slightly
                  above average at reporting time. Yellow is Watch, where crop
                  conditions are not far from average but there is a potential
                  risk to final yields. There is still time and possibility
                  for the crop to recover to average conditions if the ground
                  situation improves. This label is only used during the
                  planting through early vegetative and the vegetative through
                  reproductive stages. Red is “Poor,” where conditions are well
                  below average. Crop yields in red regions are likely to be
                  10% below average. This is only used when conditions are not
                  likely to be able to recover and an impact on yields is
                  likely. Gray areas are where crops are out-of-season, and
                  brown areas are where there is no reliable source of data
                  available.
                </p>
                <p>
                  The Crop Monitor for AMIS has shown that crop conditions and
                  the related production for 2020 are generally favorable.
                  While dry conditions in parts of Europe, southern Ukraine,
                  and southern Russia have impacted winter wheat yields,
                  favorable harvests in North America, India, China, and
                  elsewhere in the Black Sea region have offset those
                  reductions. In the Southern Hemisphere, there have been good
                  harvests of maize and soybeans in Brazil, Argentina, and
                  South Africa. Looking ahead, conditions are favorable for
                  most summer crops in the Northern Hemisphere, the monsoon
                  season in India, the main rice season in northern southeast
                  Asia, and for winter wheat in Australia. Providing evidence
                  from satellite-based observations that overall global
                  production of major staple crops is adequate has been
                  critical during this time of uncertainty.
                </p>
              </Prose>
            </FoldDetails>
          </Gridder>
        </InterpretDataFold>

        <FactsFold>
          <Gridder>
            <InpageHGroup
              title='Additional resources'
              dashColor={metadata.color}
            />
            <Prose>
              <Heading as='h3' size='medium'>
                Explore the missions
              </Heading>
              <ul>
                <li>
                  <a
                    href='https://nasaharvest.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    NASA Harvest
                  </a>
                </li>
                <li>
                  <a
                    href='http://www.amis-outlook.org/home/en/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    AMIS Market Monitor
                  </a>
                </li>
                <li>
                  <a
                    href='https://cropmonitor.org/index.php/cmreports/amis-report/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Crop Monitor for AMIS
                  </a>
                </li>
                <li>
                  <a
                    href='https://cropmonitor.org/index.php/cmreports/earlywarning-report/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Crop Monitor for Early Warning
                  </a>
                </li>
                <li>
                  <a
                    href='https://nasaharvest.org/project/geo-global-agricultural-monitoring-geoglam-initiative'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    The GEO Global Agricultural Monitoring Initiative (GEOGLAM)
                  </a>
                </li>
              </ul>
              <Heading as='h3' size='medium'>
                Explore the data
              </Heading>
              <ul>
                <li>
                  <a
                    href='https://cropmonitor.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    The GEOGLAM Crop Monitor
                  </a>
                </li>
              </ul>
            </Prose>
          </Gridder>
        </FactsFold>
      </React.Fragment>
    );
  }
}

AgLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: AgLongForm
};
