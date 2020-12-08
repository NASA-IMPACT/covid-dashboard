import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import { LayerInfo } from './single/about-data';
const { api } = config;

export default {
  id: 'changing-landscapes',
  name: 'Changing Landscapes',
  publishDate: '2020/12/01',
  thumbnail: 'thumbnail-changing-landscapes.jpg',
  chapters: [
    {
      id: 'changing-behavior',
      name: 'Changing Behavior and Changing Landscapes',
      contentComp: (
        <p>
          Throughout the COVID-19 pandemic, governments have implemented, eased, and re-implemented restrictions limiting mobility and international travel to help slow the spread of the virus. As a result, people have largely stayed home, and the ways in which we interact with the human-made and natural environments have changed. These changes have reverberated throughout Earth’s systems and are observed in different ways by NASA satellites.
        </p>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Landsat-8 imagery, visualized with the RGB bands.</p>
          </LayerInfo>
        ),
        data: {
          bbox: [113.7442, 30.2021, 114.859, 30.9092],
          mapLabel: () => 'Feb 25, 2020',
          layers: [
            {
              id: 'ls8-wuhan',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  'https://c50qa6bhpe.execute-api.us-west-2.amazonaws.com/scenes/landsat/tiles/{z}/{x}/{y}.png?sceneid=LC08_L1TP_123039_20200209_20200211_01_T1&bands=B4,B3,B2&color_formula=gamma RGB 3.5, saturation 1.7, sigmoidal RGB 15 0.35'
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'dimmer-world',
      name: 'A Dimmer World During the Pandemic',
      contentComp: (
        <>
          <p>
            When China implemented restrictions on businesses in the early months of 2020, NASA researchers documented changes in nighttime lights throughout the region. Images of Earth at night provide an extraordinary view of how human activity changes over time. During the COVID-19 pandemic, scientists are using satellite observations to track variations in nighttime lights, which show changes in transportation, energy use, and migration as human response to the pandemic evolves. From January through February 2020, nighttime lights in the central commercial district of Wuhan dimmed as people stayed home instead of shopping or socializing. Even highways, represented by the bright lines in the satellite imagery, darkened with less activity during shutdown periods.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          bbox: [113.7442, 30.2021, 114.859, 30.9092],
          layers: [
            {
              id: 'jan',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/bmhd-wuhan/BMHD_Wuhan_China_VNP46A2_Jan192020_ON.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3`
                ]
              },
              name: 'Nightlights HD',
              legend: {
                type: 'gradient',
                min: 'less',
                max: 'more',
                stops: [
                  '#08041d',
                  '#1f0a46',
                  '#52076c',
                  '#f57c16',
                  '#f7cf39'
                ]
              },
              info: 'The High Definition Nightlights dataset is processed to eliminate light sources, including moonlight reflectance and other interferences. Darker colors indicate fewer night lights and less activity. Lighter colors indicate more night lights and more activity.'
            }
          ],
          compare: {
            mapLabel: () => 'January 2020 compared to February 2020',
            source: {
              type: 'raster',
              tiles: [
                `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/bmhd-wuhan/BMHD_Wuhan_China_VNP46A2_Feb42020_ON.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3`
              ]
            }
          }
        }
      }
    },
    {
      id: 'changes-in-traffic',
      name: 'Changes in Traffic and Parking Lot Patterns',
      contentComp: (
        <p>
          At different stages of the pandemic, nonessential businesses like shopping malls closed temporarily, while essential businesses like grocery stores were allowed to remain open. The effect of nonessential business closures on surface transportation around the world was so significant that it could be seen from space. For example, the imagery shown here provides a stark picture of empty parking lots near deserted commercial districts in and around Los Angeles. Blue areas represent places where slowdowns were most severe. Scientists obtained these data by combining remote sensing technology known as synthetic aperture radar, or SAR, with high-resolution imagery from Planet Labs. By comparing SAR images of the same areas before and after pandemic-related lockdowns, decreases in car activity in Los Angeles near airports, sports stadiums, and shopping malls were visible from space.
        </p>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Slowdown Proxy Maps show areas with the greatest reduction in car activity shaded in blue. Darker blues indicate areas of greater change.</p>
          </LayerInfo>
        ),
        data: {
          bbox: [-118.2645, 34.0486, -118.2059, 34.0930],
          spotlight: 'la',
          layers: ['slowdown']
        }
      }
    },
    {
      id: 'changes-in-ports',
      name: 'Tracking Changes in Ports',
      contentComp: (
        <p>
          It wasn’t just ground transportation in Los Angeles that was affected by COVID-related shutdowns – its ports also showed less activity. During the pandemic, supply chains around the world dependent on cargo shipping saw interruptions as many ports closed, shipments canceled, and in some locations, altered routes prevented the efficient movement of cargo. According to the Port of Los Angeles, its port saw a 19% reduction in shipping cargo volume during the early months of the pandemic, compared to the same time period in 2019. The image here shows a reduction in the number of ships at the port, which could potentially also affect the area’s overall water quality.
        </p>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Ships detected in PlanetScope imagery are shown in orange.</p>
          </LayerInfo>
        ),
        data: {
          // bbox: [-118.6759, 33.4267, -117.0733, 34.3439],
          spotlight: 'la',
          mapLabel: () => 'March 11, 2020',
          date: '2020-03-11T00:00:00Z',
          layers: [
            'detections-ship'
          ]
        }
      }
    },
    {
      id: 'changes-in-urban-heat',
      name: 'Changes in Urban Heat During Bay Area Shelter-In-Place Orders',
      contentComp: (
        <p>
          Sudden changes in surface transportation may also be changing how cities trap and emit heat. In March, surface traffic in the San Francisco Bay Area dropped by 70%. Scientists found that the reduction in traffic corresponded to a 30% decrease in fine particulate and ozone pollution when compared to previous years.
        </p>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Slowdown Proxy Maps show areas with the greatest reduction in car activity shaded in blue. Darker blues indicate areas of greater change.</p>
          </LayerInfo>
        ),
        data: {
          bbox: [-122.2635, 37.6967, -122.1492, 37.7507],
          spotlight: 'sf',
          layers: ['slowdown']
        }
      }
    },
    {
      id: 'changes-in-urban-heat-continued',
      name: 'Changes in Urban Heat During Bay Area Shelter-In-Place Orders, Continued',
      contentComp: (
        <>
          <p>
            Satellite and thermal data from the joint NASA-U.S. Geological Survey Landsat satellite and NASA’s ECOsystem Spaceborne Thermal Radiometer Experiment on Space Station (ECOSTRESS) instrument aboard the International Space Station show how decreases in air pollution and the prevalence of empty parking lots during the pandemic changed how much solar radiation is absorbed and reflected from ground surfaces Cleaner air meant that heat re-emitted during the day from dark asphalt and cement surfaces did not stay trapped near the ground as long. Instead, heat dissipated quickly, cooling the urban environment. As a result, scientists found that large parking lots, highway corridors, and commercial rooftops were on average 10-15°F cooler from March to May 2020, compared to previous years.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        data: {
          bbox: [-122.2635, 37.6967, -122.1492, 37.7507],
          // units are in kelvin with a:
          // - range: 1-65535
          // - multiplicative scale factor: 0.00341802
          // - additive scale factor: 149
          // 40710 & 49487 translate to 15 & 45 celsius
          maps: [
            {
              id: 'st-2018',
              label: 'April 2018',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/ls8-surface-temperature/LC08_L2SP_044034_20180414_20200901_02_T1_ST_B10.cog.tif&resampling_method=bilinear&rescale=40710,49487&color_map=coolwarm`
                ]
              }
            },
            {
              id: 'st-2020',
              label: 'April 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/ls8-surface-temperature/LC08_L2SP_044034_20200403_20200822_02_T1_ST_B10.cog.tif&resampling_method=bilinear&rescale=40710,49487&color_map=coolwarm`
                ]
              }
            }
          ],
          name: 'Surface Temperature',
          legend: {
            type: 'gradient',
            min: '15℃',
            max: '45℃',
            stops: [
              '#3d4fc0',
              '#7495f1',
              '#acc7fa',
              '#dedbda',
              '#f5b89e',
              '#e77962',
              '#b4152d'
            ]
          },
          info: 'Surface Temperature from Landsat-8, Collection 2 Level 2 data.'
        }
      }
    },
    {
      id: 'fewer-prescribed-burns',
      name: 'Fewer Prescribed Burns During the Pandemic',
      contentComp: (
        <>
          <p>
            Limits on work and travel during the pandemic affected how humans interact with the natural environment. For example, satellites observed a reduction in managed forest fires, otherwise known as prescribed burns, on federal lands. Prescribed fires are an important way to reduce fuel loads and maintain biodiversity. In March 2020, the U.S. Forest Service and other federal agencies temporarily suspended all prescribed burns on federal lands in the Southeast United States. State agencies in Mississippi, South Carolina, and North Carolina also issued spring burning bans in response to the COVID-19 pandemic. The Forest Service’s suspension aimed to prevent virus exposure to employees and to reduce smoke exposure to vulnerable communities, since COVID-19 is a respiratory illness. Using fire data from the Visible Infrared Imaging Radiometer Suite (VIIRS) on the Suomi NPP satellite, researchers at NASA’s Goddard Space Flight Center detected a 42% reduction in active fires in the Southeastern U.S. this spring compared to previous years.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        data: {
          bbox: [-75, 24, -107, 40],
          mapStyle: 'mapbox://styles/covid-nasa/ckhyrwyqa10fn19pu38wdrpjo',
          name: 'Fire anomalies',
          legend: {
            type: 'gradient',
            min: '-10%',
            max: '+10%',
            stops: [
              '#0a03fb',
              '#5a59fb',
              '#b0b0fd',
              '#fff8f8',
              '#fea4a5',
              '#fd5556',
              '#fd1c21'
            ]
          },
          info: 'This data shows the change in active fires compared to the baseline of 2012-2019.',
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
            How we interact with the environment has a noticeable effect on the land, air, and water. Scientists will continue to monitor the social and environmental changes associated with the pandemic, which provides a unique opportunity to characterize and study the effect we have on our planet.
          </p>
          <p>
            <Link
              to='/discoveries/air-quality/aq-and-covid'
              title='Explore How COVID-19 Is Affecting Earth&apos;s Air Quality'
            >
              Explore How COVID-19 Is Affecting Earth&apos;s Air Quality
            </Link>
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: []
        }
      }
    }
  ]
};
