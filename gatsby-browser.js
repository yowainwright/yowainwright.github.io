const React = require('react')
const Layout = require('./src/components/layout').default

// Logs when the client route changes
exports.onRouteUpdate = ({ location, prevLocation }) => {
  const body = document.querySelector('body')
  body.setAttribute('data-current-page', location.pathname)
  body.setAttribute('data-previous-page', prevLocation ? prevLocation.pathname : '/')
}

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>
