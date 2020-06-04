import React from 'react';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Constrainer from '../../styles/constrainer';
import { Fold } from '../../styles/fold';

const BMProse = styled(Prose)`
  grid-row: 1;
  grid-column: span 8;
`;

const metadata = {
  id: 'bm',
  name: 'Nightlights',
  color: '#2276AC'
};

class BMLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Fold>
          <Constrainer>
            <BMProse>
              <p>
                In addition to their beauty, the images produced from NASA’s Nightlights products gives us an extraordinary view of
                human activity over time. NASA’s Nightlights products contribute valuable information to help track changes in human
                activity during the pandemic, and they are vital to ongoing research on urbanization and human development, light
                pollution, illegal fishing, fires, and disaster impact and recovery.
              </p>
              <p>
                Satellite-derived nighttime lights are derived from data collected by the Visible Infrared Radiometer Suite (VIIRS)
                Day/Night Band (DNB) on the Suomi-National Polar-Orbiting Partnership (Suomi-NPP) platform, a joint NOAA (National
                Oceanic and Atmospheric Administration) and NASA satellite. The data is calibrated across time, validated against
                ground measurements, and includes science-quality indicators to effectively track changes by removing clouds, stray
                light from snow, the Moon, and other extraneous sources.
              </p>
              <p>
                The products featured are the 500-meter (VNP46) and the 30-meter Nightlights High Definition (HD) nighttime lights.
                Here, the Nightlights HD downscales radiances from the 500-meter product to the street level using optical imagery
                from Landsat 8, a NASA and USGS (United States Geological Survey) satellite, along with OpenStreetMap ancillary layers.
                This helps visualize neighborhoods and commercial centers that have less activity – or closures – due to social
                distancing restrictions.
              </p>
              <p>
                For more information, please visit the Nightlights website at <a href='https://blackmarble.gsfc.nasa.gov/'>blackmarble.gsfc.nasa.gov</a>.
              </p>
            </BMProse>
          </Constrainer>
        </Fold>
      </React.Fragment>
    );
  }
}

BMLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: BMLongForm
};
