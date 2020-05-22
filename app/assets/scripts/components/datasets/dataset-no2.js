import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Prose from '../../styles/type/prose';
import Constrainer from '../../styles/constrainer';
import Gridder from '../../styles/gridder';
import InpageHGroup from '../../styles/inpage-hgroup';
import Button from '../../styles/button/button';
import { Fold, FoldDetails, FoldTitle } from '../../styles/fold';
import MediaImage from '../../styles/media-image';
import {
  IntroLead,
  IntroDescription,
  StatsFold,
  StatsHeader,
  StatsList,
  DetectionLead,
  DetectionFold
} from '../../styles/datasets';

import { themeVal } from '../../styles/utils/general';
import { glsp } from '../../styles/utils/theme-values';
import Heading from '../../styles/type/heading';

const DetectionStep1 = styled(Fold)`
  padding-bottom: 0;

  ${Gridder} {
    align-items: center;
  }

  ${MediaImage} {
    grid-column: full-start / content-7;
    grid-row: 1;
  }

  ${FoldDetails} {
    grid-column: content-8 / content-end;
    text-align: left;
  }
`;

const DetectionStep2 = styled(Fold)`
  ${Gridder} {
    align-items: center;
  }

  ${FoldDetails} {
    grid-column: content-start / content-6;
    text-align: left;
    grid-row: 1;
  }

  ${MediaImage} {
    grid-column: content-7 / full-end;
    grid-row: 1;
  }
`;

const EffectEntry = styled.section`
  ${Heading} {
    margin-bottom: ${glsp(1)};
  }
`;

const EffectsFold = styled(Fold)`
  background: ${themeVal('color.baseAlphaB')};

  ${EffectEntry} {
    grid-row: 3;
    grid-column: span 4;
  }

  ${/* sc-selector */EffectEntry}:first-of-type {
    grid-row: 2;
    grid-column: 5 / span 8;
  }
`;

const FactsFold = styled(Fold)`
  padding-bottom: ${glsp(10)};

  ${Gridder} {
    align-items: center;
  }

  /* stylelint-disable-next-line */
  ${InpageHGroup} {
    grid-row: 1;
    grid-column: content-start / content-7;
  }

  ${Prose} {
    grid-column: content-start / content-end;
    grid-row: 2;
    margin-bottom: ${glsp(4)};
  }

  ${MediaImage} {
    grid-column: content-6 / full-end;
    grid-row: 3;

    figcaption {
      max-width: 46rem;
      padding-right: ${glsp(2)};
    }
  }
`;

const metadata = {
  id: 'no2',
  name: 'Nitrogen Dioxide',
  color: '#2276AC'
};

class NO2LongForm extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Fold>
          <Constrainer>
            <IntroLead>
              Some intro lead, like the key takeaway of this particular dataset
            </IntroLead>
            <IntroDescription>
              <p>Some more in depth information</p>
              <p>
                Consectetur adipisicing elit. Vitae laboriosam recusandae esse,
                rem hic nobis. Labore voluptatum eligendi nisi eius, quod ipsa
                soluta odio placeat hic ad, repudiandae, velit earum!
              </p>
            </IntroDescription>
          </Constrainer>
        </Fold>

        <StatsFold>
          <Constrainer>
            <StatsHeader>
              <Heading as='h2'>This dataset in the wild</Heading>
              <Button
                as={NavLink}
                size='large'
                variation='primary-raised-dark'
                title='Go to map'
                to='/'
              >
                View global map
              </Button>
            </StatsHeader>
            <StatsList dashColor={metadata.color}>
              <dt>Last year</dt>
              <dd>100</dd>
              <dt>Last month</dt>
              <dd>2000</dd>
            </StatsList>
          </Constrainer>
        </StatsFold>

        <DetectionFold>
          <Constrainer>
            <FoldTitle size='xlarge'>How was this created?</FoldTitle>
          </Constrainer>

          <DetectionStep1>
            <Gridder>
              <FoldDetails>
                <InpageHGroup
                  suptitle='01'
                  title='Research'
                  dashColor={metadata.color}
                />
                <Prose>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam rerum minus nesciunt necessitatibus ea id veritatis,
                    et ut porro possimus accusamus assumenda, pariatur fugit
                    praesentium magnam enim vero non, a repellat quae distinctio
                    neque voluptatem. Dignissimos saepe animi praesentium
                    sapiente.
                  </p>
                  <p>
                    Neque reprehenderit ullam numquam nulla tempore ea natus
                    voluptates. Sunt dolor reiciendis dolore impedit asperiores
                    fugiat, quas saepe quibusdam itaque deleniti ratione
                    corporis incidunt dignissimos quia nostrum aliquam possimus
                    unde, voluptatem temporibus repellendus aliquid officia.
                    Molestiae sit animi sequi velit consectetur est facere
                    excepturi possimus incidunt! Pariatur blanditiis illo eaque
                    asperiores harum.
                  </p>
                </Prose>
              </FoldDetails>
              <MediaImage
                src='https://placeimg.com/640/480/nature?v1'
                alt='Image'
              />
            </Gridder>
          </DetectionStep1>

          <DetectionStep2>
            <Gridder>
              <FoldDetails>
                <InpageHGroup
                  suptitle='02'
                  title='Peer review'
                  dashColor={metadata.color}
                />
                <Prose>
                  <p>
                    Blanditiis ea commodi vero ipsa hic nam corporis! At
                    similique aspernatur ab, praesentium veniam placeat autem
                    iste veritatis voluptates amet nesciunt suscipit optio qui
                    voluptatum tempore. Dolores quaerat consequuntur nulla vero
                    expedita.
                  </p>
                </Prose>
              </FoldDetails>
              <MediaImage
                src='https://placeimg.com/640/480/nature?v2'
                alt='Image'
              />
            </Gridder>
          </DetectionStep2>

          <DetectionLead>
            <Gridder>
              <p>
                Some important lead, like the conclusion of the previous topic.
                Distinctio ullam quaerat esse id consectetur vitae praesentium
                facilis facere voluptate.
              </p>
            </Gridder>
          </DetectionLead>
        </DetectionFold>

        <EffectsFold>
          <Constrainer>
            <FoldTitle size='xlarge'>
              Some content in the form of columns
            </FoldTitle>

            <EffectEntry>
              <Heading as='h2'>Ducimus</Heading>
              <p>
                Exercitationem voluptatum expedita vel rerum nemo quidem quas
                error. Assumenda harum dolores quia error illo odio et numquam
                magnam qui? Dolores dolorem quisquam aperiam id a ipsum rerum
                nesciunt magnam pariatur? Ipsa nemo sequi ad recusandae commodi
                non, voluptatum nobis iste a temporibus quidem natus labore
                ullam distinctio illum nesciunt molestiae! Ducimus autem ea
                aperiam in maxime quae cupiditate magni aut? Quis, blanditiis.
                Ipsum esse sapiente ex reprehenderit veniam aliquam maiores
                labore.
              </p>
            </EffectEntry>
            <EffectEntry>
              <Heading as='h2'>Aspernatur</Heading>
              <p>
                Ab quibusdam, consequatur magni magnam nisi molestiae doloremque
                architecto hic reiciendis atque error accusamus vero sapiente,
                in enim! Nam, iste quas cum doloremque molestiae autem odit
                animi eius error aspernatur voluptas nobis.
              </p>
            </EffectEntry>
            <EffectEntry>
              <Heading as='h2'>Flora</Heading>
              <p>
                Temporibus non aliquid numquam eius. Doloremque dolore fugit,
                quam qui nihil possimus inventore. Provident nisi dignissimos
                aliquid assumenda dolor nemo adipisci voluptas.
              </p>
            </EffectEntry>
            <EffectEntry>
              <Heading as='h2'>Nobis</Heading>
              <p>
                Officiis nulla aliquam deserunt facilis consequuntur laborum
                voluptas nobis eaque, in aperiam officia excepturi eius,
                provident porro? Nobis praesentium quis eos excepturi.
              </p>
            </EffectEntry>
          </Constrainer>
        </EffectsFold>

        <FactsFold>
          <Gridder>
            <InpageHGroup
              suptitle='Known facts'
              title='Earum eaque repudiandae, maxime incidunt modi porro quod quo reprehenderit autem esse.'
              dashColor={metadata.color}
            />
            <Prose numColumns={2}>
              <p>
                Distinctio sunt sequi est, ex velit, eligendi id ducimus nemo
                vero tempora, maiores laudantium dignissimos saepe beatae facere
                facilis in corrupti? Facere, modi. Voluptatum eum adipisci ad
                illum explicabo eveniet facere. Unde enim tempore dolore
                doloribus inventore obcaecati aspernatur cum possimus voluptatum
                fugit omnis quis molestiae id eos consectetur tempora delectus
                quos maiores voluptatem quas doloremque, consequatur ex impedit.
                Iure unde est quae doloribus necessitatibus libero aliquid
                deleniti odit quas. Iste vel assumenda quae optio quo quam
                labore, asperiores provident. A ducimus ipsa amet ullam iste
                consequuntur ex, delectus quaerat qui perferendis.
              </p>
            </Prose>
            <MediaImage
              src='https://placeimg.com/640/480/nature?v3'
              alt='Image'
            >
              [See Author et al. 2017 Obcaecati, unde sit commodi molestiae
              placeat ipsa].
            </MediaImage>
          </Gridder>
        </FactsFold>
      </React.Fragment>
    );
  }
}

NO2LongForm.propTypes = {};

export default {
  ...metadata,
  LongForm: NO2LongForm
};
