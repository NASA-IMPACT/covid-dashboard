import React from 'react';

import config from '../../config';
const { api } = config;

export default {
  id: 'changing-lanscapes',
  name: 'Changing landscapes during the COVID-19 pandemic',
  publishDate: '2020/12/01',
  chapters: [
    {
      id: 'changing-behavior',
      name: 'Changing Behavior and Changing Landscapes',
      contentComp: (
        <>
          <p>
            While NASA satellites can’t see the novel coronavirus from space, they can see how people are reacting to it. Throughout the COVID-19 pandemic, governments have implemented, eased, and re-implemented restrictions limiting mobility and international travel to help slow the spread of the virus. As a result of these measures, people have largely stayed home, and the ways in which we interact with the built and natural environment have changed. These changes have reverberated throughout Earth’s systems and are being captured in different ways within the satellite record.
          </p>
        </>
      )
    },
    {
      id: 'dimmer-world',
      name: 'A Dimmer World During the Pandemic',
      contentComp: (
        <>
          <p>
            When China began implementing restrictions on businesses in the early months of 2020, NASA researchers documented changes in nighttime lights throughout the region. Images of Earth at night provide an extraordinary view of how human activity changes over time. During the COVID-19 pandemic, scientists are using satellite observations to track variations in nighttime lights, which are related to changes in transportation, energy use, and migration, stemming from lockdown measures. From Jan. through Feb. 2020, nighttime lights in the central commercial district of Wuhan dimmed as people stayed home instead of shopping or socializing. Even highways, represented by the bright lines in the satellite imagery, also darkened with less activity during lockdown periods.
          </p>
        </>
      )
    },
    {
      id: 'changes-in-traffic',
      name: 'Changes in Traffic and Parking Lot Patterns',
      contentComp: (
        <>
          <p>
            At different stages of the pandemic, nonessential businesses like shopping malls were temporarily closed, while essential businesses like grocery stores were allowed to remain open. The effect of nonessential store closures on surface transportation around the world was so significant that it could be seen from space. For example, the imagery shown here provides a stark picture of empty parking lots near deserted commercial districts in and around Los Angeles. Blue areas represent places where slowdowns were most severe. Scientists were able to obtain these data by combining remote sensing technology known as synthetic aperture radar, or SAR, with high-resolution imagery from Planet Labs. SAR is typically used to distinguish between changes in the environment following a natural disaster. By comparing SAR images of the same area before and after pandemic-related lockdowns, the greatest decreases in car activity in Los Angeles near airports, sports stadiums, and shopping malls were visible from space.
          </p>
        </>
      )
    },
    {
      id: 'changes-in-ports',
      name: 'Tracking Changes in Ports',
      contentComp: (
        <>
          <p>
            Not only were the streets of Los Angeles affected by COVID-related shutdowns, but so was its port. During the pandemic, supply chains around the world dependent on cargo shipping were interrupted by travel restrictions and quarantines designed to stop the spread of the virus. In early 2020, many ports closed, shipments were canceled, and in some locations, altered routes prevented the efficient movement of cargo. According to the Port of Los Angeles, their port saw a 19% reduction in shipping cargo volumes during the early months of the pandemic compared to 2019. The image here shows a reduction in the number of ships at the port, which could potentially also affect overall water quality in the area.
          </p>
        </>
      )
    },
    {
      id: 'changes-in-urban-heat',
      name: 'Changes in Urban Heat During Bay Area Shelter-In-Place Orders',
      contentComp: (
        <>
          <p>
            Sudden changes in surface transportation may also be changing how cities trap and emit heat. Using satellite and thermal data from the joint NASA-U.S. Geological Survey Landsat satellite and the ECOSTRESS instrument aboard the International Space Station, scientists at NASA’s Ames Research Center have found that decreases in air pollution and the prevalence of empty parking lots have increased solar radiation fluxes from ground surfaces during the pandemic. In March, surface traffic in the San Francisco Bay Area dropped by 70%. Scientists found that the reduction in traffic corresponded to a 30% decrease in fine particulate and ozone pollution when compared to previous years.
          </p>
        </>
      )
    },
    {
      id: 'changes-in-urban-heat-continued',
      name: 'Changes in Urban Heat During Bay Area Shelter-In-Place Orders, Continued',
      contentComp: (
        <>
          <p>
            The cleaner air meant that heat re-emitted during the day from dark asphalt and cement surfaces did not stay trapped near the ground as long. Instead, heat dissipated quickly, cooling the urban environment. As a result, scientists found that large parking lots, highway corridors, and commercial rooftops were on average 10-15°F cooler from March to May 2020 as compared to previous years.
          </p>
        </>
      )
    },
    {
      id: 'fewer-prescribed-burns',
      name: 'Fewer Prescribed Burns During the Pandemic',
      contentComp: (
        <>
          <p>
            Social distancing measures during the pandemic also affected how humans interact with the natural environment. For example, satellites observed a reduction in managed forest fires, otherwise known as prescribed burns, on federal lands during the pandemic. Prescribed fires are an important way to reduce fuel loads and maintain biodiversity. In March 2020, the U.S. Forest Service and other federal agencies temporarily suspended all prescribed burns on federal lands in the Southeast United States. State agencies in Mississippi, South Carolina, and North Carolina also issued spring burning bans in response to the COVID-19 pandemic. The Forest Service’s suspension aimed to prevent virus exposure to employees and to reduce smoke exposure to vulnerable communities, since COVID-19 is a respiratory illness. Researchers at NASA’s Goddard Space Flight Center detected a 42% reduction in active fires this spring compared to previous years.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        data: {
          bbox: [-75, 24, -107, 40],
          mapStyle: 'mapbox://styles/covid-nasa/ckhyrwyqa10fn19pu38wdrpjo',
          maps: [
            {
              id: 'fire-mar',
              label: 'March 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M3_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            },
            {
              id: 'fire-apr',
              label: 'April 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M4_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            },
            {
              id: 'fire-may',
              label: 'May 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M5_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            },
            {
              id: 'fire-jun',
              label: 'June 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M6_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            },
            {
              id: 'fire-jul',
              label: 'July 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M7_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            },
            {
              id: 'fire-aug',
              label: 'August 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/fire-anomalies/MODIS-AF_anomalies_USA_Y2020_M8_0.25-dashboard.tif&resampling_method=bilinear&rescale=-10,10&color_map=bwr`
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'what-we-learned',
      name: 'What have we learned and what opportunities are there for this research in the future?',
      contentComp: (
        <>
          <p>
            How we interact with the environment has a noticeable effect on the land, air, and water. Scientists will continue to monitor the social and environmental changes associated with the pandemic, as the widespread societal changes provide a unique opportunity to characterize and study the effect we have on our planet.
          </p>
        </>
      )
    }
  ]
};
