/* eslint-disable @typescript-eslint/no-var-requires */
const path = require( 'path' );
require( "dotenv" ).config()


module.exports = {
    siteMetadata: {
        title: 'Naoya Takeda',
        description: "Naoya Takeda's personal website demonstrates his blog posts, personal history and portfolio. A PhD candidate (agricultural & environmental sciences) at Queensland University of Technology based in Brisbane, Australia.",
        siteUrl: 'https://naoya-takeda.netlify.com', // full path to blog - no ending slash
    },
    mapping: {
        'MarkdownRemark.frontmatter.author': 'AuthorYaml',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-breadcrumb',
            options: {
                useAutoGen: true,
                trailingSlashes: true,
                defaultCrumb: {
                    location: {
                        pathname: '/',
                    },
                    crumbLabel: 'Home',
                    crumbSeparator: ' / ',
                },
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                output: '/sitemap.xml',
                exclude: [],
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://naoya-takeda.netlify.app',
                sitemap: 'https://naoya-takeda.netlify.app/sitemap.xml',
                policy: [ { userAgent: '*', allow: '/' } ],
            },
        },
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                defaultQuality: 100,
                stripMetadata: true,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: path.join( __dirname, 'src', 'content' ),
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1rem',
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    'gatsby-remark-reading-time',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 2000,
                            quality: 100,
                        },
                    },
                ],
            },
        },
        'gatsby-transformer-json',
        {
            resolve: 'gatsby-plugin-canonical-urls',
            options: {
                siteUrl: 'https://naoya-takeda.netlify.app',
            },
        },
        'gatsby-plugin-typescript',
        'gatsby-plugin-emotion',
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-yaml',
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ( { query: { site, allMarkdownRemark } } ) => {
                            return allMarkdownRemark.edges.map( edge => {
                                return {
                                    ...edge.node.frontmatter,
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: `${ site.siteMetadata.siteUrl }${ edge.node.fields.slug }`,
                                    guid: `${ site.siteMetadata.siteUrl }${ edge.node.fields.slug }`,
                                    custom_elements: [ { 'content:encoded': edge.node.html } ],
                                };
                            } );
                        },
                        query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { draft: { ne: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
                        output: '/rss.xml',
                        title: 'Naoya Takeda Home', //Ghost\'s Blog
                        match: '^/blog/',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-postcss',
            options: {
                postCssPlugins: [ require( 'postcss-color-function' ), require( 'cssnano' )() ],
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
                // Puts tracking script in the head instead of the body
                head: true,
                // IP anonymization for GDPR compliance
                anonymize: true,
                // Disable analytics for users with `Do Not Track` enabled
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: [ '/preview/**' ],
                // Specifies what percentage of users should be tracked
                sampleRate: 100,
                // Determines how often site speed tracking beacons will be sent
                siteSpeedSampleRate: 10,
            },
        },
    ],
};
