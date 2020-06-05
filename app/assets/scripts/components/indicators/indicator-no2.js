import React from 'react';
import styled from 'styled-components';
import ReactCompareImage from 'react-compare-image';

import Prose from '../../styles/type/prose';
import Constrainer from '../../styles/constrainer';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold, FoldDetails } from '../../styles/fold';
import {
  IntroLead
} from '../../styles/datasets';
import MediaImage from '../../styles/media-image';

import { glsp, _rgba } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import config from '../../config';

const { baseUrl } = config;

const MediaCompare = styled.figure`
  /* Trying to style a bad structured plugin... */
  > div {
    > div:nth-child(3) > div:nth-child(2) {
      background-color: ${themeVal('color.primary')};
      width: 3rem;
      height: 3rem;
    }

    > div:nth-child(4) > div:nth-child(1),
    > div:nth-child(5) > div:nth-child(1) {
      border-radius: ${themeVal('shape.rounded')};
      background-color: ${_rgba(themeVal('color.baseDark'), 0.64)} !important;
    }
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp()};
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.5rem;
    max-width: 30rem;
  }
`;

const IntroFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaCompare} {
    grid-column: full-start / content-8;
    grid-row: 1;
  }

  ${FoldDetails} {
    grid-column: content-8 / content-end;
    text-align: left;
  }
`;

const FactsFold = styled(Fold)`
  padding-bottom: ${glsp(6)};

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
  }
`;

const CreditsFold = styled(FactsFold)`
  padding-bottom: 0;

  ${Prose} {
    grid-column: content-start / content-7;
  }
`;

const InterpretDataFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaImage} {
    grid-column: content-start / content-8;
    grid-row: 1;

    figcaption {
      max-width: 30rem;
    }
  }

  ${FoldDetails} {
    grid-column: content-8 / content-end;
    text-align: left;
  }
`;

const metadata = {
  id: 'no2',
  name: 'Nitrogen Dioxide',
  color: '#2276AC'
};

class NO2LongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Fold>
          <Constrainer>
            <IntroLead>
              Since the onset of COVID-19, atmospheric concentrations of nitrogen dioxide have changed by as much as 60% in some regions.
            </IntroLead>
          </Constrainer>
        </Fold>

        <IntroFold>
          <Gridder>
            <FoldDetails>
              <Prose>
                <p>
                  NO<sub>2</sub> is a common air pollutant primarily emitted from the burning of fossil fuels in cars,
                  power plants and industrial facilities. Lower to the ground, NO2 can directly irritate peoples&apos;
                  lungs and contributes to the production of particulate pollution and smog when it reacts with sunlight.
                </p>
                <p>
                  During the COVID-19 pandemic, scientists observed considerable decreases in NO<sub>2</sub> levels
                  around the world. These decreases are predominantly associated with changing human behavior in
                  response to the spread of COVID-19. As communities worldwide have implemented lockdown restrictions
                  in an attempt to stem the spread of the virus, the reduction in human transportation activity has
                  resulted in less NO2 emitted into the atmosphere.
                </p>
                <p>
                  These changes are particularly apparent over large urban areas and economic corridors, which
                  typically have high levels of automobile traffic, airline flights, and other related activity.
                </p>
                <p>
                  NASA has been able to observe subsequent rebounds in nitrogen dioxide as the lockdown restrictions ease.
                </p>
              </Prose>
            </FoldDetails>
            <MediaCompare>
              <ReactCompareImage
                leftImage={`${baseUrl}/assets/graphics/content/east_coast_mar_avg.jpg`}
                leftImageAlt='NO2 over South America'
                leftImageLabel='March 2015-2019 Avg.'
                rightImage={`${baseUrl}/assets/graphics/content/east_coast_mar_20.jpg`}
                rightImageAlt='NO2 over South America'
                rightImageLabel='March 2020'
              />
              <figcaption>
              NO2 levels fell by as much as 30% over much of the Northeast U.S. Credit: NASA Scientific Visualization Studio
              </figcaption>
            </MediaCompare>
          </Gridder>
        </IntroFold>

        <FactsFold>
          <Gridder>
            <InpageHGroup
              title='Scientific Research'
              dashColor={metadata.color}
            />
            <Prose numColumns={2}>
              <p>
                <a href='https://airquality.gsfc.nasa.gov/'>Ongoing research</a> by
                scientists in the Atmospheric Chemistry and Dynamics Laboratory at NASA’s
                Goddard Space Flight Center and <a href='https://science.nasa.gov/earth-science/rrnes-awards'>new research</a> funded
                by NASA&apos;s Rapid Response and Novel research in the Earth Sciences
                (RRNES) program element seek to better understand the atmospheric effects
                of the COVID-19 shutdowns.
              </p>
              <p>
                For nitrogen dioxide levels related to COVID-19, NASA uses data collected
                by the joint NASA/Royal Netherlands Meteorological Institute (KNMI) <a href='https://aura.gsfc.nasa.gov/omi.html'>Ozone Monitoring Instrument (OMI)</a> aboard
                the Aura satellite, as well as data collected by the Tropospheric
                Monitoring Instrument (TROPOMI) aboard the European Commission’s Copernicus
                Sentinel-5P satellite, built by the European Space&nbsp;Agency.
              </p>
              <p>
                OMI, which launched in 2004, is the predecessor to TROPOMI. Although TROPOMI,
                which launched in 2017, provides higher resolution information, the longer
                OMI data record provides good context for the current TROPOMI observations.
              </p>
              <p>
                Scientists will be using these data to investigate how travel bans and lockdown
                orders related to COVID-19 are impacting regional air quality and chemistry, as
                well as why these restrictions may be having inconsistent effects on air quality
                around the world.
              </p>
            </Prose>
          </Gridder>
        </FactsFold>

        <InterpretDataFold>
          <Gridder>
            <FoldDetails>
              <InpageHGroup
                title='Interpreting the Data'
                dashColor={metadata.color}
              />
              <Prose>
                <p>
                  Each spotlight city has a slider for turning nitrogen dioxide data on and off. The darker purple
                  indicates higher levels of nitrogen dioxide associated with increased travel and economic activity,
                  while the lighter blues indicate lower levels of NO2 and decreased activity.
                </p>
                <p>
                  Nitrogen dioxide has a relatively short lifetime in the atmosphere. Once it is emitted, it lasts
                  only a few hours before it dissipates, so it does not travel far from its source.
                </p>
                <p>
                  Because nitrogen dioxide is primarily emitted from burning fossil fuels, changes in its
                  atmospheric concentration can be related to changes in human activity if the data are properly
                  processed and interpreted.
                </p>
                <p>
                  However, care must be taken when interpreting satellite NO 2 data, as the quantity observed by
                  satellite is not exactly the same as the abundance at ground level, and natural variations in
                  weather (e.g., temperature, wind speed, solar intensity) influence the amount of NO 2 in the
                  atmosphere. In addition, the OMI and TROPOMI instruments cannot observe the NO 2
                  abundance underneath clouds. For more information on processing and cautions related to
                  interpreting this data, please <a href='https://airquality.gsfc.nasa.gov/caution-interpretation'>click here</a>.
                </p>
                <p>
                  Scientists will be using this data to investigate how travel bans and lockdown orders related to COVID-19 are impacting regional air quality and chemistry.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/no2_south_america.png`}
              alt='NO2 over South America'
            >
              NO2 levels over South America from the Ozone Monitoring Instrument. The dark green areas in the northwest indicate areas of no data, most likely associated with cloud cover or snow.
            </MediaImage>
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
                Nitrogen dioxide data courtesy of NASA Goddard Space Flight Center&apos;s <a href='https://science.gsfc.nasa.gov/earth/acd/'>Atmospheric Chemistry and Dynamics Laboratory</a> using OMI data from the Aura&nbsp;satellite.
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
              <p>NASA Features</p>
              <ul>
                <li><a href='https://earthobservatory.nasa.gov/images/146362/airborne-nitrogen-dioxide-plummets-over-china' target='_blank' rel='noopener noreferrer'>Airborne Nitrogen Dioxide Plummets Over China</a></li>
                <li><a href='https://earthobservatory.nasa.gov/blogs/earthmatters/2020/03/13/airborne-nitrogen-dioxide-decreases-over-italy/' target='_blank' rel='noopener noreferrer'>Airborne Nitrogen Dioxide Decreases Over Italy</a></li>
                <li><a href='https://www.nasa.gov/feature/goddard/2020/drop-in-air-pollution-over-northeast' target='_blank' rel='noopener noreferrer'>NASA Satellite Data Show 30 Percent Drop In Air Pollution Over Northeast U.S.</a></li>
                <li><a href='https://earthobservatory.nasa.gov/images/146596/airborne-particle-levels-plummet-in-northern-india' target='_blank' rel='noopener noreferrer'>Airborne Particle Levels Plummet in Northern India</a></li>
                <li><a href='https://www.nasa.gov/feature/goddard/2020/nasa-satellite-data-show-air-pollution-decreases-over-southwest-us-cities' target='_blank' rel='noopener noreferrer'>NASA Satellite Data Show Air Pollution Decreases over Southwest U.S. Cities</a></li>
                <li><a href='https://earthobservatory.nasa.gov/images/146741/nitrogen-dioxide-levels-rebound-in-china?utm_source=card_2&utm_campaign=home' target='_blank' rel='noopener noreferrer'>Nitrogen Dioxide Levels Rebound in China</a></li>
              </ul>
              <p>Explore the Data</p>
              <ul>
                <li><a href='https://earthdata.nasa.gov/learn/articles/feature-articles/health-and-air-quality-articles/find-no2-data' target='_blank' rel='noopener noreferrer'>How to Find and Visualize Nitrogen Dioxide Satellite Data</a></li>
                <li><a href='https://earthdata.nasa.gov/learn/pathfinders/covid-19' target='_blank' rel='noopener noreferrer'>COVID-19 Data Pathfinder</a></li>
                <li><a href='https://svs.gsfc.nasa.gov/4810' target='_blank' rel='noopener noreferrer'>Reductions in Nitrogen Dioxide Associated with Decreased Fossil Fuel Use Resulting from COVID-19 Mitigation </a></li>
              </ul>
              <p>Explore the Missions</p>
              <ul>
                <li><a href='https://aura.gsfc.nasa.gov/omi.html' target='_blank' rel='noopener noreferrer'>Ozone Monitoring Instrument (OMI)</a></li>
                <li><a href='http://tempo.si.edu/outreach.html' target='_blank' rel='noopener noreferrer'>Tropospheric Emissions: Monitoring of Pollution (TEMPO)</a></li>
                <li><a href='https://pandora.gsfc.nasa.gov/' target='_blank' rel='noopener noreferrer'>Pandora Project</a></li>
              </ul>
            </Prose>
          </Gridder>
        </FactsFold>
      </React.Fragment>
    );
  }
}

NO2LongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: NO2LongForm
};
