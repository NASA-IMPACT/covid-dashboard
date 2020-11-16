import React from 'react';

export default {
  id: 'air-quality',
  name: 'Air Quality',
  publishDate: '2020/08/10',
  chapters: [
    {
      id: 'ch1',
      name: 'Chapter 1',
      contentComp: <p>Content as a react component</p>
    },
    {
      id: 'ch2',
      name: 'The quality of the air',
      contentComp: (
        <>
          <p>
            During the COVID-19 pandemic, scientists have observed considerable
            decreases in nitrogen dioxide levels around the world. These
            decreases are predominantly associated with changing human behavior
            in response to the spread of COVID-19. As communities worldwide have
            implemented lockdown restrictions in an attempt to stem the spread
            of the virus, the reduction in human transportation activity has
            resulted in less NO2 being emitted into the atmosphere.
          </p>
          <p>
            These changes are particularly apparent over large urban areas and
            economic corridors, which typically have high levels of automobile
            traffic, airline flights, and other related activity.
          </p>
        </>
      )
    }
  ]
};
