import React from 'react';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold } from '../../styles/fold';
import MediaImage from '../../styles/media-image';
import media from '../../styles/utils/media-queries';

import Heading from '../../styles/type/heading';
import config from '../../config';
import { indicatorGroupColors } from '../../styles/theme/theme';

const { baseUrl } = config;

const IntroFold = styled(Fold)`
  padding-bottom: 0;

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

const InterpretingDataFold = styled(Fold)`
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
  id: 'water-quality',
  name: 'Water Quality',
  color: indicatorGroupColors['water-quality'].color
};

class WQLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <IntroFold>
          <Gridder>
            <Prose>
              <p>
                Images of the Earth at night give us an extraordinary view of
                human activity over time. The nighttime environment illuminates
                Earth features like city infrastructure, lightning flashes,
                fishing boats navigating open water, gas flares, aurora, and
                natural hazards like lava flowing from an active volcano. Paired
                with the moonlight, researchers can also spot snow and ice, as
                well as other reflective surfaces that allow nighttime land and
                ocean analysis.
              </p>
              <p>
                During the COVID-19 pandemic, researchers are using night light
                observations to track variations in energy use, migration, and
                transportation in response to social distancing and lockdown
                measures.
              </p>
              <p>
                Scientists are examining whether the amount of algae
                (chlorophyll-a) and sediment (turbidity) in water bodies was
                affected by the shutdowns in response to the COVID-19 pandemic.
                However, teasing out those signals from normal variations due to
                weather and economic changes is challenging.
              </p>
              <MediaImage
                src={`${baseUrl}/assets/graphics/content/water-quality-chlorophyll-a-sf.png`}
                alt='Wuhan Before and After'
              >
                <figcaption>
                  Chlorophyll-a is an indicator of algae growth. During
                  coronavirus-related shutdowns, changes in our activity may
                  affect the amount of nutrients flowing in water bodies. This
                  image shows the changes in chlorophyll-a for the San Francisco
                  Bay Area on April 3, 2020. Redder colors indicate higher
                  levels of chlorophyll-a and worse water quality. Bluer colors
                  indicate lower levels of chlorophyll-a and improved water
                  quality. Image Credit: NASA.
                </figcaption>
              </MediaImage>
            </Prose>
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
                To determine the effect that COVID-19 lockdowns may have had on
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
              title='Interpreting the Data'
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
