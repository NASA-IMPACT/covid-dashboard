import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import { LayerInfo } from './single/about-data';
const { api } = config;

export default {
  id: 'climate',
  name: 'Climate Change',
  publishDate: '2020/12/01',
  thumbnail: 'thumbnail-climate.jpg',
  chapters: [
    {
      id: 'climate-change-and-covid',
      name: 'Climate Change and COVID-19',
      contentComp: (
        <>
          <p>
            Throughout the COVID-19 pandemic, communities have seen significant reductions in automobile traffic, energy consumption, and other related activities. The sudden change in our everyday lives has led to substantial, yet temporary, reductions in fossil fuel use across the globe. These changes had an immediate and easily observed impact on pollutants associated with fossil fuel combustion, such as nitrogen dioxide (NO<sub>2</sub>), shown here. The combustion of fossil fuels also produces greenhouse gases, such as carbon dioxide (CO<sub>2</sub>) and methane (CH<sub>4</sub>), which play a major role in regulating Earth&apos;s climate. Given the observed associated declines in{' '}
            <Link
              to='/discoveries/air-quality/aq-and-covid'
              title='Read how COVID affect the climate'
            >
              nitrogen dioxide
            </Link>{' '}
            , scientists wondered whether corresponding decreases in carbon dioxide could be observed from satellites and what impact, if any, such decreases could have on future climate projections. These temporary changes are giving scientists an unprecedented opportunity to study how changes in human activities impact the global carbon cycle and to better understand the relative roles natural carbon cycle variations and humans play in driving climate change.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['no2-diff'],
          date: '2020-03-01T00:00:00Z',
          compare: {
            mapLabel: () => 'NO₂ Baseline (5 years) compared to NO₂ Difference for March 2020',
            source: {
              type: 'raster',
              tiles: [
                `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_03_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
              ]
            }
          }
        }
      }
    },
    {
      id: 'co2-emissions-during-lockdowns',
      name: 'CO₂ Emissions During Lockdowns',
      contentComp: (
        <>
          <p>
            At the peak of initial pandemic-related shutdowns, fossil fuel use in urban areas declined significantly compared to previous years. This was largely due to local directives that required  most people to stay at home. As a result of these measures, there were fewer cars on the road, planes in the sky, and ships at sea, leading to far less fossil fuel emissions. Estimates of global fossil fuel consumption from the Global Carbon Project confirmed these reductions. However, while NASA scientists could easily detect decreases in other fossil fuel combustion byproducts from space, such as nitrogen dioxide, corresponding reductions in carbon dioxide were not as readily apparent. It took careful analysis to produce the map shown here, depicting global carbon dioxide changes in March 2020, at the height of the initial onset of the pandemic in the United States.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2-diff'],
          mapLabel: () => 'March 31, 2020',
          date: '2020-03-31T00:00:00Z'
        }
      }
    },
    {
      id: 'difference-between-co2-no2',
      name: 'The Difference Between CO₂ and NO₂',
      contentComp: (
        <>
          <p>
            Unlike nitrogen dioxide, which dissipates in the atmosphere a few hours after emission, carbon dioxide can last for centuries. Because of this, nitrogen dioxide emissions are typically more localized, while winds can carry carbon dioxide emissions far from their original source. This creates a smooth, global distribution pattern for carbon dioxide, such as the one seen here, as new emissions mix with the surrounding air. As a result, atmospheric carbon dioxide concentrations are relatively steady over the entire planet. This makes it very difficult to discern the impact of temporary changes in carbon dioxide emissions during coronavirus-related shutdowns, as scientists expected that any observed fluctuations would be no larger than 0.1% below normal levels. Teasing out the impacts of such reductions for specific locations during the pandemic has required NASA and its partners in the Japan Aerospace Exploration Agency (JAXA) to use advanced modeling and develop new analysis techniques.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        about: (
          <LayerInfo>
            <p>
              Top: darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity. Bottom: redder colors indicate more CO₂. Bluer colors indicate less CO₂.
            </p>
          </LayerInfo>
        ),
        data: {
          mapsPerRow: 1,
          bbox: [-148.7109, -47.7540, 179.6484, 62.2679],
          maps: [
            {
              id: 'no2',
              label: 'NO₂ March 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRM/OMI_trno2_0.10x0.10_202003_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
                ]
              }
            },
            {
              id: 'co2',
              label: 'CO₂ March 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_03_01.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'co2-natural-carbon-cycle',
      name: 'CO₂ in the Natural Carbon Cycle',
      contentComp: (
        <>
          <p>
            Further complicating the ability to discern pandemic-related changes in carbon dioxide concentrations is the fact that initial lockdowns corresponded with the beginning of spring in the Northern Hemisphere – when trees and other plants began to rapidly absorb carbon dioxide from the atmosphere. Trees, grasslands, and other land ecosystems absorb billions of tons of carbon dioxide as they bloom in the spring and then release most of that carbon dioxide back into the atmosphere as they decay in the fall. The ocean also exchanges billions of tons of carbon dioxide with the atmosphere each year. Typically, these components of the natural carbon cycle are reasonably well balanced when averaged over the year: absorbing about as much carbon dioxide as the emit, along with about half of the carbon dioxide produced by human activities. However, seasonal swings in the uptake and release of carbon dioxide by plants on land, and temperature and rainfall changes associated with naturally occurring climatological phenomena such as the El Niño Southern Oscillation, can mask any smaller changes related to the COVID-19 pandemic.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        data: {
          name: 'CO₂ - 16 day average',
          bbox: [-140, -40, 140, 40],
          legend: {
            type: 'gradient-adjustable',
            min: '< 408 ppm',
            max: '> 419 ppm',
            stops: [
              '#313695',
              '#588cbf',
              '#a3d2e5',
              '#e8f6e8',
              '#fee89c',
              '#fba55c',
              '#e24932'
            ]
          },
          info: 'This layer shows the average background concentration of carbon dioxide (CO₂) in our atmosphere for 2020. Redder colors indicate more CO₂. Bluer colors indicate less CO₂.',
          mapsPerRow: 2,
          maps: [
            {
              id: 'jan',
              label: 'Jan 15 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_01_15.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            },
            {
              id: 'apr',
              label: 'Apr 15 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_04_15.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            },
            {
              id: 'jul',
              label: 'Jul 15 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_07_15.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            },
            {
              id: 'oct',
              label: 'Oct 15 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_10_15.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'oco2-and-gosat',
      name: 'OCO-2 and GOSAT Provide Two Complementary Ways to Track Changes in CO₂',
      contentComp: (
        <>
          <p>
            Two Earth-observing satellites – NASA’s{' '}
            <a
              href='https://ocov2.jpl.nasa.gov/'
              target='_blank'
              rel='noopener noreferrer'
              title='Explore the OCO-2 product'
            >
              Orbiting Carbon Observatory-2 (OCO-2)
            </a>{' '}
            and Japan&apos;s{' '}
            <a
              href='https://www.eorc.jaxa.jp/GOSAT/index.html'
              target='_blank'
              rel='noopener noreferrer'
              title='Explore GOSAT'
            >
              Greenhouse gases Observing SATellite (GOSAT)
            </a>{' '}
            – have tracked changes in atmospheric carbon dioxide emissions resulting from the COVID-19 pandemic. Measurements collected in 2020 were compared with results from previous years to glean insights into any small variations. Each of these satellites plays a unique role in studying carbon dioxide. OCO-2, whose data are shown here, collects measurements at relatively high spatial resolution and monitors regional-scale changes in carbon dioxide. GOSAT collects measurements at isolated points and can be targeted to track changes in carbon dioxide and methane emissions in large urban areas, such as Beijing, Tokyo, and Los Angeles. While both satellites provide a large number of measurements over the globe each day, thick clouds and airborne particles such as dust, smoke or smog reduce the number of reliable estimates they produce, so their spatial sampling is relatively sparse.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2'],
          date: '2020-03-31T00:00:00Z',
          bbox: [-125.1562, 29.3055, -72.5097, 48.8068],
          compare: {
            mapLabel: () => '5 year average compared to March 31st 2020',
            source: {
              type: 'raster',
              tiles: [
                `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-base/xco2_16day_base.2020_03_31.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
              ]
            }
          }
        }
      }
    },
    {
      id: 'looking-for-needle-in-haystack',
      name: 'Looking for a Needle in a Haystack',
      contentComp: (
        <>
          <p>
            Searching for small changes in regional atmospheric carbon dioxide emissions against the backdrop of existing carbon dioxide levels is like looking for a needle in a haystack. To do this, scientists incorporated OCO-2 data from November 2019 through September 2020 into a NASA computer model that simulates how Earth’s atmosphere moves. The result was a gap-free global map that compensated for OCO-2’s relatively sparse carbon dioxide measurements. Scientists then compared the modeled projection with an averaged set of OCO-2 data collected over the same months from 2015 through 2019. This method helped distinguish between changes in carbon dioxide due to emissions and those associated with year-to-year variations in patterns of how winds move around the globe, which can make it hard to spot the smaller reductions in carbon dioxide that scientists expected to observe as a result of the pandemic. What they saw were small reductions of 0.5 parts per million (ppm) (about 0.125%) in carbon dioxide over China, Europe, and the United States, at times during the months corresponding to the largest reported emissions reductions in those regions.
          </p>
        </>
      ),

      visual: {
        type: 'multi-map',
        about: (
          <LayerInfo>
            <p>
              Average: redder colors indicate more CO₂. Bluer colors indicate less CO₂. Difference: redder colors indicate increases in CO₂ in relation to the baseline. Bluer colors indicate lower levels of CO₂.
            </p>
          </LayerInfo>
        ),
        data: {
          bbox: [-10, 38, 48, 55],
          maps: [
            {
              id: 'co2',
              label: 'CO₂ Average April 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.2020_04_01.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r`
                ]
              }
            },
            {
              id: 'co2-diff',
              label: 'CO₂ Difference April 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-diff/xco2_16day_diff.2020_04_01.tif&resampling_method=bilinear&bidx=1&rescale=-0.000001%2C0.000001&color_map=rdbu_r`
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'not-all-changes-related-to-pandemic',
      name: 'Not all Changes Observed in CO₂ Were Related to the Pandemic',
      contentComp: (
        <>
          <p>
            Scientists were also able to infer regional-scale differences in carbon dioxide that were completely unrelated to the pandemic using these new techniques. Increased carbon dioxide observed over Australia early in the year was likely due to intense wildfires in late 2019. In addition, a small, 1ppm decline in carbon dioxide concentrations across Central India and Southern and Eastern Africa in January, shown here, was likely due to the additional absorption of carbon dioxide by land ecosystems and the Indian Ocean Dipole, an El Niño-like disturbance across the Indian Ocean basin.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['co2-diff'],
          date: '2020-01-15T00:00:00Z',
          bbox: [-15, -36.5978, 170, 47.9899]
        }
      }
    },
    {
      id: 'co2-changes-over-large-urban-areas',
      name: 'CO₂ Changes Over Large Urban Areas',
      contentComp: (
        <>
          <p>
            The most severe changes in economic activity associated with the pandemic – and, subsequently, the largest reductions in fossil fuel emissions – occurred in large urban areas. Tracking these changes from space is challenging. Spacecraft don’t fly directly over cities very often and they frequently are covered by clouds and passing weather systems that can easily transport carbon dioxide in and out. GOSAT’s agile pointing system can look at cities and distinguish between changes in carbon dioxide that occur near Earth’s surface, which are more likely to originate from a city, and those at higher altitudes, which are more likely to have been transported from somewhere else. Scientists used this capability to devise a new technique to tease out changes in carbon dioxide emissions due to the pandemic based on their altitude. Using this process, scientists found a lower average concentration of carbon dioxide over Beijing, Tokyo, New York, Mumbai, Delhi, and Dhaka during the pandemic months studied in 2020, compared to previous years.
          </p>
        </>
      ),
      visual: {
        type: 'multi-map',
        about: (
          <LayerInfo>
            <p>Redder colors indicate increased CO<sub>2</sub> enhancements. Bluer colors indicate decreased CO<sub>2</sub> enhancements.</p>
          </LayerInfo>
        ),
        data: {
          name: 'XCO₂ (Diff)',
          bbox: [116.17, 40.11, 116.6, 39.7],
          maps: [
            {
              id: 'gosat-january',
              label: 'January 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/GOSAT_XCO2_202001_be_BG_circle_cog.tif&resampling_method=bilinear`
                ]
              }
            },
            {
              id: 'gosat-february',
              label: 'February 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/GOSAT_XCO2_202002_be_BG_circle_cog.tif&resampling_method=bilinear`
                ]
              }
            },
            {
              id: 'gosat-march',
              label: 'March 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/GOSAT_XCO2_202003_be_BG_circle_cog.tif&resampling_method=bilinear`
                ]
              }
            },
            {
              id: 'gosat-april',
              label: 'April 2020',
              source: {
                type: 'raster',
                tiles: [
                  `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/GOSAT_XCO2_202004_be_BG_circle_cog.tif&resampling_method=bilinear`
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'what-we-have-learned',
      name: 'What We\'ve Learned So Far, and Why it Matters',
      contentComp: (
        <>
          <p>
            Scientists met the challenge of detecting and tracking the small, temporary changes in atmospheric carbon dioxide caused by the COVID-19 pandemic using data from OCO-2 and GOSAT. While the rate at which carbon dioxide was added to our atmosphere was temporarily decreased, an overall reduction in the global concentration of atmospheric carbon dioxide is not expected.
          </p>
          <p>
            This research provided a real-world test for these first-generation greenhouse-gas monitoring satellites. It showed that even small, year-to-year reductions in carbon dioxide emissions can be tracked using space-based sensors. This capability will be increasingly important to inform and test carbon management policies. Another key takeaway from this research is the need to improve our understanding of the contributions of the natural carbon cycle. By improving our ability to track and diagnose its changes, scientists will be able to more accurately attribute and interpret changes in carbon dioxide levels caused by human activities.
          </p>
          <p>
            A key takeaway of the research is the need to improve our understanding of the contributions of the natural carbon cycle. By improving our ability to track and diagnose its changes, scientists will be able to more accurately attribute and interpret changes in carbon dioxide due to human activities. For example, we would have to reduce carbon dioxide emissions by as much as we have done this year for every year in the next couple of decades to meet the ambitious goals of the Paris agreement and limit temperature increases to less than 2 degrees C. This test shows we are learning how to do that.
          </p>
          <p>
            The research is also providing new insights into the sensors and analysis tools needed to track changes in carbon dioxide from space. For example, it reinforced the value of combining different types of measurements to detect small changes in carbon dioxide emission sources. Results of these COVID-related studies will benefit development of several next-generation satellites launching in the next few years, including Japan&apos;s GOSAT-GW satellite, the Copernicus CO2M constellation, and NASA&apos;s{' '}
            <a
              href='https://www.nasa.gov/feature/jpl/geocarb-a-new-view-of-carbon-over-the-americas'
              target='_blank'
              rel='noopener noreferrer'
              title='Explore GeoCarb'
            >
               GeoCarb
            </a>.
          </p>
          <p>
            <Link
              to='/discoveries/water-quality/water-quality-during-pandemic'
              title='Read how COVID affect changing landscapes'
            >
              Explore How COVID-19 Is Affecting Water Quality
            </Link>
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          mapLabel: () => 'Most recent CO₂ difference',
          layers: ['co2-diff']
        }
      }
    }
  ]
};
