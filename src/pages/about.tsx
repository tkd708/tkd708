import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Naoya Takeda</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>
                  Welcome to my website! Here I'm intorducing my interests, activities and
                  experineces... like an enriched CV. Too wordy at the moment, I'm going to make it
                  simpler but more colourful!
                </p>
                <h2> VISION </h2>
                <hr />
                <p>
                  Let's say, sustainable future? To be honest, I'm still developing my own
                  (professional) goals and trying to make it into a pitch... As a sustainability
                  researcher, mine would align definitely with SDGs or planetary boundary but I
                  would like to define my own small part to play. Tentatively, I'm dedicated to
                  sustainable agricutlural development through scientific research, software
                  engineering and entrepreneurship approaches!
                </p>
                <br />

                <h2> ACTIVITIES </h2>
                <hr />
                <h3> Sustainable agriculture research</h3>
                <p>
                  Agriculture is an essential industry in the world but also substantialy
                  responsible for adverse environmental effects such as global warming,
                  environmental pollution and threatning biodiversity. Enhancing resource use
                  efficiency is a global challenge to achieve sufficient agricultural production
                  with smaller environmental impacts. I'm working on this topic from the
                  perspectives of nitrous oxide emissions, N use efficiency and cropping system
                  modelling!
                </p>
                <h3> Web/mobile application development</h3>
                <p>
                  The rapid spread of the internet infrastructure and hardwares has been enabling a
                  lot more things online. I believe development of software applications can aid
                  solving wide range of social issues by connecting people, information and
                  activities across borders. In particular, I'm interested in developing a platform
                  which enables users to access research outcomes and researchers to receive
                  feedback and actual activities of the users.
                </p>
                <h3>International development</h3>
                <p>
                  I love travelling, languages, and variety of cultual experiences...my current
                  carrier has started actually with these simple interests. I"m learning as many
                  languages as possible (currently Spanish and French), exploring the world for both
                  work and vacation and immersing myself in the local culture. In the future
                  (hopefully not too distant), I would like to contribute to connecting people and
                  creating better future together.
                </p>
                <br />
                <h2>PROJECTS</h2>
                <hr />
                <h3>Sugar</h3>
                <p>
                  My PhD project is optimisation of N fertiliser management to reduce N2O emissions
                  and enhance N use efficiency. The project includes field trials using automated
                  GHG monitoring system and 15N-labelled urea fertiliser as well as simulation
                  analyses using APSIM.
                </p>
                <h3>GRDC APSIM</h3>
                <p>
                  I'm joining this project as a research assisstant on top of my PhD research. This
                  project involves NANORP project datasets of N2O emissions and 15N recoveries and
                  aims at modelling fertiliser N use efficienct as well as optimising N fertiliser
                  management.
                </p>
                <h3>Delta</h3>
                <p>
                  This is my personal project of mobile application development. I had been
                  participating in Fellows Programme of FoundX and establishing a service to support
                  language learnning.
                </p>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

const TextRight = css`
  text-align: right;
`;

export default About;
