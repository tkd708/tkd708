import React from 'react';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { lighten, setLightness } from 'polished';

import { ContentListItem } from '../components/ContentListItem';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
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
import { NoImage, PostFull, PostFullHeader, PostFullTitle, PostFullImage } from '../templates/post';
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

export interface CvProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
}

const CV: React.FC<CvProps> = props => (
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
          <article className="post page" css={[PostFull]}>
            <AboutHeader className="post-full-header">
              {props.data.portrait.childImageSharp.fixed && (
                <PortraitImage>
                  <Img
                    style={{ height: 'auto', width: '100%', position: 'initial' }}
                    fluid={props.data.portrait.childImageSharp.fixed}
                    alt="Portrait"
                  />
                </PortraitImage>
              )}
              <BioContainer>
                <PostFullTitle className="post-full-title">Naoya Takeda</PostFullTitle>
                <AboutExcerpt className="post-full-custom-excerpt">
                  {`Dr. Naoya Takeda is a post-doctoral researcher in the Sustainable Agriculture program at the Centre for Agriculture and the Bioeconomy (Queensland University of Technology). His expertise lies in agronomy and environmental sciences with research experiences in rice, sugarcane and grain and pasture systems. His research focuses on process understanding and upscaling of nitrogen (N) and carbon (C) cycling in agroecosystems, with particular interests in the key soil processes and drivers of greenhouse gas (CO2, N2O, CH4) emissions, N losses and C sequestration. His approach integrates laboratry and field measurements of C and N flows such as greenhouse gas emissions, 15N fertiliser recovery, denitrification losses, net ecosystem exchange with empirical and mechanistic (e.g. APSIM, LandscapeDNDC, DayCent) modelling approaches. He aims to agronomic and environmental assessments of agroecosystems and supporting the decisions of farmers and policymakers to mitigate and adapt to climate change. `}
                </AboutExcerpt>
              </BioContainer>
            </AboutHeader>
            <h2>CURRENT AFFILIATION</h2>
            <hr />
            <ContentListItem
              icon={props.data.qut.childImageSharp.fixed}
              title="Research Associate"
              subTitle1="Centre for Agriculture and the Bioeconomy, Queensland University of Technology"
              subTitle2="Nov. 2022 – Present"
              subTitle3="Brisbane, Australia"
              description={<p></p>}
            />

            <h2>EDUCATION</h2>
            <hr />
            <ContentListItem
              icon={props.data.qut.childImageSharp.fixed}
              title="Queensland University of Technology"
              subTitle1="Ph.D. Candidate"
              subTitle2="Feb 2019 - Feb 2023"
              subTitle3="Brisbane, Australia"
              description={
                <p>
                  Research topic is "Denitrification losses in response to nitrogen fertiliser rates
                  in Australian sugarcane systems". The supervisory team consists of Prof Peter
                  Grace, Dr Johannes Friedl, Dr David Rowlings and Dr Clemens Scheer.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.uTokyo.childImageSharp.fixed}
              title="University of Tokyo"
              subTitle1="Master of Science in Agricultural Development"
              subTitle2="Sept. 2016 - Aug. 2018"
              subTitle3="Tokyo, Japan"
              description={
                <p>
                  The study was conducted in International Program in Agricultural Development
                  Studies (IPADS, taught in English) under supervision of Prof Kensuke Okada. The
                  thesis title was "Application of APSIM-Oryza2000 to sloped rice fields with
                  contour-levee irrigation system in Colombia for efficient water use".
                </p>
              }
            />
            <ContentListItem
              icon={props.data.uSheffield.childImageSharp.fixed}
              title="University of Sheffield"
              subTitle1="University-wide Exchange Program"
              subTitle2="Sept. 2015 - July 2016"
              subTitle3="Sheffield, UK"
              description={
                <p>
                  A University-wide Exchange Program for one year. The subjects were Economics,
                  Statistics and Biology.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.uTokyo.childImageSharp.fixed}
              title="University of Tokyo"
              subTitle1="Bachelor of Science in Agriculture"
              subTitle2="Apr. 2012 - Sept. 2016"
              subTitle3="Tokyo, Japan"
              description={
                <p>
                  Thesis title was "Analysis of the applicability of alternate wetting and drying
                  (AWD) irrigation as a watersaving rice production technology through a modelling
                  approach". The study was conducted under supervision of Prof Kensuke Okada and Dr
                  Taro Takahashi.
                </p>
              }
            />
            <br />
            <h2>WORK EXPERIENCE</h2>
            <hr />
            <ContentListItem
              icon={props.data.qut.childImageSharp.fixed}
              title="Research Assistant"
              subTitle1="Centre for Agriculture and the Bioeconomy, Queensland University of Technology"
              subTitle2="Jan. 2022 – Oct. 2022"
              subTitle3="Brisbane, Australia"
              description={
                <p>
                  Working for "Smart farming partnerships project - Unlocking the true values of
                  organic soil amendments" project to develop an innovative farm-ready tool for the
                  effective managament of manures and composts into farm fertiliser budgets for
                  environmental, soil health and economic suutainability. Developping a web/mobile
                  application to calculate nutrient release from organic amendments based on the
                  incubation and field trial datasets from the project.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.qut.childImageSharp.fixed}
              title="Research Assistant"
              subTitle1="Centre for Agriculture and the Bioeconomy, Queensland University of Technology"
              subTitle2="Mar. 2021 – Dec. 2021"
              subTitle3="Brisbane, Australia"
              description={
                <p>
                  Worked for a Grain Research & Development Corporation (GRDC) project to examine
                  fertiliser N use efficiency and N loss pathways in grain cropping systems in
                  Australia. Testing APSIM (Classic and Next Gen) against <sup>15</sup>N field
                  trials datasets to simulate fertiliser N recovery and N losses. Identifying the
                  potential to improve algorithms related to N cyclying processes in APSIM.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.ciat.childImageSharp.fixed}
              title="Visiting Researcher"
              subTitle1="International Center of Tropical Agriculture (CIAT)"
              subTitle2="Aug. 2017 – Mar. 2018"
              subTitle3="Cali, Colombia"
              description={
                <p>
                  Worked in a project SATREPS between Japan and Colombia to develop and to
                  disseminate resource saving rice production systems in Colombia. Conducted field
                  experiments in farmer's fields in Ibagué, Colombia to examine toposequential
                  effects on hydrology and on rice growth in collaboration with local staff of
                  Colombian National Rice Producers Federation (FEDEARROZ). Calibrated and validated
                  APSIM-Oryza2000, followed by scenario analysis with the model to optimise farmer's
                  irrigation management under different weather conditions. Suggested the optimised
                  irrigation management to local farmers and extension workers by workshop
                  presentation and field demonstration.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.basf.childImageSharp.fixed}
              title="Marketing Research Intern"
              subTitle1="BASF Japan"
              subTitle2="Feb. 2017 – Apr. 2017"
              subTitle3="Tokyo, Japan"
              description={
                <p>
                  Worked in a project to revise the strategy of pesticide marketing of BASF Japan
                  focusing on emerging agricultural companies in Kanto region, Japan. Analysed
                  published market information for an overview of the pesticide market and
                  interviewed agricultural companies in Kanto region to reveal their purchasing
                  power from the perspectives of cultivation system and sales route. Had a final
                  presentation on an evaluation of a new pesticide marketing strategy approaching
                  influential agricultural companies to division members and executives of BASF
                  Japan.
                </p>
              }
            />
            <br />

            <h2>AWARDS</h2>
            <hr />
            <ContentListItem
              icon={props.data.greenTalents.childImageSharp.fixed}
              title="Green Talents 2021"
              subTitle1="German Federal Ministry of Education and Research (BMBF)"
              subTitle2="Oct 2021"
              subTitle3=""
              description={
                <p>
                  Every year, the German Federal Ministry of Education and Research (BMBF) hosts the
                  prestigious Green Talents – International Forum for High Potentials in Sustainable
                  Development to promote the international exchange of innovative green ideas within
                  the field of sustainability. The award, under the patronage of Minister Anja
                  Karliczek, honours young researchers from numerous countries and scientific
                  disciplines each year for their achievements and efforts to making their
                  communities, countries and societies more sustainable. Selected by a jury of
                  German experts, the award winners are granted unique access to the country’s
                  research elite.
                </p>
              }
              link1="https://www.greentalents.de/"
              linkAlt1="Program website"
            />
            <ContentListItem
              icon={props.data.auGov.childImageSharp.fixed}
              title="Australian Government Research Training Program"
              subTitle1="Queensland University of Technology"
              subTitle2="Feb 2019"
              subTitle3=""
              description={
                <p>
                  The Research Training Program (RTP) is administered by individual universities on
                  behalf of the Department of Education, Skills and Employment. Applications for RTP
                  Scholarships need to be made directly to participating universities. Each
                  university has its own application and selection process, please contact your
                  chosen university directly to discuss how to apply for the RTP scheme. The RTP
                  provides block grants, on a calendar year basis, to higher education providers
                  (HEPs) to support both domestic and overseas students undertaking research
                  doctorate and research masters degrees, known as higher degrees by research
                  (HDRs).
                </p>
              }
              link1="https://www.dese.gov.au/research-block-grants/research-training-program"
              linkAlt1="Program website"
            />
            <ContentListItem
              icon={props.data.tobitate.childImageSharp.fixed}
              title="Tobitate! Study Abroad Japan Program"
              subTitle1="Japanese Ministry of Education, Culture, Sports, Science and Technology (MEXT)"
              subTitle2="July 2017"
              subTitle3=""
              description={
                <p>
                  Tobitate! (Leap for Tomorrow) Study Abroad Initiative is led by Japan’s Ministry
                  of Education, Culture, Sports, Science, and Technology (MEXT) that aims to help
                  all young Japanese eager and capable take the first step toward studying abroad.
                  At its core is a belief that all of society working together can achieve greater
                  results. As such, support and donations from individuals and private companies
                  active in various fields play a key role in forming a globalized human-resources
                  development community for fostering young people who have a global outlook who can
                  succeed in tomorrow’s world.
                </p>
              }
              link1="https://tobitate.mext.go.jp/about/english.html"
              linkAlt1="Program website"
            />
            <ContentListItem
              icon={props.data.uTokyo.childImageSharp.fixed}
              title="Promoting Doctoral Course Programs"
              subTitle1="Graduate School of Agriculture and Life Science, University of Tokyo"
              subTitle2="July 2017"
              subTitle3=""
              description=""
            />
            <ContentListItem
              icon={props.data.jasso.childImageSharp.fixed}
              title="Scholarship program for postgraduates"
              subTitle1="Japan Student Services Organization"
              subTitle2="Sept. 2016"
              subTitle3=""
              description=""
            />
            <br />
            <h2>LANGUAGES</h2>
            <hr />
            <h3>Japanese : Native</h3>
            <h3>English : Advanced (International English Language Testing System – IELTS 7.5)</h3>
            <h3>
              Spanish : Upper Intermediate (Diplomas de Español como Lengua Extranjera – DELE B2)
            </h3>
            <h3>French : Beginner</h3>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export const cvPageQuery = graphql`
  query cvPageQuery {
    portrait: file(relativePath: { eq: "img/naoya-portrait.jpg" }) {
      childImageSharp {
        fixed(width: 1000, height: 1000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    qut: file(relativePath: { eq: "img/qut-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    uTokyo: file(relativePath: { eq: "img/UTlogo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    uSheffield: file(relativePath: { eq: "img/university-of-sheffield.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ciat: file(relativePath: { eq: "img/ciat-logo.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    basf: file(relativePath: { eq: "img/basf-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    greenTalents: file(relativePath: { eq: "img/green-talents-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    auGov: file(relativePath: { eq: "img/au-rtp-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tobitate: file(relativePath: { eq: "img/tobitate-logo.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    jasso: file(relativePath: { eq: "img/jasso-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
export default CV;

const AboutHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 50px 50px 50px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: flex;
  flex-direction: row-reverse;

  @media (max-width: 1170px) {
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
    flex-direction: column;
  }

  @media (max-width: 500px) {
    padding: 20px 0 20px;
  }
`;

const PortraitImage = styled.figure`
  margin: 24px 12px 24px 12px;
  //height: 500px;
  width: 50%;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;
  position: relative;

  @media (max-width: 1170px) {
    border-radius: 0;
    img {
      max-width: 1170px;
    }
  }
  @media (max-width: 800px) {
    height: 400px;
    width: 100%;
    align-self: center;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

const BioContainer = styled.div`
  margin: 24px 12px 24px 12px;
  color: var(--midgrey);
  //height: 500px;
  width: 50%;

  @media (max-width: 1170px) {
  }

  @media (max-width: 800px) {
    width: 100%;
    align-self: center;
    //height: 400px;
  }

  @media (max-width: 500px) {
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

const AboutExcerpt = styled.p`
  color: var(--midgrey);
  font-family: Georgia, serif;
  font-size: 2rem;
  line-height: 1.4em;
  font-weight: 300;
  text-align: justify;
  margin-top: 24px;

  @media (max-width: 800px) {
  }

  @media (max-width: 500px) {
    font-size: 1.5rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;
