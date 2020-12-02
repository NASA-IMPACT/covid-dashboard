import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
const { api } = config;

export default {
  id: 'air-quality',
  name: 'Air Quality',
  publishDate: '2020/12/01',
  thumbnail: 'thumbnail-air.jpg',
  chapters: [
    {
      id: 'aq-and-covid',
      name: 'Air Quality and COVID-19',
      contentComp: (
        <>
          <p>
            When governments began implementing shutdowns at the start of the COVID-19 pandemic, scientists wondered how the atmosphere would respond to the sudden change in human behavior. With people largely confined to their homes to slow the spread of the novel coronavirus, scientists expected there were likely to be fewer cars, planes, and ships burning and emitting fossil fuels. As the pandemic has progressed, these scenarios have largely played out: during the strictest lockdown periods, locations around the world experienced substantial reductions in transportation-related fossil fuel emissions. The impacts on specific air pollutants have been varied and dependant on their lifespan in the atmosphere. Those pollutants with short lifespans, such as nitrogen dioxide (NO2), decreased dramatically and quickly along with emissions. Today, air quality levels are beginning to approach pre-pandemic levels, and scientists are just beginning to dive into the new measurements collected throughout this unprecedented time.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['no2-diff'],
          date: '2020-03-01T00:00:00Z'
        }
      }
    },
    {
      id: 'what-makes-aq-good-or-bad',
      name: 'What Makes Air Quality Good or Bad?',
      contentComp: (
        <>
          <p>
            Cities are easy to spot from space. Choose any large, urban area around the world, and you’re likely see similar things: dense population centers, complex webs of highways and, more often than not, smog. Smog is the hazy curtain of air that often hangs over cities. It occurs when nitrogen dioxide  produced from fossil fuel emissions from gasoline in cars or coal in powerplants chemically reacts with sunlight and other pollutants like carbon monoxide (CO). Thick smog is harmful to breathe and can significantly reduce visibility. During lockdowns, satellites observed sharp reductions in nitrogen dioxide emissions in cities around the world, and smog began to vanish. Skies were bluer, air was cleaner, and, in some places, views previously obscured by air pollution were suddenly revealed. In Los Angeles, NASA scientists detected that nitrogen dioxide levels fell by more than 30% during the height of COVID-related shutdowns. Other large cities around the world experienced similar reductions.
          </p>
          <p>
            Imagery: Landsat 8, February 26, 2020.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          bbox: [-118.529, 33.835, -118.034, 34.168],
          layers: [
            {
              id: 'ls8-sf',
              type: 'raster',
              source: {
                type: 'raster',
                tiles: [
                  'https://c50qa6bhpe.execute-api.us-west-2.amazonaws.com/scenes/landsat/tiles/{z}/{x}/{y}.png?sceneid=LC08_L1TP_041036_20200226_20200313_01_T1&bands=B4,B3,B2&color_formula=gamma RGB 3.5, saturation 1.7, sigmoidal RGB 15 0.35'
                ]
              }
            }
          ]
        }
      }
    },
    {
      id: 'cities-experiencing-clearer-air',
      name: 'Cities Experiencing Clearer Air During Lockdowns',
      sections: [
        {
          id: 'beijing',
          name: 'Beijing',
          contentComp: (
            <>
              <p>
                When Chinese authorities suspended travel and closed businesses in late January 2020 in response to the novel coronavirus, Beijing’s local nitrogen dioxide levels fell dramatically. In February 2020, concentrations fell by nearly 30% compared to the previous five-year average.
              </p>
            </>
          ),
          visual: {
            type: 'map-layer',
            data: {
              layers: ['no2'],
              date: '2020-02-01T00:00:00Z',
              bbox: [114.84, 38.32, 117.85, 41.22],
              compare: {
                mapLabel: () => '5 year average compared to February 2020',
                source: {
                  type: 'raster',
                  tiles: [
                    `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_02_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
                  ]
                }
              }
            }
          }
        },
        {
          id: 'lima',
          name: 'Lima',
          contentComp: (
            <>
              <p>
                Cities across South America experienced similar declines in nitrogen dioxide. Lima, Peru had some of the most substantial reductions, with nitrogen dioxide levels falling approximately 70% below normal levels.
              </p>
            </>
          ),
          visual: {
            type: 'map-layer',
            data: {
              layers: ['no2'],
              date: '2020-05-01T00:00:00Z',
              bbox: [-77.97, -12.75, -76.08, -11.13],
              compare: {
                mapLabel: () => '5 year average compared to May 2020',
                source: {
                  type: 'raster',
                  tiles: [
                    `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_05_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
                  ]
                }
              }
            }
          }
        }
      ]
    },
    {
      id: 'lockdowns-no2',
      name: '“Like Flipping a Switch”: Lockdowns and NO₂',
      sections: [
        {
          id: 'part1',
          name: 'Part 1',
          contentComp: (
            <>
              <p>
                Nitrogen dioxide is only one component of air quality: sulfur dioxide (SO<sub>2</sub>), ozone (O<sub>3</sub>), formaldehyde (CH<sub>2</sub>O), and carbon monoxide, along with a host of other atmospheric constituents, also influence the quality of the air we breathe. The difference in nitrogen dioxide is that it has a relatively short lifetime in the atmosphere; once it’s emitted, it only lasts a few hours before it disappears. Therefore, once communities entered shutdowns, and people’s mobility was severely restricted, the effect on nitrogen dioxide concentrations was the equivalent of flipping a switch. That is not, however, the case with all air pollutants.
              </p>
            </>
          ),
          visual: {
            type: 'map-layer',
            data: {
              layers: ['no2'],
              date: '2020-04-01T00:00:00Z',
              bbox: [-37.17, 34.16, 53.78, 68.84],
              compare: {
                mapLabel: () => '5 year average compared to April 2020',
                source: {
                  type: 'raster',
                  tiles: [
                    `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_04_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
                  ]
                }
              }
            }
          }
        },
        {
          id: 'part2',
          name: 'Part 2',
          contentComp: (
            <>
              <p>
                Even with the strong correlation between nitrogen dioxide and the combustion of fossil fuels, atmospheric concentrations of nitrogen dioxide naturally fluctuate throughout the year, and weather patterns also influence its concentrations. For example, nitrogen dioxide typically falls dramatically during spring and summer months, and rain and wind increase its dispersion, lowering local concentrations. During the COVID-19 pandemic, NASA scientists have been able to attribute the observed changes in nitrogen dioxide to changes in our behavior, and they have been careful to account for any impacts on air pollution that are the result of natural weather variations.
              </p>
            </>
          ),
          visual: {
            type: 'map-layer',
            data: {
              layers: ['no2'],
              date: '2020-04-01T00:00:00Z',
              bbox: [-37.17, 34.16, 53.78, 68.84],
              compare: {
                mapLabel: () => '5 year average compared to April 2020',
                source: {
                  type: 'raster',
                  tiles: [
                    `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMBaseline/OMI_trno2_0.10x0.10_Baseline_04_Col3_V4.nc.tif&esampling_method=bilinear&bidx=1&rescale=0%2C1.5e16&color_map=custom_no2`
                  ]
                }
              }
            }
          }
        }
      ]
    },
    {
      id: 'seeing-air-pollution-from-space',
      name: 'Seeing Air Pollution from Space',
      contentComp: (
        <>
          <p>
            NASA has used the Ozone Monitoring Instrument (OMI) aboard the Aura satellite to observe global nitrogen dioxide levels since 2004. A joint endeavor between NASA, the Royal Netherlands Meteorological Institute (KNMI) and the Finnish Meteorological Institute (FMI), OMI’s longer data record provides important context with which to compare any changes observed during the pandemic. NASA scientists are also leveraging other space-based instruments from international partners to study changes in nitrogen dioxide during the pandemic. These include the TROPOspheric Monitoring Instrument (TROPOMI) instrument aboard the European Commission’s Copernicus Sentinel-5P satellite. Launched in 2016, TROPOMI provides higher resolution observations than OMI.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['no2']
        }
      }
    },
    {
      id: 'reinforcing-measurements-nighttime-lights',
      name: 'Reinforcing Measurements: Nighttime Lights',
      contentComp: (
        <>
          <p>
            Changes in nighttime lights during the pandemic can also be tied to changes in nitrogen dioxide levels if the data are properly processed and interpreted.This is because nitrogen dioxide is primarily emitted from burning fossi fuels, and highways light up on nighttime satellite imagery when vehicles are present. Here we see the illuminated web of highways connecting the Los Angeles metropolitan region. Researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and shutdown measures during the pandemic. These data, collected by the Visible Infrared Imaging Radiometer Suite (VIIRS) instrument aboard the joint NASA-National Oceanic and Atmospheric Administration (NOAA) Suomi-National Polar-orbiting Partnership (NPP) satellite, correlate with changes seen in car traffic on the ground – and, therefore, nitrogen dioxide reductions. While this research is still ongoing, the 31% reduction in nitrogen dioxide levels in Los Angeles during the height of pandemic-related lockdowns compared to recent years seems to correspond with a 15% reduction in nighttime lights over highways during the same period.
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['nightlights-viirs'],
          date: '2020-03-01T00:00:00Z',
          bbox: [-118.6759, 33.4267, -117.0733, 34.3439],
          spotlight: 'la',
          compare: {
            mapLabel: () => 'February 1, 2020 compared to March 1, 2020',
            compareDate: () => new Date('2020-02-01T00:00:00Z')
          }
        }
      }
    },
    {
      id: 'measuring-pollution-on-the-ground',
      name: 'Measuring Air Pollution on the Ground at Airports',
      sections: [
        {
          id: 'part1',
          name: 'Part 1',
          contentComp: (
            <>
              <p>
                New research during the pandemic is also looking at how COVID-related travel bans are impacting air quality around airports. Current conditions create a unique opportunity to study airport-related pollutants, especially nitrogen dioxide and formaldehyde. While travel bans and strict regulations around air travel have been in place, air traffic has yet to return to previous levels, and many planes remain grounded. Here we see Planet Labs imagery using artificial intelligence to detect grounded airplanes at the Hartsfield-Jackson Atlanta International airport in March 2020. During this time, the airport reported a decline of 85% in passenger traffic.
              </p>
            </>
          )
          // Data visual: Planet Labs grounded plane imagery at BWI/ATL airport
        },
        {
          id: 'part2',
          name: 'Part 2',
          contentComp: (
            <>
              <p>
                Scientists behind the research studying air quality at airports during the pandemic explained that because people are seeing better air quality with less traffic during shutdowns, they may also wonder if this is what the future could look like if we relied more heavily on electric vehicles. Unlike cars, however, airplanes are not expected to become electric anytime soon. Therefore, Scientists installed two sensors at the Baltimore-Washington International Airport and two sensors at the Hartsfield-Jackson Atlanta International Airport to better characterize how airplanes contribute to air pollution. Researchers are comparing the on-the-ground sensor information with satellite information from TROPOMI. So far, they have found that nitrogen dioxide hotspots in Atlanta shifted from the airport, seen here, to the city center from April-June 2020. By September, however, satellites revealed the airport had reemerged as a dominant nitrogen dioxide emission source.
              </p>
            </>
          ),
          visual: {
            type: 'multi-map',
            data: {
              bbox: [-84.5549, 33.5242, -84.2198, 33.9889],
              data: {
                name: 'NO₂ levels',
                legend: {
                  type: 'gradient',
                  min: '1',
                  max: '3.5',
                  stops: [
                    '#99c5e0',
                    '#f9eaa9',
                    '#f7765d',
                    '#c13b72',
                    '#461070',
                    '#050308'
                  ]
                },
                info: 'Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.'
              },
              maps: [
                {
                  id: 'no2-mar-2019',
                  label: 'March 15 - April 2019',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2019_03.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-may-2019',
                  label: 'May 2019',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2019_05.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-jun-2019',
                  label: 'June 2019',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2019_06.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-jul-2019',
                  label: 'July 2019',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2019_07.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-aug-2019',
                  label: 'August 2019',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2019_08.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-mar-2020',
                  label: 'March 15 - April 2020',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2020_03.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-may-2020',
                  label: 'May 2020',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2020_05.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-jun-2020',
                  label: 'June 2020',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2020_06.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-jul-2020',
                  label: 'July 2020',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2020_07.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                },
                {
                  id: 'no2-aug-2020',
                  label: 'August 2020',
                  source: {
                    type: 'raster',
                    tiles: [
                      `${api}/{z}/{x}/{y}@1x?url=s3://covid-eo-data/standalone/atlanta-no2/Atlanta_2020_08.cog.tif&resampling_method=bilinear&bidx=1&rescale=1%2C3.5&color_map=custom_no2`
                    ]
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      id: 'seeing-rebounds',
      name: 'Seeing Rebounds in NO',
      contentComp: (
        <>
          <p>
            After the initial shock of COVID-related shutdowns in the spring, communities worldwide began to reopen and gradually increase mobility. Cars returned to the road, and travel restrictions slowly eased. These resumptions corresponded with relative increases in nitrogen dioxide levels and other air pollutants, as air quality levels began to return to pre-pandemic levels. This demonstrates how quickly atmospheric nitrogen dioxide responds to reductions in emissions. They will persist as long as emissions persist and decline rapidly if emissions are reduced. NASA scientists will continue to monitor nitrogen dioxide levels and long-term trends around the world. NASA is expected to launch its Tropospheric Emissions: Monitoring of Pollution, (TEMPO) instrument in 2022, which will provide hourly, high-resolution measurements of nitrogen dioxide, ozone, and other air pollutants across North America, improving future air quality forecasts.
          </p>
          <p>
            <Link
              to='/discoveries/climate/climate-change-and-covid'
              title='Explore How COVID-19 Is Affecting Earth&apos;s Climate'
            >
              Explore How COVID-19 Is Affecting Earth&apos;s Climate
            </Link>
          </p>
        </>
      ),
      visual: {
        type: 'map-layer',
        data: {
          layers: ['no2'],
          bbox: [114.84, 38.32, 117.85, 41.22],
          compare: {
            mapLabel: () => 'February 2020 compared current NO₂ levels',
            layers: ['no2'],
            date: '2020-02-01T00:00:00Z'
          }
        }
      }
    }
  ]
};
