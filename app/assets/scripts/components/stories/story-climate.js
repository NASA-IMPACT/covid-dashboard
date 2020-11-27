import React from 'react';

export default {
  id: 'climate',
  name: 'Understanding the Long-Term Impacts of COVID-19 on Climate',
  publishDate: '2020/12/01',
  thumbnail: 'thumbnail-climate.jpg',
  chapters: [
    {
      id: 'climate-change-and-covid',
      name: 'Climate Change and COVID-19',
      contentComp: (
        <>
          <p>
            Throughout the COVID-19 pandemic, communities have seen significant reductions in automobile traffic, energy consumption, and other related activities. The sudden change in our everyday lives has led to substantial yet temporary reductions in fossil fuel use across the globe during this extraordinary time. Given these sharp decreases, and the observed associated declines in pollutants associated with fossil fuel combustion, such as nitrogen dioxide (NO<sub>2</sub>), scientists have wondered whether corresponding decreases in carbon dioxide (CO<sub>2</sub>), which is also primarily emitted from the burning of fossil fuels, could be observed from satellites and what impact, if any, such decreases could have on future climate projections.
          </p>
        </>
      )
    },
    {
      id: 'co2-emissions-during-lockdowns',
      name: 'CO₂ Emissions During Lockdowns',
      contentComp: (
        <>
          <p>
            At the peak of initial pandemic-related shutdowns, cities experienced significant reductions in fossil fuel use compared to previous years. This was largely due to ordinances that asked large portions of the population to stay at home. As a result of these measures, there were fewer cars on the road, planes in the sky, and ships at sea, and business and industrial activity was significantly curtailed, leading to far fewer fossil fuel emissions. Estimates based on global fossil fuel consumption from the Global Carbon Project confirmed these reductions. However, while NASA scientists could easily detect decreases in other fossil fuel combustion byproducts from space, such as nitrogen dioxide, corresponding reductions in carbon dioxide were not as readily apparent. It took much careful analysis to produce the map shown here, depicting global carbon dioxide changes in March 2020, at the height of the initial onset of the pandemic in the United States.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2-diff'],
          date: '2020-03-01T00:00:00Z'
        }
      }
    },
    {
      id: 'difference-between-co2-no2',
      name: 'The Difference Between CO₂ and NO₂',
      contentComp: (
        <>
          <p>
            Unlike nitrogen dioxide, which is chemically destroyed in the atmosphere a few hours after being emitted, carbon dioxide can last for centuries. This allows it to be transported far from its emission source by winds and causes it to be mixed with the surrounding air to produce a smooth global distribution pattern, such as the one seen here. Atmospheric carbon dioxide concentrations only vary by a few percent over the entire planet – from about 408 to 419 parts per million (ppm). This makes it very difficult to discern the impact of temporary changes in emissions during coronavirus-related shutdowns, as scientists expected that any observed fluctuations would be no larger than 0.1%. Teasing out the impacts of reductions in carbon dioxide emissions for specific locations required the ingenuity of NASA and its partners in the Japan Aerospace Exploration Agency (JAXA), along with advanced modeling, and the development of new analysis techniques.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2']
        }
      }
    },
    {
      id: 'co2-natural-carbon-cycle',
      name: 'CO₂ in the Natural Carbon Cycle',
      contentComp: (
        <>
          <p>
            Further complicating our ability to discern pandemic-related changes in carbon dioxide concentrations is the fact that the height of the pandemic corresponded with the beginning of spring in the northern hemisphere – when trees and other plants began to rapidly absorb carbon dioxide from the atmosphere. Nature plays an enormous role in regulating the abundance of atmospheric carbon dioxide. Not only do trees, grasslands, and other land ecosystems affect the seasonal absorption, sequestration, and emission of carbon dioxide, so does the ocean: together absorbing and emitting billions of tons of CO<sub>2</sub> each year. While the emission and absorption of carbon dioxide by these ecosystems is typically well-balanced, it can also vary regionally and seasonally in response to naturally occurring climatological phenomena such as the El Niño Southern Oscillation. These natural swings can mask any smaller changes related to the COVID-19 pandemic.
          </p>
        </>
      )
    },
    {
      id: 'tracking-carbon-dioxide-with-oco2-gosat',
      name: 'Tracking Carbon Dioxide Changes with OCO-2 and GOSAT',
      contentComp: (
        <>
          <p>
            Two Earth-observing satellites – NASA’s Orbiting Carbon Observatory-2 (OCO-2) and Japan’s Greenhouse gases Observing SATellite (GOSAT) – have tracked changes in atmospheric carbon dioxide emissions resulting from the COVID-19 pandemic. New measurements collected in 2020 were compared with results from previous years to glean insights into any small variations. Each satellite plays a unique role in studying carbon dioxide. OCO-2, which launched in 2014, collects measurements at relatively high spatial resolution (one square mile) along a narrow ground track as it orbits Earth from pole to pole, monitoring regional-scale changes in carbon dioxide. In contrast, GOSAT, which launched in 2009, collects measurements at isolated points, but can be targeted to track changes in carbon dioxide and methane (CH4) emissions in large urban areas such as Beijing, Tokyo, and Los Angeles. OCO-2 collects about a million measurements a day as it flies over Earth’s sunlit hemisphere, while GOSAT collects about 10,000. However, thick clouds and airborne particles such as dust, smoke or smog reduce the number of reliable estimates each day to about 600 for GOSAT and 85,000 for OCO-2. So, while these satellites provide a large number of measurements over the globe each day, their spatial sampling can still be quite sparse.
          </p>
        </>
      )
    },
    {
      id: 'looking-for-needle-in-haystack',
      name: 'Looking for a Needle in a Haystack',
      contentComp: (
        <>
          <p>
            Searching for small changes in regional atmospheric carbon dioxide emissions against the backdrop of existing atmospheric CO<sub>2</sub> is like looking for a needle in a haystack. To do this, scientists incorporated OCO-2 data from November 2019 through September 2020 into a NASA computer model that simulates how Earth’s atmosphere moves. The resulting gap-free global map was able to compensate for OCO-2’s relatively sparse CO<sub>2</sub> measurements. Scientists then compared the modeled projection with an averaged set of OCO-2 data collected over the same months during each year from 2015 through 2019. This method helped distinguish between changes in carbon dioxide due to emissions and those associated with year-to-year variations in wind transport, which can mask the smaller reductions in carbon dioxide that scientists expected to observe as a result of pandemic-related restrictions. What they saw were small reductions of 0.5ppm (about 0.125%) in carbon dioxide over China, Europe and the United States, at times corresponding to the largest reported emissions reductions in those regions. They also saw an increase in regional emissions over China as it emerged from COVID-19 lockdowns in late April.
          </p>
        </>
      )
    },
    {
      id: 'looking-for-needle-in-haystack-continued',
      name: 'Looking for a Needle in a Haystack, Continued',
      contentComp: (
        <>
          <p>
            Scientists were also able to infer regional-scale differences in carbon dioxide that were completely unrelated to the pandemic. Increased carbon dioxide observed at high northern latitudes was likely due to intense wildfires across Siberia in April 2020. In addition, a 1ppm decline in carbon dioxide concentrations across central India and southern and eastern Africa in February was likely due to the additional absorption of carbon dioxide by land ecosystems and the Indian Ocean Dipole, an El Niño-like disturbance across the Indian Ocean basin.
          </p>
        </>
      )
    },
    {
      id: 'getting-a-closer-view',
      name: 'Getting a Closer View: CO₂ Changes Over Large Urban Areas',
      contentComp: (
        <>
          <p>
            The biggest changes in economic activity associated with the pandemic – and, subsequently, the largest reductions in fossil fuel emissions – occurred in large urban areas. Tracking these changes from space is challenging for a couple of reasons: first, since cities cover only a tiny fraction of Earth’s surface, spacecraft don’t fly directly over them very often, and second, cities are frequently covered by clouds and passing weather systems that can easily transport carbon dioxide in and out of these areas. GOSAT can easily target cities and has the unique ability to distinguish between changes in carbon dioxide that occur near Earth’s surface, which are more likely to originate from a city, and those at higher altitudes, which are more likely to have been transported from somewhere else. Scientists used this capability to devise a new technique to tease out changes in carbon dioxide emissions due to the pandemic based on their altitude. Using this new process, scientists were able to determine that for all months studied in 2020, the average concentration of carbon dioxide over Beijing, Tokyo, New York, Mumbai, Delhi and Dhaka was reduced compared to the previous years studied.
          </p>
        </>
      )
    },
    {
      id: 'what-we-have-learned',
      name: 'What We\'ve Learned So Far, and Why it Matters',
      contentComp: (
        <>
          <p>
            While detecting and tracking small changes in atmospheric carbon dioxide due to the COVID-19 pandemic was challenging, OCO-2 and GOSAT were able to observe a temporary decrease in the rate carbon dioxide was added to our atmosphere. Scientists don’t expect to see an overall reduction in the global concentration of atmospheric carbon dioxide, however.
          </p>
          <p>
            The research provided a real-world test of the latest state-of-the-art techniques for detecting changes in atmospheric carbon dioxide. Despite sampling limitations, both of these first-generation space-based greenhouse gas monitoring satellites were able to accurately detect small variations in carbon dioxide emissions, and their space-based data complemented ground-based and aircraft measurements. The research also reinforced the value of combining different types of measurements to detect changes in carbon dioxide emission sources.
          </p>
          <p>
            A key takeaway of the research is the need to improve our understanding of the contributions of the natural carbon cycle. By improving our ability to track and diagnose its changes, scientists will be able to more accurately attribute and interpret changes in carbon dioxide due to human activities. For example, we would have to reduce carbon dioxide emissions by as much as we have done this year for every year in the next couple of decades to meet the ambitious goals of the Paris agreement and limit temperature increases to less than 2 degrees C. This test shows we are learning how to do that.
          </p>
          <p>
            The research is also providing new insights into the types of sensors and analysis tools needed to track changes in carbon dioxide from space. These capabilities will be increasingly important as society seeks to decarbonize economies. Results of these COVID-related studies will benefit development of several next-generation satellites launching in the next few years, including Japan’s GOSAT-GW satellite, the Copernicus CO2M constellation, and NASA’s GeoCarb, the first geostationary greenhouse gas satellite.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2-diff']
        }
      }
    }
  ]
};
