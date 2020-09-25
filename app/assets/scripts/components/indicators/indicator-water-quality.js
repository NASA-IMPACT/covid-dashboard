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
import { glsp } from '../../styles/utils/theme-values';
import { IntroLead } from '../../styles/datasets';

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
      grid-column: full-start / content-7;
      grid-row: 1;
    `}

    figcaption {
      ${media.mediumUp`
        /* Image has a white border which must be taken into account. */
        margin-top: -${glsp()};
      `}
    }
  }

  ${FoldDetails} {
    grid-column: content-start / content-end;
    text-align: left;

    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-7 / content-end;
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

    ${media.mediumUp`
      grid-column: content-start / content-7;
    `}

    ${media.largeUp`
      grid-column: content-start / content-9;
    `}
  }

  ${Prose} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-start / content-7;
    `}

    ${media.largeUp`
      grid-column: content-start / content-9;
    `}
  }
`;

const InterpretingDataFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-start / content-7;
    `}

    ${media.largeUp`
      grid-column: content-5 / content-13;
    `}
  }

  ${Prose} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-start / content-7;
    `}

    ${media.largeUp`
      grid-column: content-5 / content-end;
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
      grid-column: content-start / content-9;
    `}
  }

  ${Prose} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-start / content-8;
    `}

    ${media.largeUp`
      grid-column: content-start / content-9;
    `}
  }
`;

const metadata = {
  id: 'water-quality',
  name: 'Water Quality',
  color: indicatorGroupColors['water-quality'].color
};

class WQLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <LeadFold>
          <Gridder>
            <IntroLead>
              Human activity greatly influences water quality. Runoff from
              agriculture and cities can overload coastal waters with excess
              nutrients, ships in ports and other waterways can mix up sediment
              and increase turbidity, and even air pollution can end up in our
              water.
            </IntroLead>
          </Gridder>
        </LeadFold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>
                <p>
                  As lockdown restrictions were put into place around the world
                  in response to the novel coronavirus, the immediate reduction
                  in vehicle and ship traffic led to noticeable improvements in
                  our air quality. Now, researchers are looking to see if those
                  same benefits will be reflected in our water.
                </p>
                <p>
                  Scientists are examining whether the amount of algae
                  (chlorophyll-a) and sediment (turbidity) in water bodies was
                  affected by the shutdowns in response to the COVID-19
                  pandemic. However, teasing out those signals from normal
                  variations due to weather and economic changes is challenging.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/water-quality-chlorophyll-a-sf.png`}
              alt='Chlorophyll-a anomaly percentage'
            >
              Chlorophyll-a is an indicator of algae growth. During
              coronavirus-related shutdowns, changes in our activity may
              affect the amount of nutrients flowing into water bodies. This
              image shows the changes in chlorophyll-a for the San Francisco
              Bay Area on April 3, 2020. Redder colors indicate higher levels
              of chlorophyll-a and worse water quality. Bluer colors indicate
              lower levels of chlorophyll-a and improved water quality. Image
              Credit: NASA.
            </MediaImage>
          </Gridder>
        </IntroFold>

        <ResearchFold>
          <Gridder>
            <InpageHGroup
              title='Scientific research'
              dashColor={metadata.color}
            />
            <Prose>
              <p>
                To determine the effect that COVID-19 lockdowns may have on
                global water quality, NASA is using satellite data and imagery
                from the Moderate Resolution Imaging Spectroradiometer (MODIS)
                instrument aboard the Aqua satellite and imagery from the
                NASA-U.S. Geological Survey Landsat satellites to look for
                changes in chlorophyll or turbidity.
              </p>
              <p>
                <a
                  href='https://science.nasa.gov/earth-science/rrnes-awards/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  New research
                </a>{' '}
                funded by NASA’s Rapid Response and Novel research in the Earth
                Sciences (RRNES) program element is also using these data to
                explore changes in water quality resulting from the shutdowns.
              </p>
            </Prose>
          </Gridder>
        </ResearchFold>

        <InterpretingDataFold>
          <Gridder>
            <InpageHGroup
              title='Interpreting the data'
              dashColor={metadata.color}
            />
            <Prose>
              <p>
                Both chlorophyll-a concentrations and turbidity fluctuate
                naturally based on a variety of factors, including natural
                geography and the weather. For example, in coastal areas
                strongly influenced by river runoff and human activities, such
                as shipping and tourism, higher chlorophyll-a concentration can
                result from the discharge of urban sewage and fertilizers from
                agriculture over the watershed, which could counter any effects
                we may have seen due to the shutdowns.
              </p>
              <p>
                Therefore, these data must be interpreted cautiously before
                drawing conclusions on how COVID-19 shutdowns may have affected
                water quality.
              </p>
            </Prose>
          </Gridder>
        </InterpretingDataFold>
        <AdditionalResourcesFold>
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
                    href='https://aqua.nasa.gov/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aqua Satellite
                  </a>
                </li>
                <li>
                  <a
                    href='https://landsat.gsfc.nasa.gov/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Landsat Satellite
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

WQLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: WQLongForm
};
