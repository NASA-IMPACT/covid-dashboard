import React from 'react';
import { Link } from 'react-router-dom';

export default {
  id: 'water-quality',
  name: 'Water Quality during the COVID-19 Pandemic',
  publishDate: '2020/12/01',
  chapters: [
    {
      id: 'water-quality-during-pandemic',
      name: 'Water Quality during the COVID-19 Pandemic',
      contentComp: (
        <>
          <p>
            While some researchers are teasing out the COVID-19 pandemic’s impact on <Link to='/stories/climate' title='Read how COVID affect the climate'>climate</Link> and <Link to='/stories/air-quality' title='Read how COVID affect the climate'>air quality</Link>, others are studying the effects it may have on water quality. Human activity greatly influences the quality of our water, and changes in our behavior during the COVID-19 pandemic may be beginning to affect local and regional water quality around the world. Runoff from agriculture and cities can overload coastal waters with excess nutrients, ships in ports and other waterways can mix up sediment and increase turbidity, and even air pollution can end up in our water. Although there are various indications that overall water quality is changing during pandemic-related lockdowns, the exact cause of these changes, as well as their long-term effect, are under investigation. Researchers are relying on satellite-based observations and on-the-ground validation to study global water quality during the COVID-19 pandemic.
          </p>
        </>
      )
    },
    {
      id: 'air-water-quality-and-covid',
      name: 'Ar Quality, Water Quality and COVID-19',
      contentComp: (
        <>
          <p>
            California was one of the first places in the United States to impose COVID-19 related restrictions. A shelter-in-place mandate went into effect for six counties in the San Francisco metropolitan area on March 17, 2020. NASA scientists are using satellite data to investigate the connection between observed changes in air quality during this time and water quality. Nitrogen compounds, commonly found in air pollutants, can contribute to the formation of algal blooms in water and also cause water bodies to become more acidic. Remote sensing observations have shown both the clearing of air and improvements in water quality during lockdowns, said Nima Pahlevan, a remote sensing scientist at NASA’s Goddard Space Flight Center. His research is using satellite data to detect anomalies in levels of algae (chlorophyll-a) and total suspended solids across multiple sites, including the San Francisco Bay. The lessons learned from this work will help inform similar work in other coastal cities at global scales.
          </p>
        </>
      )
    },
    {
      id: 'examining-the-chesapeake',
      name: 'Examining the Chesapeake Bay during COVID-19',
      contentComp: (
        <>
          <p>
            Teasing out the changes in chlorophyll-a and sediments (turbidity) due to COVID-related restrictions from normal variations due to weather and economic changes is challenging. Both chlorophyll-a concentrations and turbidity fluctuate based on a variety of factors, including natural geography and the weather. In coastal areas strongly influenced by human activities and agricultural practices, such as the Chesapeake Bay, higher chlorophyll-a concentrations can result from the discharge of urban sewage and fertilizers. In this case, any positive effects on water quality we may have seen from pandemic-related shutdowns may be hidden due to the effects from agricultural run-off.
          </p>
        </>
      )
    },
    {
      id: 'shades-of-green',
      name: 'Shades of Green in the Great Lakes',
      contentComp: (
        <>
          <p>
            Researchers are using NASA’s ocean color satellites to observe similar changes in water quality within the Great Lakes region. The Great Lakes is home to about 8% of the U.S. population, and the region produces approximately $14.5 billion in agricultural sales each year. From April to June 2020, researchers observed slight increases in chlorophyll and suspended sediment concentrations in the Western Basin of Lake Erie, the portion of the lake most affected by humans and agriculture, compared to the baseline average from 2010 to 2019. However, scientists are still unsure whether these changes are due to COVID-19 related behavioral changes, since they still fall within the historical range of chlorophyll and suspended sediment levels in the lake. Research is ongoing to determine what effects may be seen in the Great Lakes during the COVID-19 pandemic.
          </p>
        </>
      )
    },
    {
      id: 'glamrous-tool',
      name: 'A GLAMorous Tool to Assess COVID\'s Effects',
      contentComp: (
        <>
          <p>
            As we’ve seen, agriculture and water are inherently linked. However, during this time, scientists are not only examining agriculture’s impact on water quality, but also using remote sensing tools to ensure crops have adequate access to water and other key nutrients during social distancing measures. To do this, new groups have begun leveraging the Group on Earth Observations Global Agricultural Monitoring (GEOGLAM) tool. Typically used to increase agricultural market transparency and bolster food security by producing timely, actionable information on agricultural conditions, GEOGLAM has been used during the pandemic to safely monitor and track agricultural conditions when local curfews and stay-at-home orders have prevented people from performing these duties on the ground. For example, the Togolese government has used GEOGLAM during the pandemic to safely track agricultural conditions throughout the country and distribute much-needed aid to small farmers.
          </p>
        </>
      )
    },
    {
      id: 'counting-crops',
      name: 'Counting Crops During a Lockdown',
      contentComp: (
        <>
          <p>
            COVID-19 lockdown policies have also made it harder for officials from the U.S. Department of Agriculture (USDA) to travel to farms and collect information about crop planting, progress, and conditions like adequate soil moisture. Especially in cases where ground data is inaccessible, information provided by Earth observing satellites has been critical to filling in agricultural data gaps. Hannah Kerner, an assistant research professor at the University of Maryland in College Park, and her team at NASA Harvest are using satellite data from the joint NASA-U.S. Geological Survey Landsat satellite, the ESA (the European Space Agency) Copernicus Sentinel-2 satellite, and the NASA Moderate Resolution Imaging Spectroradiometer (MODIS) instruments aboard its Terra and Aqua satellites to help supplement USDA’s information. They are also using commercial partner Planet’s high-resolution, space-based imagery. "We're using satellite data and machine learning to map where and which crops are growing," Kerner said. Specifically, they’re monitoring key commodity crops that have high impacts on markets and food security, including corn and soybeans in the U.S. (pictured here) and winter wheat in Russia.
          </p>
        </>
      )
    },
    {
      id: 'understanding-impacts-venetian-lagoon',
      name: 'Understanding Impacts on the Venetian Lagoon',
      contentComp: (
        <>
          <p>
            Other human activities, such as tourism, also affect water quality. During the COVID-19 pandemic, the Venice Lagoon has experienced improved water clarity because of reduced tourism and boat traffic. However, in other places that experienced similar declines in tourism, such as Belize, these changes are not as readily apparent.
          </p>
        </>
      )
    },
    {
      id: 'water-quality-belize',
      name: 'Monitoring Water Quality in Belize',
      contentComp: (
        <>
          <p>
            Robert Griffin, a professor at the University of Alabama in Huntsville, and his team are studying how decreased tourism is impacting urban and agricultural sources of pollutants, such as nitrogen and phosphorus, on water quality off the coast of Belize. In addition to on-the-ground data, the team is using Landsat images to observe how the pandemic is affecting land-use changes, which, in turn, affect how many pollutants are produced and able to reach water bodies and ecosystems. Griffin is also using MODIS and VIIRS data to monitor water quality. He and his team are working with Belize government officials to help guide coastal marine development for the upcoming five years. “This research could provide guidance for land-use planners as they determine how to deal with urban non-point sources of pollution,” like nutrients and sediments that end up in the water and impact coral reef systems, Griffin said.
          </p>
        </>
      )
    },
    {
      id: 'everything-is-connected',
      name: 'Everything is connected',
      contentComp: (
        <>
          <p>
            During the COVID-19 pandemic, scientists will continue to use remote sensing data to observe any changes in water quality due to changes in human behavior.
          </p>
        </>
      )
    }
  ]
};
