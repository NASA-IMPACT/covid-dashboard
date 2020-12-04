import React from 'react';
import { Link } from 'react-router-dom';

const summaries = {
  be: (
    <>
      <p>
        Chinese authorities suspended travel and closed businesses in late
        January 2020 in response to the novel coronavirus. Satellite
        observations since then have revealed changes in activity for Beijing’s
        21 million residents, including changes in fossil fuel emissions and
        other economic activity.
      </p>
      <p>
        Lockdowns and social distancing measures implemented in response to the
        coronavirus pandemic led to significant but temporary reductions in
        nitrogen dioxide (NO<sub>2</sub>) and carbon dioxide (CO<sub>2</sub>) emissions from fossil
        fuel combustion and other human activities.
      </p>
    </>
  ),
  gh: (
    <>
      <p>
        Located on the North Sea on the coast of Belgium, the Port of Ghent is a
        highly trafficked seaport. By focusing on changes in this typically
        bustling area, researchers are able to compare changes in nightlights,
        an indicator of economic activity before and after novel coronavirus
        lockdowns began.
      </p>
    </>
  ),
  du: (
    <>
      <p>
        The Port of Dunkirk is the third-largest maritime port in northern
        France. Located on the busy North Sea, the port is well known for the
        comings and goings of heavy cargo barges. In early March, following
        French government guidance, the port began to limit activity in response
        to the novel coronavirus.
      </p>
    </>
  ),
  la: (
    <>
      <p>
        California was the first state in the U.S. to set mandatory stay-at-home
        restrictions in an attempt to slow the spread of the novel coronavirus.
        These orders went into effect for the whole state on March 19, 2020,
        including for the city of Los Angeles and its approximately 4 million
        residents. During the lockdown, LA saw cleaner air and quieter streets.
      </p>
    </>
  ),
  ny: (
    <>
      <p>
        As COVID-19 cases soared in New York City, more than 8 million residents
        sheltered-in-place or fled the city. It remained in lockdown with strict
        social distancing measures in place for more than two months, from March
        through June 2020.
      </p>
      <p>
        Satellite data reveal how changes in fossil fuel emissions and other
        economic activity during coronavirus-related lockdowns affected New York
        City’s air, land, and water. These data help visualize how
        neighborhoods, commercial centers, and more changed due to social
        distancing measures.
      </p>
    </>
  ),
  sf: (
    <>
      <p>
        California was one of the first states to implement COVID-19
        restrictions. A shelter-in-place mandate went into effect for six
        counties in the San Francisco metropolitan area on March 17, 2020. While
        the mandate was in effect, non-essential businesses were closed, and
        approximately 6.7 million residents in the area were asked to stay home.
      </p>
      <p>
        Satellite data reveal clearing of the air and improvements in water
        quality during the lockdown.
      </p>
    </>
  ),
  togo: (
    <>
      <p>
        The effects of COVID-19 shutdowns in Togo, including many months of curfews, severely limited the ability of hundreds of thousands of the country’s small farmers to produce an adequate food supply, as well as to cultivate formerly robust crops, such as soy and cotton.
      </p>
      <p>
        To help its farmers, the Togolese government used a cropland data map developed by NASA’s food security and agriculture program, known as NASA Harvest, to develop a loan program that would help fund the cost of farming essentials.
      </p>
      <p>
        In the past, farmers eligible for such loans would have been identified using Togo’s census data. However, the existing census only accounts for growers who list their primary occupation as farming. This vastly underestimates the number of informal smallholder growers impacted by the pandemic, who rely on subsistence farming to live. This is where satellite data can help fill in the gaps.
      </p>
      <p>
        When rapid action was needed and mobility across the country was limited due to the COVID-19 outbreak, satellite data offered an effective and rapid way to map the country’s distribution of croplands and characterize the nature of agricultural fields during the pandemic.
      </p>
      <p>
        NASA Harvest developed a national-level, satellite-derived cropland map for Togo at 10-meter resolution within a 10-day timeframe using data from the European Space Agency’s Copernicus Sentinel 2 satellite, the NASA-USGS Landsat satellites, and with data from commercial partner Planet Inc. These data, alongside poverty and census information, rapidly and effectively identified priority areas for the loan program. With the cropland maps, Togolese government officials had trustworthy information on the physical size and geographic location of agricultural lands that census data might have missed.
      </p>
    </>
  ),
  tk: (
    <>
      <p>
        Japan declared a state of emergency in its two largest cities, Tokyo and
        Osaka, and five of their surrounding prefectures in response to the
        coronavirus pandemic on April 7, 2020. While the declaration allowed
        these municipalities to request that residents remain at home, it was
        not mandatory.
      </p>
      <p>
        In Tokyo and around the world, researchers are using satellite data to
        study how stay-at-home orders are affecting the environment around us.
        Nightlights data track variations in energy use, migration, and
        transportation, and nitrogen dioxide data track changes in
        transportation and energy use in response to social distancing and
        lockdown measures.{' '}
      </p>
    </>
  ),
  gl: (
    <>
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
    </>
  )
};

export default summaries;
