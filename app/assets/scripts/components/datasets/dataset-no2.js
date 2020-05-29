import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Prose from '../../styles/type/prose';
import Constrainer from '../../styles/constrainer';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import Button from '../../styles/button/button';
import { Fold } from '../../styles/fold';
import MediaImage from '../../styles/media-image';
import {
  IntroLead,
  IntroDescription,
  StatsFold,
  StatsHeader,
  StatsList
} from '../../styles/datasets';

import { glsp } from '../../styles/utils/theme-values';
import Heading from '../../styles/type/heading';

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

        <FactsFold>
          <Gridder>
            <Prose numColumns={2}>
              <p>
                Nitrogen dioxide (NO2) is a common air pollutant primarily emitted from the burning of fossil fuels
                in cars and power plants. Lower to the ground, nitrogen dioxide can directly irritate peoples’ lungs
                and contributes to the production of particulate pollution and smog when it reacts with sunlight.
              </p>
              <p>
                During the COVID-19 pandemic, scientists have observed considerable decreases in nitrogen
                dioxide levels around the world. These decreases are predominantly associated with changing
                human behavior in response to the spread of COVID-19. As communities worldwide have
                implemented travel restrictions in an attempt to stem the spread of the virus, the reduction in
                human transportation activity has resulted in less NO 2 being emitted into the atmosphere.
              </p>
              <p>
                These changes are particularly apparent over large urban areas and economic corridors, which
                typically have high levels of automobile traffic, airline flights, and other related activity.
              </p>
              <p>
                NASA is also able to observe subsequent rebounds in nitrogen dioxide as the lockdown
                restrictions ease.
              </p>
            </Prose>
          </Gridder>
        </FactsFold>

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
                by NASA’s Rapid Response and Novel research in the Earth Sciences
                (RRNES) program element seek to better understand the atmospheric effects
                of the COVID-19 shutdowns.
              </p>
              <p>
                For nitrogen dioxide levels related to COVID-19, NASA uses data collected
                by the joint NASA/Royal Netherlands Meteorological Institute (KNMI) <a href='https://aura.gsfc.nasa.gov/omi.html'>Ozone Monitoring Instrument (OMI)</a> aboard
                the Aura satellite, as well as data collected by the Tropospheric
                Monitoring Instrument (TROPOMI) aboard the European Commission’s Copernicus
                Sentinel-5P satellite, built by the European Space Agency.
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

        <FactsFold>
          <Gridder>
            <InpageHGroup
              title='Interpreting the Data'
              dashColor={metadata.color}
            />
            <Prose numColumns={2}>
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
