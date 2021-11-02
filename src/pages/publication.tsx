import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { ContentListItem } from '../components/ContentListItem';
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

export interface PublicationProps {
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

const Publication: React.FC<PublicationProps> = props => (
  <IndexLayout>
    <Helmet>
      <title>Publication</title>
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
              <PostFullTitle className="post-full-title">Publication</PostFullTitle>
            </PostFullHeader>
            <h2> JOURNAL ARTICLES </h2>
            <hr />
            <ContentListItem
              icon={props.data.nca.childImageSharp.fixed}
              title={
                <p>
                  No sugar yield gains but larger fertiliser <sup>15</sup>N loss with increasing N
                  rates in an intensive sugarcane system
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P.
                </p>
              }
              subTitle2={'13 August 2021'}
              subTitle3={'Nutrient Cycling in Agroecosystems, 121:99-113'}
              description={<p></p>}
              link1={'https://doi.org/10.1007/s10705-021-10167-0'}
              linkAlt1={'Publisher'}
              link2={
                'https://urldefense.com/v3/__https://rdcu.be/ct1VB__;!!NVzLfOphnbDXSw!VwVOMIth0StCicuggTstjh-SHSjultPXdzcmTj1NZpTxIs-YvPiBkWJhzj03I-6NfpO6viDE$'
              }
              linkAlt2={'Private Link'}
            />
            <ContentListItem
              icon={props.data.agee.childImageSharp.fixed}
              title={
                <p>
                  Exponential response of nitrous oxide (N<sub>2</sub>O) emissions to increasing
                  nitrogen fertiliser rates in a tropical sugarcane cropping system
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P.
                </p>
              }
              subTitle2={'15 June 2021'}
              subTitle3={'Agriculture, Ecosystems & Environment, 313:107376'}
              description={<p></p>}
              link1={'https://doi.org/10.1016/j.agee.2021.107376'}
              linkAlt1={'Publisher'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.agwm.childImageSharp.fixed}
              title={
                <p>
                  Evaluation of water dynamics of contour-levee irrigation system in sloped rice
                  fields in Colombia
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Lopez-Galvis, L., Pineda, D., Castilla, A., Takahashi, T., Fukuda, S., Okada, K.
                </p>
              }
              subTitle2={'20 May 2019'}
              subTitle3={'Agricultural Water Management, 217:107–118'}
              description={<p></p>}
              link1={'https://doi.org/10.1016/j.agwat.2019.02.032'}
              linkAlt1={'Publisher'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.ecb.childImageSharp.fixed}
              title={
                <p>
                  Estimating Soil Water Contents from Field Water Tables for Potential Rice
                  Irrigation Criteria under Contour-Levee Irrigation Systems
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Lopez-Galvis, L., Pineda, D., Castilla, A., Takahashi, T., Fukuda, S., Okada, K.
                </p>
              }
              subTitle2={'01 April 2019'}
              subTitle3={'Environmental Control in Biology, 57:15–21'}
              description={<p></p>}
              link1={'https://doi.org/10.2525/ecb.57.15'}
              linkAlt1={'Publisher'}
              link2={''}
              linkAlt2={''}
            />
            <br />
            <h2> CONFERENCE PROCEEDING & PRESENTATION </h2>
            <hr />
            <ContentListItem
              icon={props.data.agroAu.childImageSharp.fixed}
              title={
                <p>
                  Fertiliser <sup>15</sup>N loss increases in response to the N surplus in tropical
                  sugarcane systems
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P.
                </p>
              }
              subTitle2={'Feb 2022 (to be held)'}
              subTitle3={
                '20th Australian Agronomy Conference (Oral presentation) in Toowoomba, Australia'
              }
              description={<p></p>}
              link1={'https://agronomyconference.com/'}
              linkAlt1={'Conference website'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.soilAuNz.childImageSharp.fixed}
              title={
                <p>
                  Responses of fertiliser N recoveries to N fertiliser rates in a tropical sugarcane
                  system
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., Grace, P.
                </p>
              }
              subTitle2={'29 June 2021'}
              subTitle3={
                'Soil Science Australia and the New Zealand Society of Soil Science Joint Conference (Oral presentation) in Cairns, Australia'
              }
              description={<p></p>}
              link1={'https://www.soilscienceaustralia.org.au/2021-joint-conference/program/'}
              linkAlt1={'Conference website'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.apsim.childImageSharp.fixed}
              title={
                <p>
                  The response of N<sub>2</sub>O emissions to N fertiliser rates in Australian
                  sugarcane systems
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Friedl, J., Rowlings, D., Biggs, J., Scheer, C., Grace, P.
                </p>
              }
              subTitle2={'Nov. 2020 (Cancelled)'}
              subTitle3={'APSIM symposium 2020 (Oral presentation) in Brisbane, Australia'}
              description={<p></p>}
              link1={
                'https://www.apsim.info/support/apsim-symposium-and-advanced-training-workshops/apsim-symposium/program/'
              }
              linkAlt1={'Conference website'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.cssj.childImageSharp.fixed}
              title={
                <p>
                  Evaluation of toposequential effects and conventional irrigation managements in
                  sloped rice fields with contour-levee irrigation system in Colombia
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Lopez-Galvis, L., Pineda, D., Castilla, A., Takahashi, T., Fukuda, S., Okada, K.
                </p>
              }
              subTitle2={'6 Sept. 2018'}
              subTitle3={
                'Crop Science Society of Japan 246th Annual Meeting (Oral presentation) in Hokkaido, Japan'
              }
              description={<p></p>}
              link1={'https://www.jstage.jst.go.jp/article/jcsproc/246/0/246_20/_article/-char/en'}
              linkAlt1={'Conference website'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.cssj.childImageSharp.fixed}
              title={
                <p>
                  Analysis of alternate wetting and drying (AWD) water-saving irrigation system for
                  rice through modelling approach
                </p>
              }
              subTitle1={
                <p>
                  <u>
                    <b>Takeda, N.</b>
                  </u>
                  , Yamamuro, M., Takahashi, T., Okada, K.
                </p>
              }
              subTitle2={'29 Mar. 2017'}
              subTitle3={
                'Crop Science Society of Japan 243rd Annual Meeting (Oral presentation) in Tokyo, Japan'
              }
              description={<p></p>}
              link1={'https://www.jstage.jst.go.jp/article/jcsproc/243/0/243_118/_article/-char/en'}
              linkAlt1={'Conference website'}
              link2={''}
              linkAlt2={''}
            />
            <br />
            <h2> PROJECT REPORTS </h2>
            <hr />
            <ContentListItem
              icon={props.data.satreps.childImageSharp.fixed}
              title={
                <p>
                  Estimation of loss of water and nitrogen and suggested managements for increasing
                  their utilization efficiency in contour-levee irrigation system of paddy field in
                  Colombia
                </p>
              }
              subTitle1={
                <p>
                  Okada, K., Lopez-Galvis, L., Takahashi, T., Yamamuro, M.,
                  <u>
                    <b> Takeda, N.</b>
                  </u>
                  , Castilla, A., Garces, G.
                </p>
              }
              subTitle2={'2019, Cali, Colombia'}
              subTitle3={
                'In Development and Adoption of Latin American Low-Input Rice Production System through Genetic Improvement and Advanced Field-Management Technologies - Technical Guide'
              }
              description={<p></p>}
              link1={
                'https://ciatshare.ciat.cgiar.org/sites/satreps_rice/publication/190404%20Technical%20Guide_EN.pdf'
              }
              linkAlt1={'Publisher'}
              link2={''}
              linkAlt2={''}
            />
            <ContentListItem
              icon={props.data.satreps.childImageSharp.fixed}
              title={
                <p>
                  Optimizing water and nitrogen management in contour-levee irrigation systems by
                  applying APSIM-Oryza2000 rice growth model
                </p>
              }
              subTitle1={
                <p>
                  Okada, K.,
                  <u>
                    <b> Takeda, N.</b>
                  </u>
                  , Lopez-Galvis, L., Takahashi, T., Yamamuro, M., Castilla, A., Garces, G.
                </p>
              }
              subTitle2={'2019, Cali, Colombia'}
              subTitle3={
                'In Development and Adoption of Latin American Low-Input Rice Production System through Genetic Improvement and Advanced Field-Management Technologies - Technical Guide'
              }
              description={<p></p>}
              link1={
                'https://ciatshare.ciat.cgiar.org/sites/satreps_rice/publication/190404%20Technical%20Guide_EN.pdf'
              }
              linkAlt1={'Publisher'}
              link2={''}
              linkAlt2={''}
            />
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export const publicationPageQuery = graphql`
  query publicationPageQuery {
    header: file(relativePath: { eq: "img/qut-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    agee: file(relativePath: { eq: "img/agee-cover.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    nca: file(relativePath: { eq: "img/nutr-cyc-agroeco-cover.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    agwm: file(relativePath: { eq: "img/agwm-cover.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ecb: file(relativePath: { eq: "img/envir-contr-bio-cover.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    agroAu: file(relativePath: { eq: "img/agronomy-au-cover.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    soilAuNz: file(relativePath: { eq: "img/soil-au-nz-cover.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    apsim: file(relativePath: { eq: "img/apsim-cover.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    cssj: file(relativePath: { eq: "img/cssj-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    satreps: file(relativePath: { eq: "img/satreps-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Publication;
