import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

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

export interface SoftwareProps {
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

const Software: React.FC<SoftwareProps> = props => (
  <IndexLayout>
    <Helmet>
      <title>Software</title>
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
              <PostFullTitle className="post-full-title">Software</PostFullTitle>
            </PostFullHeader>
            <h2> APPLICATION </h2>
            <hr />
            <ContentListItem
              icon={props.data.langApp.childImageSharp.fixed}
              title={'LangApp'}
              subTitle1={''}
              subTitle2={''}
              subTitle3={''}
              description={
                <p>
                  A web application records your English conversation and transcribes it. This app
                  then analyses the conversation to provide advice and visualise your progress,
                  supporting your English conversation practice!
                </p>
              }
              link1={'https://langapp.netlify.app/'}
              linkAlt1={'Website'}
            />
            <ContentListItem
              icon={props.data.lifeReport.childImageSharp.fixed}
              title={'Life Report'}
              subTitle1={''}
              subTitle2={''}
              subTitle3={''}
              description={
                <p>
                  An ios application records time and money you spent and visualise them over time.
                  This app helps you overview your spendings and design your life as you want!
                </p>
              }
              link1={'https://apps.apple.com/il/app/life-report/id1503498113'}
              linkAlt1={'App store'}
            />
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export const softwarePageQuery = graphql`
  query softwarePageQuery {
    header: file(relativePath: { eq: "img/qut-logo.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    langApp: file(relativePath: { eq: "img/langApp-icon.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    lifeReport: file(relativePath: { eq: "img/life-report-icon.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Software;
