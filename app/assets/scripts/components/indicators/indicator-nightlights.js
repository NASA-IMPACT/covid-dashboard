import React from 'react';
import styled from 'styled-components';
import ReactCompareImage from 'react-compare-image';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import { Fold, FoldDetails } from '../../styles/fold';
import MediaImage, { MediaCompare } from '../../styles/media-image';

import { glsp } from '../../styles/utils/theme-values';
import config from '../../config';

const { baseUrl } = config;

const IntroFold = styled(Fold)`
  padding-bottom: 0;

  ${Prose} {
    grid-column: content-start / content-10;
  }
`;

const ResearchFold = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaImage} {
    grid-column: content-8 / full-end;
    grid-row: 1;
  }

  ${FoldDetails} {
    grid-column: content-start / content-8;
    text-align: left;
  }
`;

const DataFold = styled(Fold)`
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

const metadata = {
  id: 'bm',
  name: 'Nighttime Lights',
  color: '#2276AC'
};

class BMLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <IntroFold>
          <Gridder>
            <Prose>
              <p>
                Images of the Earth at night give us an extraordinary view of human activity over time. The nighttime environment illuminates Earth features like city infrastructure, lightning flashes, fishing boats navigating open water, gas flares, aurora, and natural hazards like lava flowing from an active volcano. Paired with the moonlight, researchers can also spot snow and ice, as well as other reflective surfaces that allow nighttime land and ocean analysis.
              </p>
              <p>
                During the COVID-19 pandemic, researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and lockdown measures.
              </p>
            </Prose>
          </Gridder>
        </IntroFold>

        <ResearchFold>
          <Gridder>
            <FoldDetails>
              <InpageHGroup
                title='Scientific Research'
                dashColor={metadata.color}
              />
              <Prose>
                <p>
                  Nightlights data are collected by the <a href='https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/viirs/'> Visible Infrared Radiometer Suite (VIIRS) Day/Night Band (DNB)</a> on the Suomi-National Polar-Orbiting Partnership (Suomi-NPP) platform, a joint NOAA (National Oceanic and Atmospheric Administration) and NASA satellite. The images are produced by <a href='https://blackmarble.gsfc.nasa.gov/'> NASA’s Black Marble</a> products suite.
                  All data are calibrated daily, corrected, and validated with ground measurements for science-ready analysis.
                </p>
                <p>
                  <a href='https://science.nasa.gov/earth-science/rrnes-awards'>New research</a> funded by NASA’s Rapid Response and Novel Research in the Earth Sciences
                  (RRNES) program seeks to better understand what nightlights can tell us
                  about the impacts of COVID-19.
                </p>
              </Prose>
            </FoldDetails>
            <MediaImage
              src={`${baseUrl}/assets/graphics/content/wuhan_bef_after.png`}
              alt='Wuhan Before and After'
            />
          </Gridder>
        </ResearchFold>

        <DataFold>
          <Gridder>
            <FoldDetails>
              <InpageHGroup
                title='Interpreting the Data'
                dashColor={metadata.color}
              />
              <Prose>
                <p>
                  Each spotlight city has a slider for turning night lights on and off. The
                  darker purple indicates fewer night lights while the lighter yellow
                  indicates more night lights. By comparing regions before and after
                  guidelines to shelter-in-place began, researchers are able to visualize
                  the extent to which social distancing measures impacted various economic
                  activities based on whether or not light pollution increased or decreased,
                  which highways were shut down, and which cities stayed the same.
                </p>
                <p>
                  The products featured are 500-meter (VNP46) and 30-meter Black Marble
                  High Definition (HD) nighttime lights. Black Marble HD downscales radiances
                  from the 500-meter product to street level using optical imagery from
                  Landsat 8, a NASA and USGS (U.S. Geological Survey) satellite, along with
                  OpenStreetMap ancillary layers. This helps visualize neighborhoods and
                  commercial centers that have less activity – or closures – due to social
                  distancing restrictions.
                </p>
              </Prose>
            </FoldDetails>
            <MediaCompare>
              <ReactCompareImage
                leftImage={`${baseUrl}/assets/graphics/content/hubei_vir_before.png`}
                leftImageAlt='Hubei'
                leftImageLabel='Before'
                rightImage={`${baseUrl}/assets/graphics/content/hubei_vir_after.png`}
                rightImageAlt='Hubei'
                rightImageLabel='After'
              />
            </MediaCompare>
          </Gridder>
        </DataFold>

        <CreditsFold>
          <Gridder>
            <InpageHGroup
              title='Credits'
              dashColor={metadata.color}
            />
            <Prose>
              <p>
                Black Marble data courtesy of Universities Space Research Association (USRA)
                Earth from Space Institute (EfSI) and NASA Goddard Space Flight Center&apos;s
                Terrestrial Information Systems Laboratory using VIIRS day-night band data
                from the Suomi National Polar-orbiting Partnership and Landsat-8 Operational
                Land Imager (OLI) data from the U.S. Geological Survey.
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
                <li><a href='https://earthobservatory.nasa.gov/images/146481/nighttime-images-capture-change-in-china' target='_blank' rel='noopener noreferrer'>Nighttime Images Capture Change In China </a></li>
              </ul>
              <p>Explore the Data</p>
              <ul>
                <li><a href='https://earthdata.nasa.gov/learn/articles/feature-articles/nighttime-images-wuhan' target='_blank' rel='noopener noreferrer'>Nighttime Images Show Changes In Human Activity</a></li>
              </ul>
              <p>Explore the Missions</p>
              <ul>
                <li><a href='https://blackmarble.gsfc.nasa.gov/' target='_blank' rel='noopener noreferrer'>NASA’s Black Marble</a></li>
                <li><a href='https://www.nasa.gov/mission_pages/NPP/main/index.html' target='_blank' rel='noopener noreferrer'>Suomi National Polar-orbiting Partnership (Suomi NPP)</a></li>
              </ul>
            </Prose>
          </Gridder>
        </FactsFold>
      </React.Fragment>
    );
  }
}

BMLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: BMLongForm
};
