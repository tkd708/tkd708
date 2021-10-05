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

const Portfolio: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>Portfolio</title>
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
              <PostFullTitle className="post-full-title">Portfolio</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>Here are my publication, developped softwares and project works.</p>

                <h2> JOURNAL ARTICLES </h2>
                <hr />
                <p>
                  Takeda, N., Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P., 2021. No
                  sugar yield gains but larger fertiliser <sup>15</sup>N loss with increasing N
                  rates in an intensive sugarcane system. Nutrient Cycling in Agroecosystems,
                  121:99-113.
                </p>
                <a href="https://doi.org/10.1007/s10705-021-10167-0">Publisher</a>
                <p></p>
                <a href="https://urldefense.com/v3/__https://rdcu.be/ct1VB__;!!NVzLfOphnbDXSw!VwVOMIth0StCicuggTstjh-SHSjultPXdzcmTj1NZpTxIs-YvPiBkWJhzj03I-6NfpO6viDE$">
                  Private link
                </a>
                <p></p>
                <p>
                  Takeda, N., Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P., 2021.
                  Exponential response of nitrous oxide (N<sub>2</sub>O) emissions to increasing
                  nitrogen fertiliser rates in a tropical sugarcane cropping system. Agriculture,
                  Ecosystems & Environment, 313:107376.
                </p>
                <a href="https://doi.org/10.1016/j.agee.2021.107376">Publisher </a>
                <p></p>
                <p>
                  Takeda, N., Lopez-Galvis, L., Pineda, D., Castilla, A., Takahashi, T., Fukuda, S.,
                  Okada, K., 2019. Evaluation of water dynamics of contour-levee irrigation system
                  in sloped rice fields in Colombia. Agricultural Water Management, 217:107–118.
                </p>
                <a href="https://doi.org/10.1016/j.agwat.2019.02.032">Publisher </a>
                <p></p>
                <p>
                  Takeda, N., Lopez-Galvis, L., Pineda, D., Castilla, A., Takahashi, T., Fukuda, S.,
                  Okada, K., 2019. Estimating Soil Water Contents from Field Water Tables for
                  Potential Rice Irrigation Criteria under Contour-Levee Irrigation Systems.
                  Environmental Control in Biology, 57:15–21.
                </p>
                <a href="https://doi.org/10.2525/ecb.57.15">Publisher </a>

                <h2> CONFERENCE PROCEEDING & PRESENTATION </h2>
                <hr />
                <p>
                  Oral Presentation at 20th Australian Agronomy Conference, Toowoomba, Australia
                </p>
                <p css={TextRight}>Oct 2021 (To be held)</p>
                <p>
                  Fertiliser <sup>15</sup>N loss increases in response to the N surplus in tropical
                  sugarcane systems
                </p>
                <a href="">Conference link </a>
                <p>
                  Oral Presentation at Soil Science Australia and the New Zealand Society of Soil
                  Science Joint Conference, Cairns, Australia
                </p>
                <p css={TextRight}>29 June 2021</p>
                <p>
                  Responses of fertiliser N recoveries to N fertiliser rates in a tropical sugarcane
                  system
                </p>
                <a href="https://www.soilscienceaustralia.org.au/2021-joint-conference/program/">
                  Conference link
                </a>
                <p>Oral Presentation at APSIM symposium 2020, University of Queensland, Brisbane</p>
                <p css={TextRight}>Nov. 2020 (Cancelled)</p>
                <p>
                  The response of N<sub>2</sub>O emissions to N fertiliser rates in Australian
                  sugarcane systems
                </p>
                <a href="https://www.apsim.info/support/apsim-symposium-and-advanced-training-workshops/apsim-symposium/program/">
                  Conference link
                </a>
                <p>
                  Oral Presentation at Crop Science Society of Japan 246th Annual Meeting (5-6 Sept.
                  2018), Hokkaido University, Hokkaido
                </p>
                <p css={TextRight}>6 Sept. 2018</p>
                <p>
                  Evaluation of toposequential effects and conventional irrigation managements in
                  sloped rice fields with contour-levee irrigation system in Colombia
                </p>
                <a href="https://www.jstage.jst.go.jp/article/jcsproc/246/0/246_20/_article/-char/en">
                  Conference link
                </a>
                <p>
                  Oral Presentation at Crop Science Society of Japan 243rd Annual Meeting (29-30
                  Mar. 2017), University of Tokyo, Tokyo
                </p>
                <p css={TextRight}>29 Mar. 2017</p>
                <p>
                  Analysis of alternate wetting and drying (AWD) water-saving irrigation system for
                  rice through modelling approach
                </p>
                <a href="https://www.jstage.jst.go.jp/article/jcsproc/243/0/243_118/_article/-char/en">
                  Conference link
                </a>

                <h2> PROJECT REPORTS </h2>
                <hr />
                <p>
                  Okada, K., Lopez-Galvis, L., Takahashi, T., Yamamuro, M., Takeda, N., Castilla,
                  A., Garces, G., Estimation of loss of water and nitrogen and suggested managements
                  for increasing their utilization efficiency in contour-levee irrigation system of
                  paddy field in Colombia. In Development and Adoption of Latin American Low-Input
                  Rice Production System through Genetic Improvement and Advanced Field-Management
                  Technologies - Technical Guide, 2019, Cali, Colombia.{' '}
                </p>
                <a href="https://ciatshare.ciat.cgiar.org/sites/satreps_rice/publication/190404%20Technical%20Guide_EN.pdf">
                  Publisher{' '}
                </a>
                <p>
                  Okada, K., Takeda, N., Lopez-Galvis, L., Takahashi, T., Yamamuro, M., Castilla,
                  A., Garces, G., Optimizing water and nitrogen management in contour-levee
                  irrigation systems by applying APSIM-Oryza2000 rice growth model. In Development
                  and Adoption of Latin American Low-Input Rice Production System through Genetic
                  Improvement and Advanced Field-Management Technologies - Technical Guide, 2019,
                  Cali, Colombia.
                </p>
                <a href="https://ciatshare.ciat.cgiar.org/sites/satreps_rice/publication/190404%20Technical%20Guide_EN.pdf">
                  Publisher{' '}
                </a>
                <h2> APPLICATION </h2>
                <hr />
                <h3>LangApp</h3>
                <p>
                  A web application records your English conversation and transcribes it. This app
                  then analyses the conversation to provide advice and visualise your progress,
                  supporting your English conversation practice!
                </p>
                <a href="https://langapp.netlify.app/">Website</a>
                <h3>Life Report</h3>
                <p>
                  An ios application records time and money you spent and visualise them over time.
                  This app helps you overview your spendings and design your life as you want!
                </p>
                <a href="https://apps.apple.com/il/app/life-report/id1503498113">App store</a>
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

export default Portfolio;
