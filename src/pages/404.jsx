import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

export const FourZeroFour = props => {
  const title = '404 | Jeffry.in'

  return (
    <Layout>
      <main className='main main--404'>
        <Helmet title={title}>
          <meta
            name='twitter:description'
            property='og:description'
            content='This is the 404 page of Jeffry.in. Use the navigation to find other pages of this website.'
          />
          <link rel='canonical' href='https://jeffry.in/404/' itemProp='url' />
          <meta name='twitter:url' property='og:url' content='https://jeffry.in/404/' />
          <meta name='twitter:title' property='og:title' content={`${title}`} />
        </Helmet>
        <h1>404</h1>
        <p>Somehow, you've reached the 404 page of Jeffry.in.</p>
        <p>It's probably not your fault but that doesn't fix the problem. </p>
        <p>Use the navigation above to help you find your way.</p>
      </main>
    </Layout>
  )
}

export default FourZeroFour
