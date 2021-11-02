import React from 'react';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

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
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Naoya Takeda</PostFullTitle>
            </PostFullHeader>
            <h2>EDUCATION</h2>
            <hr />
            <ContentListItem
              icon={props.data.qut.childImageSharp.fixed}
              title={'Queensland University of Technology'}
              subTitle1={'Ph.D. Candidate'}
              subTitle2={'Feb 2019 - Present'}
              subTitle3={'Brisbane, Australia'}
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
              title={'University of Tokyo'}
              subTitle1={'Master of Science in Agricultural Development'}
              subTitle2={'Sept. 2016 - Aug. 2018'}
              subTitle3={'Tokyo, Japan'}
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
              title={'University of Sheffield'}
              subTitle1={'University-wide Exchange Program'}
              subTitle2={'Sept. 2015 - July 2016'}
              subTitle3={'Sheffield, UK'}
              description={
                <p>
                  A University-wide Exchange Program for one year. The subjects were Economics,
                  Statistics and Biology.
                </p>
              }
            />
            <ContentListItem
              icon={props.data.uTokyo.childImageSharp.fixed}
              title={'University of Tokyo'}
              subTitle1={'Bachelor of Science in Agriculture'}
              subTitle2={'Apr. 2012 - Sept. 2016'}
              subTitle3={'Tokyo, Japan'}
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
              title={'Research Assisstant'}
              subTitle1={
                'Centre for Agriculture and the Bioeconomy, Queensland University of Technology'
              }
              subTitle2={'Mar. 2021 – Dec. 2021'}
              subTitle3={'Brisbane, Australia'}
              description={
                <p>
                  Working in a Grain Research & Development Corporation (GRDC) project to examine
                  fertiliser N use efficiency and N loss pathways in grain cropping systems in
                  Australia. Testing APSIM (Classic and Next Gen) against <sup>15</sup>N field
                  trials datasets to simulate fertiliser N recovery and N losses Identifying the
                  potential to improve algorithms related to N cyclying processes in APSIM
                </p>
              }
            />
            <ContentListItem
              icon={props.data.ciat.childImageSharp.fixed}
              title={'Visiting Researcher'}
              subTitle1={'International Center of Tropical Agriculture (CIAT)'}
              subTitle2={'Aug. 2017 – Mar. 2018'}
              subTitle3={'Cali, Colombia'}
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
              title={'Marketing Research Intern'}
              subTitle1={'BASF Japan'}
              subTitle2={'Feb. 2017 – Apr. 2017'}
              subTitle3={'Tokyo, Japan'}
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
              title={'Green Talents 2021'}
              subTitle1={'German Federal Ministry of Education and Research (BMBF)'}
              subTitle2={'Oct 2021'}
              subTitle3={''}
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
              link1={'https://www.greentalents.de/'}
              linkAlt1={'Program website'}
            />
            <ContentListItem
              icon={props.data.auGov.childImageSharp.fixed}
              title={'Australian Government Research Training Program'}
              subTitle1={'Queensland University of Technology'}
              subTitle2={'Feb 2019'}
              subTitle3={''}
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
              link1={'https://www.dese.gov.au/research-block-grants/research-training-program'}
              linkAlt1={'Program website'}
            />
            <ContentListItem
              icon={props.data.tobitate.childImageSharp.fixed}
              title={'Tobitate! Study Abroad Japan Program'}
              subTitle1={
                'Japanese Ministry of Education, Culture, Sports, Science and Technology (MEXT)'
              }
              subTitle2={'July 2017'}
              subTitle3={''}
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
              link1={'https://tobitate.mext.go.jp/about/english.html'}
              linkAlt1={'Program website'}
            />
            <ContentListItem
              icon={props.data.uTokyo.childImageSharp.fixed}
              title={'Promoting Doctoral Course Programs'}
              subTitle1={'Graduate School of Agriculture and Life Science, University of Tokyo'}
              subTitle2={'July 2017'}
              subTitle3={''}
              description={<p></p>}
            />
            <ContentListItem
              icon={props.data.jasso.childImageSharp.fixed}
              title={'Scholarship program for postgraduates'}
              subTitle1={'Japan Student Services Organization'}
              subTitle2={'Sept. 2016'}
              subTitle3={''}
              description={<p></p>}
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
    header: file(relativePath: { eq: "img/qut-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
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
