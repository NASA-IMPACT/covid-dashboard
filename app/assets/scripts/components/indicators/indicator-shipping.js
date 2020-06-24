import React from 'react';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold, FoldDetails } from '../../styles/fold';
import MediaImage from '../../styles/media-image';
import media from '../../styles/utils/media-queries';

import Heading from '../../styles/type/heading';
import config from '../../config';
import { indicatorGroupColors } from '../../styles/theme/theme';
import { IntroLead } from '../../styles/datasets';
import { glsp } from '../../styles/utils/theme-values';

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
      grid-column: content-2 / content-7;
    `}

    ${media.largeUp`
      grid-column: content-8 / full-end;
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
      grid-column: content-start / content-8;
    `}
  }
`;

const ApproachFold = styled(Fold)`
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

const InterpretingDataFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaImage} {
    grid-column: full-start / full-end;

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

const AdditionalResourcesFold = styled(Fold)`
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
  id: 'shipping',
  name: 'Shipping',
  color: indicatorGroupColors.economic.color
};

class ShippingLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <LeadFold>
          <Gridder>
            <IntroLead>
              Travel restrictions and lockdown measures have disrupted the
              shipping industry and the global economy broadly. NASA researchers
              are using artificial intelligence to track shipping activities
              across major ports in the U.S.
            </IntroLead>
          </Gridder>
        </LeadFold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>
                <p>
                  Supply chains around the world dependent on cargo shipping
                  have been interrupted by travel restrictions and quarantines
                  designed to stop the spread of the novel coronavirus. Many
                  ports are closed, shipments have been canceled, and, in some
                  locations, altered shipping routes have prevented the
                  efficient movement of cargo.
                </p>
                <p>
                  NASA researchers are using cutting-edge artificial
                  intelligence technology and high-resolution satellite imagery
                  from Planet Labs to track shipping activity at major U.S.
                  ports during the novel coronavirus pandemic. This data will
                  help quantify the level of shipping-related economic activity
                  over time and could eventually contribute to our understanding
                  of the environmental implications of global decreases in
                  shipping on key air pollutants like nitrogen dioxide (NO
                  <sub>2</sub>) and sulphur dioxide (SO<sub>2</sub>).
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/indicators/la-ship.png`}
              alt='Shiping detection in Los Angeles'
            >
              <figcaption>
                Los Angeles has the busiest port in the United States, which
                this year saw a 19% reduction in shipping cargo volumes compared
                to 2019, according to the Port of Los Angeles. Image Credit:
                Planet Labs, NASA.
              </figcaption>
            </MediaImage>
          </Gridder>
        </IntroFold>
        <ApproachFold>
          <Gridder>
            <InpageHGroup title='Approach' dashColor={metadata.color} />
            <Prose>
              <p>
                NASA’s Interagency Implementation and Advanced Concepts Team
                (IMPACT), based at NASA’s Marshall Space Flight Center in
                Huntsville, Alabama, trained an algorithm using supervised
                machine learning techniques to detect ships on PlanetScope
                images. The algorithm detects a ship on the image and geolocates
                it. The NASA team has also built an Application Programming
                Interface (API) that allows ship detections to be aggregated
                across a port area for a given day. Efforts are also underway to
                conduct a study of ship detections in U.S. ports during the
                period of pandemic travel restrictions, as compared to the same
                period of time in previous years.
              </p>
            </Prose>
          </Gridder>
        </ApproachFold>
        <InterpretingDataFold>
          <Gridder>
            <FoldDetails>
              <InpageHGroup
                title='Interpreting Data'
                dashColor={metadata.color}
              />
              <Prose>
                <p>
                  NASA researchers have access to the high-resolution imagery
                  from Planet Labs, through the Commercial SmallSat Data
                  Acquisition Program (
                  <a
                    href='https://earthdata.nasa.gov/esds/small-satellite-data-buy-program'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    CSDAP
                  </a>
                  ), which acquires data from commercial sources that support
                  NASA&apos;s Earth science research goals. The PlanetScope
                  image resolution is 3 meters per pixel, which allows
                  researchers to get a detailed look at changes occurring on the
                  ground. Commercial small satellites also provide high temporal
                  resolution, making images available almost every day
                  (depending on cloud cover) for key areas of interest.
                </p>
                <p>
                  Ship detections will be provided daily, except when prevented
                  by significant cloud cover. After the machine learning model
                  detects the ships, a secondary human validation is also
                  performed before the detections are made available for the
                  dashboard.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/Pixabay_ship-4490857_1280.jpg`}
              alt='Container Ship'
            >
              <figcaption>
                Supply chains around the world dependent on cargo shipping have
                been interrupted by travel restrictions and quarantines designed
                to stop the spread of the novel coronavirus. Image Credit: NOAA.
              </figcaption>
            </MediaImage>
          </Gridder>
        </InterpretingDataFold>
        <CreditsFold>
          <Gridder>
            <InpageHGroup title='Credits' dashColor={metadata.color} />
            <Prose>
              <p>
                The CSDAP and IMPACT are elements of NASA’s Earth Science Data
                Systems program.
              </p>
            </Prose>
          </Gridder>
        </CreditsFold>
        <AdditionalResourcesFold>
          <Gridder>
            <InpageHGroup
              title='Additional resources'
              dashColor={metadata.color}
            />
            <Prose>
              <Heading as='h3' size='medium'>
                NASA Features
              </Heading>
              <ul>
                <li>
                  <a
                    href='https://earthobservatory.nasa.gov/images/80375/a-satellites-view-of-ship-pollution'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    A Satellite’s View of Ship Pollution
                  </a>
                </li>
                <li>
                  <a
                    href='https://earthdata.nasa.gov/esds/small-satellite-data-buy-program'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Commercial Smallsat Data Acquisition Program (CSDAP)
                  </a>
                </li>

              </ul>
            </Prose>
          </Gridder>
        </AdditionalResourcesFold>
      </React.Fragment>
    );
  }
}

ShippingLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: ShippingLongForm
};
