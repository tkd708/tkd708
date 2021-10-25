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

const CV: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>CV</title>
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
                <h2>EDUCATION</h2>
                <hr />
                <h3>
                  Ph.D. Candidate, Environmental Sciences, Queensland University of Technology,
                  Brisbane
                </h3>
                <p css={TextRight}>Feb 2019 - Present</p>
                <p>
                  Research topic: Denitrification losses in response to nitrogen fertiliser rates in
                  Australian sugarcane systems
                </p>
                <p>
                  Supervisor: Prof Peter Grace, Dr Johannes Friedl, Dr David Rowlings and Dr Clemens
                  Scheer
                </p>
                <br />
                <h3>Master of Science, Agricultural Development, University of Tokyo, Tokyo</h3>
                <p css={TextRight}>Sept. 2016 - Aug. 2018</p>
                <p>
                  International Program in Agricultural Development Studies (IPADS) (conducted in
                  English)
                </p>
                <p>
                  Thesis: Application of APSIM-Oryza2000 to sloped rice fields with contour-levee
                  irrigation system in Colombia for efficient water use
                </p>
                <p>Supervisor: Prof Kensuke Okada</p>
                <br />
                <h3>Exchange Program, University of Sheffield, Sheffield</h3>
                <p css={TextRight}>Sept. 2015 - July 2016</p>
                <p>University-wide exchange program for one academic year</p>
                <p>Subjects: Economics, Statistics, Biology</p>
                <br />
                <h3>Bachelor of Science, Agriculture, University of Tokyo, Tokyo</h3>
                <p css={TextRight}>Apr. 2012 - Sept. 2016</p>
                <p>
                  Thesis: Analysis of the applicability of alternate wetting and drying (AWD)
                  irrigation as a watersaving rice production technology through a modelling
                  approach
                </p>
                <p>Supervisor: Prof Kensuke Okada and Dr Taro Takahashi</p>
                <br />

                <h2>WORK EXPERIENCE</h2>
                <hr />
                <h3>Research Assisstant at Centre for Agriculture and the Bioeconomy, Brisbane</h3>
                <p css={TextRight}>Mar. 2021 – Dec. 2021</p>
                <p>
                  Working in a Grain Research & Development Corporation (GRDC) project to examine
                  fertiliser N use efficiency and N loss pathways in grain cropping systems in
                  Australia
                </p>
                <p>
                  Testing APSIM (Classic and Next Gen) against <sup>15</sup>N field trials datasets
                  to simulate fertiliser N recovery and N losses
                </p>
                <p>
                  Identifying the potential to improve algorithms related to N cyclying processes in
                  APSIM
                </p>
                <br />
                <h3>
                  Visiting Researcher at International Center of Tropical Agriculture (CIAT), Cali
                </h3>
                <p css={TextRight}>Aug. 2017 – Mar. 2018</p>
                <p>
                  Worked in a project SATREPS between Japan and Colombia to develop and to
                  disseminate resource saving rice production systems in Colombia
                </p>
                <p>
                  Conducted field experiments in farmer's fields in Ibagué, Colombia to examine
                  toposequential effects on hydrology and on rice growth in collaboration with local
                  staff of Colombian National Rice Producers Federation (FEDEARROZ)
                </p>
                <p>
                  Calibrated and validated APSIM-Oryza2000, followed by scenario analysis with the
                  model to optimise farmers' irrigation management under different weather
                  conditions
                </p>
                <p>
                  Suggested the optimised irrigation management to local farmers and extension
                  workers by workshop presentation and field demonstration
                </p>
                <br />
                <h3>Marketing research intern at BASF Japan, Tokyo</h3>
                <p css={TextRight}>Feb. 2017 – Apr. 2017</p>
                <p>
                  Worked in a project to revise the strategy of pesticide marketing of BASF Japan
                  focusing on emerging agricultural companies in Kanto region, Japan
                </p>
                <p>
                  Analysed published market information for an overview of the pesticide market and
                  interviewed agricultural companies in Kanto region to reveal their purchasing
                  power from the perspectives of cultivation system and sales route
                </p>
                <p>
                  Had a final presentation on an evaluation of a new pesticide marketing strategy
                  approaching influential agricultural companies to division members and executives
                  of BASF Japan
                </p>
                <br />
                <h2>AWARDS</h2>
                <hr />
                <p>
                  Green Talents 2021, from German Federal Ministry of Education and Research (BMBF)
                  (Oct 2021)
                </p>
                <p>
                  Australian Government Research Training Program, from Queensland University of
                  Technology (Feb 2019)
                </p>
                <p>
                  Tobitate! Study Abroad Japan Program, from the Ministry of Education, Culture,
                  Sports, Science and Technology (July 2017)
                </p>
                <p>
                  Promoting Doctoral Course Programs, from the Graduate School of Agriculture and
                  Life Science, University of Tokyo (July 2017)
                </p>
                <p>
                  Scholarship program for postgraduates, from Japan Student Services Organization
                  (Sept. 2016)
                </p>
                <br />
                <h2>LANGUAGES</h2>
                <hr />
                <p>Japanese : Native</p>
                <p>
                  English : Advanced (International English Language Testing System – IELTS 7.5)
                </p>
                <p>
                  Spanish : Upper Intermediate (Diplomas de Español como Lengua Extranjera – DELE
                  B2)
                </p>
                <p>French : Beginner</p>
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

export default CV;
