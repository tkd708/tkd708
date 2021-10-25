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

const Software: React.FC = () => (
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

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>Here are the softwares I developed.</p>

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

export default Software;
