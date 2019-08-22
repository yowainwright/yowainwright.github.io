/* eslint-disable */
module.exports = {
  pathPrefix: '/yowainwright.github.io',
  siteMetadata: {
    title: 'Jeffry.in',
    author: 'Jeff Wainwright',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            resolve: 'gatsby-remark-prismjs',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'name': 'Jeffry.in',
        'short_name': 'Jeffry.in',
        'start_url': 'https://jeffry.in',
        'display': 'standalone',
        'theme_color': '#ffffcc',
        'background_color': '#FFFFFF',
        'icons': [
          {
            'src': '/assets/icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-152x152.png',
            'sizes': '152x152',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': '/assets/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Playfair Display',
            variants: ['400', '900']
          },
          {
            family: 'Oswald',
            variants: ['500']
          },
        ],
      },
    },
  ],
}
