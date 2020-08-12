import React from 'react';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import MediaImage from '../../styles/media-image';
import { Fold, FoldDetails } from '../../styles/fold';
import { IntroLead } from '../../styles/datasets';
import media from '../../styles/utils/media-queries';

import { glsp } from '../../styles/utils/theme-values';
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

  ${MediaImage} {
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

  ${MediaImage} {
    grid-column: full-start / full-end;

    ${media.mediumUp`
      grid-column: content-start / content-end;
    `}

    ${media.largeUp`
      grid-column: full-start / content-7;
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
  id: 'cac',
  name: 'Cars and Construction',
  color: '#2276AC'
};

class CarsAndConstructionLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <LeadFold>
          <Gridder>
            <IntroLead>
              As businesses closed and stay-at-home orders were enacted to slow
              the spread of the COVID-19 pandemic, cities across the world have
              seen reductions in automobile traffic. NASA researchers are
              tracking these changes from space using remotely sensed data.
            </IntroLead>
          </Gridder>
        </LeadFold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>
                <p>
                  High-resolution radar that makes 2D images of 3D objects,
                  known as synthetic aperture radar (SAR), can spot these
                  changes on the ground by comparing images of the same area at
                  different times. Researchers are using SAR data to detect
                  changes in the positions of objects on the ground during the
                  COVID-19 pandemic, such as cars parked at retail businesses,
                  grocery stores, and in residential neighborhoods. Researchers
                  then compare the SAR imagery for several time periods over an
                  entire city – a method called coherent change detection. The
                  lack of cars and other human movement on the ground results in
                  greater similarity between the images.
                </p>
                <p>
                  This SAR processing approach was initially developed to
                  generate{' '}
                  <a
                    href='https://disasters.nasa.gov/sulawesi-island-indonesia-earthquake-and-tsunami-2018/aria-damage-proxy-map-shows-damage-and-after'
                    taret='_blank'
                    rel='noopener noreferrer'
                    title='View more'
                  >
                    Damage Proxy Maps
                  </a>
                  , which pinpoint the locations of building damage following
                  major natural disasters.
                </p>
                <p>
                  Similarly, by comparing SAR image data before and after
                  COVID-19 lockdowns, NASA researchers have produced “Slowdown
                  Proxy Maps,” which reveal where vehicle and construction
                  activity has slowed during COVID-19 shutdowns. These slower
                  areas are shown in the blue-shaded regions on the map.
                </p>
                <p>
                  Preliminary findings in the Slowdown Proxy Maps for the Los
                  Angeles area, for example, indicate the greatest decrease in
                  car activity near airports, sports stadiums, and non-essential
                  businesses. These findings, and others from around the world,
                  will allow researchers to monitor trends in activities over
                  time and between cities. This analysis could help validate
                  reductions in carbon dioxide and nitrogen dioxide emissions
                  based on where and when slowdowns in vehicle activity occur.
                </p>
                <p>
                  The Slowdown Proxy Maps will also be able to track when and
                  where activity begins to increase as COVID-19 restrictions
                  ease.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/co2_april_1_20.png`}
              alt='CO2 Diff April 1'
            >
              The difference in carbon dioxide (CO<sub>2</sub>) levels from
              April 1, 2020 compared to previous years. Redder colors indicate
              increases in CO<sub>2</sub>. Bluer colors indicate lower levels of
              CO<sub>2</sub>. Image Credit: NASA
            </MediaImage>
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
                The Advanced Rapid Imaging and Analysis (ARIA) team at
                NASA&apos;s Jet Propulsion Laboratory in Pasadena, California,
                in collaboration with the Earth Observatory of Singapore (EOS),
                is leading this research using innovative methods and
                high-performance computing. The team is using SAR data from the
                Copernicus Sentinel-1 mission, operated by the European Space
                Agency (ESA), and the ALOS-2 mission, operated by the Japan
                Aerospace Exploration Agency (JAXA). SAR instruments are able to
                penetrate cloud cover and work in both day and night conditions.
              </p>
              <p>
                “We’ve developed a new algorithm to detect and monitor changes
                in human activity in response to virus-related social
                restrictions, and the research is building upon methods we’ve
                used to detect damaged areas after an earthquake or tropical
                cyclone,” said Sang-Ho Yun, principal investigator of the
                research at JPL.
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
                  Slowdown Proxy Maps produced by ARIA and EOS researchers show
                  areas with the greatest reduction in car activity shaded in
                  blue. Darker blues indicate areas of greater change.
                </p>
                <p>
                  These maps show significant changes in the number of cars in
                  the parking lots of shopping malls such as the Burbank Empire
                  Shopping Mall in California, where the parking lot of a
                  non-essential business had significant slowdown after closing
                  down, compared to a nearby business that was considered
                  essential and remained open.
                </p>
                <p>
                  Although changes in activity in parking lots are prominent in
                  the maps, SAR measurements also pick up other changes in human
                  activities, such as construction activity and the movement of
                  shipping containers.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/co2_april_1_20.png`}
              alt='CO2 Diff April 1'
            >
              The difference in carbon dioxide (CO<sub>2</sub>) levels from
              April 1, 2020 compared to previous years. Redder colors indicate
              increases in CO<sub>2</sub>. Bluer colors indicate lower levels of
              CO<sub>2</sub>. Image Credit: NASA
            </MediaImage>
          </Gridder>
        </InterpretDataFold>

        <CreditsFold>
          <Gridder>
            <InpageHGroup title='Credits' dashColor={metadata.color} />
            <Prose>
              <ul>
                <li>ARIA at NASA-JPL</li>
                <li>Caltech EOS at Nanyang Technological University</li>
              </ul>
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
              <ul>
                <li>
                  <a
                    href='https://earthdata.nasa.gov/learn/what-is-sar'
                    target='_blank'
                    rel='noopener noreferrer'
                    title='View more'
                  >
                    What is Synthetic Aperture Radar?
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

CarsAndConstructionLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: CarsAndConstructionLongForm
};
