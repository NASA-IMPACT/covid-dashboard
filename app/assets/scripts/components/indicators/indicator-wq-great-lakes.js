import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Prose from '../../styles/type/prose';
import Gridder from '../../styles/gridder';
import { Fold } from '../../styles/fold';
import media from '../../styles/utils/media-queries';

import { indicatorGroupColors } from '../../styles/theme/theme';

const IntroFold = styled(Fold)`
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
  id: 'water-quality-gl',
  name: 'WQ Great Lakes',
  color: indicatorGroupColors['water-quality'].color
};

class WQGLLongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <IntroFold>
          <Gridder>
            <Prose>
              <p>
                As human activity levels shift in accordance with social distancing measures during the COVID-19 pandemic, researchers are using NASA’s ocean color satellites to observe potential changes in water quality within the Great Lakes region that might occur as a result of the shutdowns. Specifically, scientists are comparing how regions of the lakes (e.g., the Western Basin of Lake Erie and Saginaw Bay in Lake Huron) typically impacted by human activity fare against more remote, pristine regions (e.g., Thunder Bay in Lake Huron) that are relatively untouched by society. These comparisons will help determine whether any observed changes during the pandemic are due to shifts in human activity or natural variation.
              </p>
              <p>
                The immediate impact on water quality is difficult to assess because both chlorophyll concentrations (how much phytoplankton are in the water) and turbidity (the amount of suspended sediment) fluctuate naturally based on a variety of factors, such as natural geography and weather. For example, in coastal areas strongly influenced by river runoff and human activities, such as the Great Lakes, higher chlorophyll concentration can result from the discharge of urban sewage and fertilizers from agriculture over the watershed, which could counter any effects we may have seen due to the shutdowns. Therefore, these data must be cautiously interpreted before drawing conclusions on the impact of COVID-19 shutdowns on water quality.
              </p>
              <p>
                The Great Lakes region is home to bustling ports, vast agricultural lands, and millions of people. Because of this, researchers are curious to explore whether the sudden changes in human activity during the pandemic can be detected in data from Earth observing satellites.
              </p>
              <p>
                Ohio and Michigan, which border the Great Lakes, issued shelter-in-place orders in mid-March. As a result, most people remained at home. With people housebound, the typical drivers of water quality in the Great Lakes region shifted. For instance, idle factories and reduced commuter traffic caused changes in thermal and carbon outputs, which, in turn, could affect the growth of phytoplankton (chlorophyll). Additionally, changes in{' '}
                <Link to='/indicators/agriculture'>agriculture</Link>,{' '}
                <Link to='/indicators/shipping'>ship traffic</Link>{' '}
                and even whether sewage is predominantly coming from residential or commercial sources during the shutdown could also affect the amount of nutrients and sediment entering the Great Lakes ecosystem.
              </p>
              <p>
                From April through June, researchers have observed slight increases in chlorophyll and suspended sediment concentrations in the Western Basin of Lake Erie compared to the baseline average from 2010 to 2019. However, scientists are still unsure whether these are due to COVID-19 related changes because they still fall within the historical range of chlorophyll and suspended sediment levels in the lake.
              </p>
              <p>
                Research will be ongoing to determine what effects may be seen in the Great Lakes during the COVID-19 pandemic. Satellite-based water quality retrievals of Lake Erie will be validated using on-the-ground observations conducted weekly by NOAA’s Great Lakes Ecological Research Laboratory (GLERL) and updated on a monthly basis.
              </p>
            </Prose>
          </Gridder>
        </IntroFold>
      </React.Fragment>
    );
  }
}

WQGLLongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: WQGLLongForm
};
