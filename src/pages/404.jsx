import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

export default function FourZeroFour({
  metaTitle = '404 | Jeffry.in',
  metaContent = 'This is the 404 page of Jeffry.in. Use the navigation to find other pages of this website.',
  path = 'https://jeffry.in/404/',
  Text = (
    <>
      <p>Somehow, you&apos;ve reached the 404 page of Jeffry.in.</p>
      <p>It&apos;s probably not your fault but that doesn&apos;t fix the problem. </p>
      <p>Use the navigation above to help you find your way.</p>
    </>
  ),
  title = '404',
}) {
  return (
    <Layout>
      <main className='main main--404'>
        <Helmet title={metaTitle}>
          <meta name='twitter:description' property='og:description' content={metaContent} />
          <link rel='canonical' href={path} itemProp='url' />
          <meta name='twitter:url' property='og:url' content={path} />
          <meta name='twitter:title' property='og:title' content={metaTitle} />
        </Helmet>
        <h1>{title}</h1>
        {Text}
      </main>
    </Layout>
  )
}
