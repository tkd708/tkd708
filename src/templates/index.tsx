import { useStaticQuery, graphql, Link } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { PageContext } from './post';
import _ from 'lodash';
//import { TagList } from '../components/TagList';
import { HomeSideContent } from '../components/HomeSideContent';

export interface IndexProps {
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
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;

  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [allCategories, setAllCategories] = React.useState<any[]>([]);

  const fetchAllTags = () => {
    // Tag
    const tags: string[] = [];
    props.data.allTags.edges.map(
      (post, index) => tags.push(...post.node.frontmatter.tags.slice(1)), // [0] is primary tag = category
    );
    //const tagsUnique = [...new Set(tags)];
    const tagCounts = [];
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    const tagCountArray = [];
    Object.entries(tagCounts).forEach(([key, value]) => {
      const tagCount = { name: key, count: value };
      tagCountArray.push(tagCount);
    });
    tagCountArray.sort(function (a, b) {
      return a.count > b.count ? -1 : 1;
    });
    setAllTags(tagCountArray);

    // Category = primary tag
    const categories: string[] = [];
    props.data.allTags.edges.map(
      (post, index) => categories.push(...post.node.frontmatter.tags.slice(0, 1)), // [0] is primary tag = category
    );
    const categoryCounts = [];
    categories.forEach(category => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    const categoryCountArray = [];
    Object.entries(categoryCounts).forEach(([key, value]) => {
      const categoryCount = { name: key, count: value };
      categoryCountArray.push(categoryCount);
    });
    categoryCountArray.sort(function (a, b) {
      return a.count > b.count ? -1 : 1;
    });
    setAllCategories(categoryCountArray);
  };

  React.useEffect(() => {
    fetchAllTags();
  }, []);

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width.toString()} />
        <meta property="og:image:height" content={height.toString()} />
      </Helmet>
      <Wrapper>
        <div
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          style={{
            backgroundImage: `url('${props.data.header.childImageSharp.fixed.src}')`,
            height: '70vh',
          }}
        >
          <div css={inner}>
            <SiteNav isHome />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '55px' }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </div>
        <main id="site-main" css={[SiteMain, outer]}>
          <div
            css={[inner, Posts]}
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
            }}
          >
            <HomeSideContent categories={allCategories} tags={allTags} />

            <div css={[PostFeed, PostFeedWidthLimit]}>
              <div>
                <p css={FeedTitle}>Latest posts</p>
                {props.data.allMarkdownRemark.edges.map((post, index) => {
                  // filter by tags
                  // filter out drafts in production
                  return (
                    (post.node.frontmatter.draft !== true ||
                      process.env.NODE_ENV !== 'production') && (
                      <PostCard key={post.node.fields.slug} post={post.node} large={index === 0} />
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    logo: file(relativePath: { eq: "img/logo_initial2.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/ibague_field2.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 2000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allTags: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            draft
            excerpt
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            readingTime {
              text
            }
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      padding-bottom: 40px;
      min-height: 280px;
      border-top: 0;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

const FeedTitle = css`
  align-self: center;
  margin: 5vh;
  font-size: 5rem;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 3rem;
  }
`;

const PostFeedWidthLimit = css`
  @media (min-width: 750px) {
    width: 75%;
  }
`;

export default IndexPage;
