import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import { LayerInfo } from './single/about-data';
const { api } = config;

export default {
  id: 'water-quality',
  name: 'Water Quality',
  publishDate: '2020/12/01',
  thumbnail: 'thumbnail-water.jpg',
  chapters: [
    {
      id: 'water-quality-during-pandemic',
      name: 'Water Quality during the COVID-19 Pandemic',
      contentComp: (
        <>
          <p>
          While some researchers are studying the COVID-19 pandemic’s impact on{' '}
            <Link
              to='/discoveries/climate/climate-change-and-covid'
              title='Read how COVID affect the climate'
            >
              climate
            </Link>{' '}
            and{' '}
            <Link
              to='/discoveries/air-quality/aq-and-covid'
              title='Read how COVID affect the climate'
            >
              air quality
            </Link>
            , others are studying the effects it may have on water quality. Human activity influences water quality, and behavior changes during the COVID-19 pandemic may be beginning to affect local and regional water quality around the world. Though in many cases that relationship is hard to identify, runoff from agriculture and cities can overload coastal waters with excess nutrients, ships in ports and other waterways can mix up sediment and increase turbidity, and even air pollution can end up in the water. Although there are various indications that overall water quality is improving in many places during pandemic-related shutdowns, the cause of these changes and their long-term effects are under investigation by researchers using satellite-based observations and on-the-ground validation.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          bbox: [-122.63570045, 37.11988178, -121.53518996, 38.35512939],
          layers: ['water-spm'],
          mapLabel: 'April 3, 2020',
          date: '2020-04-03T00:00:00Z',
          spotlight: 'sf'
        }
      }
    },
    {
      id: 'air-water-quality-and-covid',
      name: 'Air Quality, Water Quality and COVID-19',
      contentComp: (
        <>
          <p>
            California was one of the first places in the United States to impose COVID-19 related restrictions. A shelter-in-place mandate went into effect for six counties in the San Francisco metropolitan area on March 17, 2020. NASA scientists are using satellite data to investigate the connection between observed changes in air and water quality since the mandate began. Nitrogen compounds, commonly found in air pollutants, can contribute to the formation of algal blooms in water and cause water bodies to become more acidic. Research using satellite data to detect anomalies in levels of algae (chlorophyll-a) and total suspended solids across multiple sites, including the San Francisco Bay, have shown improvements in water quality during recent shutdowns. The lessons learned from this work will help inform similar work in other coastal cities.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['no2'],
          date: '2020-03-01T00:00:00Z',
          bbox: [-122.63570045, 37.11988178, -121.53518996, 38.35512939],
          compare: true
        }
      }
    },
    {
      id: 'examining-the-chesapeake',
      name: 'Examining the Chesapeake Bay during COVID-19',
      contentComp: (
        <>
          <p>
            Chlorophyll-a concentrations and water turbidity fluctuate based on a variety of factors, including natural geography and the weather, making it difficult to identify changes due to COVID-19 restrictions. In coastal areas such as the Chesapeake Bay, which are strongly influenced by human activities such as agricultural practices, higher chlorophyll-a concentrations can result from the discharge of fertilizers. Agricultural run-off may mask any improvements in water quality from pandemic-related shutdowns.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          bbox: [-77.0581, 36.8400, -75.0256, 39.8718],
          mapLabel: 'March 26, 2020',
          layers: [
            {
              id: 'chla-chesapeake',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/chla-chesapeake/anomaly-chl-bc-2020_03_26.tif&resampling_method=bilinear&bidx=1&rescale=0%2C100&color_map=rdbu_r`
                ]
              },
              name: 'Chlorophyll-a Anomaly',
              legend: {
                type: 'gradient',
                min: 'less',
                max: 'more',
                stops: [
                  '#3A88BD',
                  '#C9E0ED',
                  '#E4EEF3',
                  '#FDDCC9',
                  '#DE725B',
                  '#67001F'
                ]
              },
              info: 'Chlorophyll-a is an indicator of algae growth. Redder color indicate increases chlorophyll-a and worse water quality. Bluer colors indicate decreases in chlorophyll-a and improved water quality. White areas indicate no change.'
            }
          ]
        }
      }
    },
    {
      id: 'shades-of-green',
      name: 'Shades of Green in the Great Lakes',
      contentComp: (
        <>
          <p>
            Researchers are using NASA satellites to observe changes in water quality within the Great Lakes region. Comparing data from April-June 2020 to a baseline average for 2010-2019, researchers observed slight increases in chlorophyll-a and suspended sediment concentrations in the Western Basin of Lake Erie, the portion of the lake most affected by humans and agriculture. Research is ongoing, however, as scientists are unsure whether these changes are due to COVID-19 related behavioral changes, since they still fall within the historical range of chlorophyll-a and suspended sediment levels in the lake.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['water-wq-gl-chl'],
          mapLabel: 'April 1, 2020',
          date: '2020-04-01T00:00:00Z',
          spotlight: 'gl',
          bbox: [-84.3695, 45.2013, -81.7492, 41.253]
        }
      }
    },
    {
      id: 'glamorous-tool',
      name: "A GLAMorous Tool to Assess COVID's Effects",
      contentComp: (
        <>
          <p>
            During the pandemic, resources such as the Group on Earth Observations Global Agricultural Monitoring (GEOGLAM) tool help assess whether crops have adequate access to water and nutrients. Typically used to increase agricultural market transparency and bolster food security by producing timely, actionable information on agricultural conditions, GEOGLAM safely monitors and tracks agricultural conditions from space when local curfews and stay-at-home orders have prevented people from performing these duties on the ground. For example, the Togolese government has used GEOGLAM during the pandemic to safely track agricultural conditions throughout the country and distribute aid to small farmers.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          mapStyle: 'mapbox://styles/covid-nasa/ckhyrjsj40ctz19nc5akczgsk',
          mapLabel: 'Most recent GEOGLAM data',
          layers: ['agriculture']
        }
      }
    },
    {
      id: 'counting-crops',
      name: 'Counting Crops During a Lockdown',
      contentComp: (
        <p>
          CEarth-observing satellites have been critical to filling in information about crop planting and conditions, particularly where social distancing and shutdowns have made it difficult to collect ground data. NASA Harvest researchers at the University of Maryland in College Park are using data from U.S. and European satellites to supplement data collected on the ground by the U.S. Department of Agriculture. Using satellite data and machine learning, the researchers are monitoring key commodity crops that have high impacts on markets and food security, including corn and soybeans in the U.S. (pictured here) and winter wheat in Russia.
        </p>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Landsat-8, visualized using the agriculture band combination (6, 5, 2).</p>
          </LayerInfo>
        ),
        data: {
          bbox: [-93.7916, 41.5923, -92.9731, 42.0248],
          mapLabel: 'March 4, 2020',
          layers: [
            {
              id: 'ls8-iowa',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  'https://c50qa6bhpe.execute-api.us-west-2.amazonaws.com/scenes/landsat/tiles/{z}/{x}/{y}.png?sceneid=LC08_L1TP_026031_20200304_20200314_01_T1&bands=B6,B5,B2&color_formula=gamma RGB 3.5, saturation 1.7, sigmoidal RGB 15 0.35'
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'understanding-impacts-venetian-lagoon',
      name: 'Understanding Impacts on the Venetian Lagoon',
      contentComp: (
        <>
          <p>
            Other human activities, such as tourism, also affect water quality, although during the pandemic different geographic regions have seen different levels of change. Water clarity in the Venice Lagoon within the North Adriatic Sea, for example, improved during shutdowns because of reduced tourism and boat traffic. The satellite imagery here shows this trend, as total suspended solid levels fell from March-April 2020 with reduced human activity. But you didn’t need a satellite to see the difference. After the local COVID-19 shutdown began, pictures of gondolas in the newly-clear waters of Venice canals were shared around the world, as residents noticed changes so drastic they were visible to the naked eye.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          bbox: [12.0327, 44.7896, 13.8208, 45.7885],
          layers: [
            {
              id: 'tsm-nas',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/tsm/nas-2020_03_21.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
                ]
              },
              name: 'Turbidity',
              legend: {
                type: 'gradient',
                min: 'less',
                max: 'more',
                stops: [
                  '#3A88BD',
                  '#C9E0ED',
                  '#E4EEF3',
                  '#FDDCC9',
                  '#DE725B',
                  '#67001F'
                ]
              },
              info: 'Turbidity refers to the amount of sediment or particles suspended in water. Redder colors indicate more sediment and murkier water. Bluer colors indicate less sediment and clearer water.'
            }
          ],
          compare: {
            mapLabel: () => 'March 2020 compared to April 2020',
            source: {
              type: 'raster',
              tiles: [
                `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/tsm/nas-2020_04_18.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r`
              ]
            }
          }
        }
      }
    },
    {
      id: 'water-quality-belize',
      name: 'Monitoring Water Quality in Belize',
      contentComp: (
        <>
          <p>
            A team from the University of Alabama in Huntsville is using satellite and ground-based data to monitor water quality off the coast of Belize to understand how the pandemic is affecting sources of urban and agricultural pollutants, such as nitrogen and phosphorus. By observing land-use changes from shutdowns and decreased tourism, researchers are tracking the production of pollutants that reach water bodies and ecosystems. While Belize experienced similar declines in tourism to other locations, so far researchers have not found vast improvements in water quality. Research conducted during this pandemic will help guide future land-use planners and coastal development. During the COVID-19 pandemic, scientists will continue to use remote sensing data to observe any changes in water quality due to changes in human behavior.
          </p>
          <p>
            <Link
              to='/discoveries/changing-landscapes/changing-behavior'
              title='Read how COVID affect changing landscapes'
            >
              Learn More About Changing Human Behavior During the COVID-19 Pandemic
            </Link>
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        about: (
          <LayerInfo>
            <p>Landsat-8, visualized using the bathymetric band combination (4,3,1).</p>
          </LayerInfo>
        ),
        data: {
          bbox: [-89.9533, 16.5, -87.2012, 18.2],
          mapLabel: () => 'March 3, 2020',
          layers: [
            {
              id: 'ls8-belize',
              type: 'raster',
              info: 'asd',
              source: {
                type: 'raster',
                tiles: [
                  'https://c50qa6bhpe.execute-api.us-west-2.amazonaws.com/scenes/landsat/tiles/{z}/{x}/{y}.png?sceneid=LC08_L1TP_019048_20200303_20200314_01_T1&bands=B4,B3,B1&color_formula=gamma RGB 3.5, saturation 1.7, sigmoidal RGB 15 0.35'
                ]
              }
            }
          ]
        }
      }
    }
  ]
};
