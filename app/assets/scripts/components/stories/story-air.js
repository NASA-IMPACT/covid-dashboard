import React from 'react';

export default {
  id: 'air-quality',
  name: 'Air Quality During COVID-19 Shutdowns',
  publishDate: '2020/12/01',
  chapters: [
    {
      id: 'aq-and-covid',
      name: 'Air Quality and COVID-19',
      contentComp: (
        <>
          <p>
            When governments began implementing lockdowns at the start of the COVID-19 pandemic, scientists wondered how the atmosphere would respond to the sudden change in human behavior. With people largely confined to their homes to slow the spread of the virus, there were likely to be fewer cars, planes, and ships burning and emitting fossil fuels. Nearly a year into the pandemic, these scenarios have largely played out: during the strictest lockdown periods, locations around the world experienced substantial reductions in transportation-related fossil fuel emissions. However, those declines have ultimately proven to be short-lived, and the impacts on specific air pollutants have been varied. Today, air quality levels are beginning to approach pre-pandemic levels, and scientists are just beginning to dive into the new measurements collected throughout this unprecedented time.
          </p>
        </>
      )
    },
    {
      id: 'what-makes-aq-good-or-bad',
      name: 'What Makes Air Quality Good or Bad?',
      contentComp: (
        <>
          <p>
            Cities are easy to spot from space. Choose any large urban area around the world, and you’re likely to see similar things: dense population centers, complex webs of highways, and, more often than not, smog. Smog is the hazy curtain of air that often hangs over cities. It occurs when nitrogen dioxide (NO<sub>2</sub>) produced from fossil fuel emissions from gasoline in cars or coal in powerplants chemically reacts with sunlight. Thick smog is harmful to breathe and can significantly reduce visibility. During lockdowns, cities around the world experienced sharp reductions in nitrogen dioxide emissions, and smog began to vanish. Skies were bluer, air was cleaner, and, in some places, views previously obscured by air pollution were suddenly revealed. In Los Angeles, nitrogen dioxide levels fell by more than 30% during the height of COVID-related lockdowns. Other large cities around the world experienced similar reductions.
          </p>
        </>
      )
    },
    {
      id: 'cities-experiencing-clearer-air',
      name: 'Cities Experiencing Clearer Air During Lockdowns',
      contentComp: (
        <>
          <p>
            When Chinese authorities suspended travel and closed businesses in late January 2020 in response to the novel coronavirus, Beijing’s nearly 21 million residents saw huge drops in their local nitrogen dioxide levels. In February 2020, concentrations fell by nearly 30% compared to the previous five-year average.
          </p>
        </>
      )
    },
    {
      id: 'cities-experiencing-clearer-air-continued',
      name: 'Cities Experiencing Clearer Air During Lockdowns',
      contentComp: (
        <>
          <p>
            Cities across South America experienced similar declines in NO<sub>2</sub>. Lima, Peru had some of the most substantial reductions, with nitrogen dioxide levels falling approximately 70% below normal levels.
          </p>
        </>
      )
    },
    {
      id: 'lockdowns-no2',
      name: '“Like Flipping a Switch”: Lockdowns and NO₂',
      contentComp: (
        <>
          <p>
            You might think immediate improvements in air quality during shutdowns would be obvious. However, in reality, the way our atmosphere behaves isn’t so clear-cut. Nitrogen dioxide is only one component of air quality: sulfur dioxide, ozone, formaldehyde, and carbon dioxide along with a host of other atmospheric constituents also influence the quality of the air we breathe. The difference in nitrogen dioxide is that it has a relatively short lifetime in the atmosphere. In other words, once it’s emitted, it only lasts a few hours before it disappears. Therefore, once communities entered lockdowns and their mobility was severely restricted, the effect on NO<sub>2</sub> concentrations was the equivalent of flipping a switch. Be that as it may, this isn’t the case with all air pollutants.
          </p>
        </>
      )
    },
    {
      id: 'lockdowns-no2-continued',
      name: '“Like Flipping a Switch”: Lockdowns and NO₂',
      contentComp: (
        <>
          <p>
            Even with the strong correlation between NO<sub>2</sub> and the combustion of fossil fuels, the relationship between nitrogen dioxide and lockdowns isn’t straightforward either. Atmospheric concentrations of nitrogen dioxide naturally fluctuate throughout the year, and weather patterns also influence its concentrations. For example, nitrogen dioxide typically falls dramatically during spring and summer months, and rain and wind increase its dispersion, lowering local concentrations.Therefore, during the COVID-19 pandemic, scientists are careful to attribute observed changes solely to changes in our behavior and are also looking to determine whether some of the reductions are the result of natural variation.
          </p>
        </>
      )
    },
    {
      id: 'seeing-air-pollution-from-space',
      name: 'Seeing Air Pollution from Space',
      contentComp: (
        <>
          <p>
            NASA is able to observe global nitrogen dioxide levels using the OMI instrument (pronounced OH-me) aboard the Aura satellite. A joint endeavor between NASA and the Royal Netherlands Meteorological Institute (KNMI), OMI has been taking continuous global measurements of nitrogen dioxide since 2004. So, when the pandemic hit, OMI was ready to observe subsequent changes in NO<sub>2</sub> levels, and it continues to capture these measurements throughout various stages of the pandemic. NASA scientists are also leveraging other space-based instruments from international partners to study NO<sub>2</sub>. Specifically, the TROPOMI instrument aboard the European Commission’s Copernicus Sentinel-5P satellite helps us see nitrogen dioxide levels in greater detail. TROPOMI and OMI measurements make a great team: TROPOMI provides higher spatial resolution data than OMI, but OMI’s longer data record provides crucial context for TROPOMI observations.
          </p>
        </>
      )
    },
    {
      id: 'reinforcing-measurements-nighttime-lights',
      name: 'Reinforcing Measurements: Nighttime Lights',
      contentComp: (
        <>
          <p>
            Because nitrogen dioxide is primarily emitted from burning fossil fuels, changes in its atmospheric concentration can be tied to changes in human activity if the data are properly processed and interpreted. These connections are underscored when comparing different NASA datasets, like observations in changing nightlights during the pandemic. Here we see the illuminated web of highways connecting the Los Angeles metropolitan region. Researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and lockdown measures. These data, collected by the VIIRS instrument aboard the joint NASA-National Oceanic and Atmospheric Administration (NOAA) Suomi-NPP satellite, correlate with changes seen in car traffic on the ground – and, therefore, nitrogen dioxide reductions. While this research is still ongoing, the 31% reduction in NO<sub>2</sub> levels in Los Angeles during the height of pandemic-related lockdowns compared to recent years seems to correspond with a 15% reduction in nighttime lights over highways during the same period.
          </p>
        </>
      )
    },
    {
      id: 'measuring-pollution-on-the-ground',
      name: 'Measuring Air Pollution on the Ground at Airports',
      contentComp: (
        <>
          <p>
            New research during the pandemic is also looking at how COVID-related travel bans are impacting air quality around airports. Current conditions create a unique opportunity to study airport-related pollutants, especially nitrogen dioxide and formaldehyde. While travel bans and strict regulations around air travel are in place, air traffic has yet to return to normal levels, and many planes remain grounded. Here we see Planet Labs imagery using artificial intelligence to detect grounded airplanes at the Baltimore-Washington International Airport (BWI). During the pandemic, BWI reported that air traffic there had been reduced by around 60 percent. Scientists expect this footprint and the footprint of air travel across the world will likely return to its former shape as travel policies are gradually relaxed.
          </p>
        </>
      )
    },
    {
      id: 'measuring-pollution-on-the-ground-continued',
      name: 'Measuring Air Pollution on the Ground at Airports, Continued',
      contentComp: (
        <>
          <p>
            Dr. Jennifer Kaiser, the principal investigator behind the research studying air quality at airports during the pandemic, explained that during lockdowns, people are seeing better air quality with less traffic. Therefore, they may also wonder if this is what the future could look like if we relied more heavily on electric vehicles than we do now. Yet, airplanes are not going to be electric anytime soon, Kaiser explained. So, she and her team have installed two sensors at both BWI and the Hartsfield-Jackson Atlanta International Airport to identify air pollutant levels around airports during the pandemic. The sensors, which are part of NASA’s Pandora Project, use spectrometers to identify chemicals in the air. Kaiser and her team are comparing the on-the-ground sensor information with satellite information from TROPOMI. So far, she and her group have found that rebounds in nitrogen dioxide at airports have been slower to occur than those from automobile traffic.
          </p>
        </>
      )
    },
    {
      id: 'seeing-rebounds',
      name: 'Seeing Rebounds',
      contentComp: (
        <>
          <p>
            After the initial shock of COVID-related shutdowns in the spring, communities worldwide have begun to reopen and gradually increase mobility. Cars have returned to the road, and travel restrictions have been slowly easing. These resumptions in behavior have subsequently corresponded with relative increases in nitrogen dioxide levels and other air pollutants, as air quality levels begin to return to pre-pandemic levels. Therefore, any long-term gains in overall air quality from the temporary reductions during short-term lockdowns appears to be minimal with regard to nitrogen dioxide. Looking to the future, NASA scientists will continue to monitor nitrogen dioxide levels and long-term trends around the world and at home. NASA is expected to launch its Tropospheric Emissions: Monitoring of Pollution, (TEMPO) instrument in 2022, which will provide hourly, high-resolution measurements of nitrogen dioxide, ozone, and other air pollutants across North America, revolutionizing future air quality forecasts.
          </p>
        </>
      )
    }
  ]
};
