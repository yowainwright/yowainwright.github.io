---
title: Digging into Sinon Fake Server Methods
date: '2017-09-05'
layout: post
readNext: '/'
path: '/sinon-fake-server-methods/'
meta: Digging into Sinon Fake Server Methods and how to use them.
featured_image: null
post_index: 50
categories:
  - javascript
---

[Sinon](http://sinonjs.org/) is a powerful library used for stubbing functions, methods, xhr calls, and servers in JavaScript. The library and concept have confused me several times. I've found defining the interface to be challenging. Often, I realize that if the interface is challenging me, I need to rethink it.

In this post, I will explain a bit of Sinon for context and then dig into faking a server with Sinon.

---

- Stubbing, in JavaScript, is the act of making a dummy function that acts like a real JavaScript Interface allowing the stubber to fully test the thing they're testing. In example, if your testing a method that gets `.user()` information
- Interface, in regards to this post, is the way information is passed, changed, published between methods and functions. If information interface is not optimal, tests should be able to show that.

#### For this post, here's a stub example

```javascript
let server
// then later in code a value is assigned to the variable
server = sinon.fakeServer.create()
```

## Why would developers stub a server?

Engineers stub servers so that they can make fake requests to stubbed servers. The benefit of doing this is that the engineer doesn't need a real server and because they're not dependent on a real server, they can focus on testing whatever their code does that needs a server to test it.

## A specific example

In the example below, an ajax request is being made with plain ole' JavaScript

```javascript
export default function getUser(url, callbackInfo) {
  let info = {
    stuff: null,
  }
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.withCredentials = true
  // update `info` onload
  xhr.addEventListener('load', () => {
    if (xhr.status > 400) {
      console.warn('Some Warning')
      callbackInfo(info)
      return
    }
    const resp = JSON.parse(xhr.responseText)
    const respinfo = resp.info || null
    if (respinfo === null) return

    // update info
    info = {
      stuff: respinfo.status || null,
    }
    callbackInfo(info)
  })

  xhr.addEventListener('error', () => {
    console.warn('Some Warning')
    callbackInfo(info)
  })

  xhr.send()
}
```

For the code example above, there is an interface that expects to get information from an ajax request and provide information in response—a response being what comes back from the server.

## How to stub a server with Sinon

In the example above:

- The xhr request waits for a load event.
- If the response in above a 400, that means there is an error with the response, and the console should warn developers.
- If the response is not above a 400, the request will receive a `{object}` with a `status`.
- In a callback function, the xhr request will return the object `{info}`.
- If there is an `error` instead of a load event, another warning should be added to the console.

No, that there is an example and a bullet list of what's happening, Sinon can be used to stub a fake server so we can mock the scenarios of the function.

To do this, first, a stub server must be created.

```javascript
server = sinon.fakeServer.create()
```

It is beneficial to mock a successful API response

```javascript
// fake api
const resp = '{"info": "stuff"}'
```

Next, describe what the fake server should response with. This is done with a method provided by Sinon and arguments.

```javascript
server.respondWith(url, resp)
```

Sinon's `respondWith` method is _what the server responds with_. It can take in 3 arguments, a method (function), a URL or part of a URL, and the anticipated response. The documentation leaves what the method can do a mistery so this blog post will just stick to what's clear: the URL, and the response. When the `respondWith` method is left to that stubbing out the rest of the fake server response is just a few steps.

The final step is, triggering the fake response.

```javascript
server.respond()
```

Altogether the stubbed server looks like this.

```javascript
// define fake api success reponse
const resp = '{"info": "stuff"}'
// create the fake server
server = sinon.fakeServer.create()
// declare what the fake server should respond with
server.respondWith(url, resp)
// declare the fake response
```

## How to fully test a stubbed Sinon server

Now that this post has gone through stubbing a Sinon server, it will go into how the stub can be used to test the three things that the example function above will require.

- Test a successful response
- Test a failed response
- Test a errant response

### Testing a successful response

```javascript
// this post reference Mocha testing
it('provides `user` information with request success', function(done) {
  // the done argument along with this.timeout acts waits for a response for 100ms
  this.timeout(100)
  // create the fake Sinon server
  server = sinon.fakeServer.create()
  // define the end point and its response within args
  server.respondWith(url, resp)
  getUser(url, function info(user) {
    // define user interface
    expect(user).to.be.an('Object')
    expect(user.accountStatus === 'registered').to.be.true
    expect(user.loginState === 'semi').to.be.true
    expect(user.memberType === '146216164134017374').to.be.true
    expect(user.userID === '75607431722225').to.be.true
    done()
  })
  // invoke the fake Sinon server response
  server.respond()
})
```

### Testing a failed response

```javascript
it('provides `user` information with request success', () => {
  // create the fake Sinon server
  server = sinon.fakeServer.create({ respondImmediately: true })
  // because the server response immediately, invoking the response is not needed
  server.respondWith('/test', resp)
  getUser(url, function info(user) {
    // define a null user interface
    expect(user).to.be.an('Object')
    expect(user.accountStatus).to.be.null
    expect(user.loginState).to.be.null
    expect(user.memberType).to.be.null
    expect(user.userID).to.be.null
  })
})
```

### Testing an errant response

```javascript
it('provides null defaults with `user` request error', function() {
  // invoke server immediately to enforce error response
  server = sinon.fakeServer.create({ respondImmediately: true })
  server.respondWith('/test', resp, [404, {}, ''])
  getUser(url, function info(user) {
    // define null user interface
    expect(user).to.be.an('Object')
    expect(user.accountStatus).to.be.null
    expect(user.loginState).to.be.null
    expect(user.memberType).to.be.null
    expect(user.userID).to.be.null
  })
})
```

## Conclusion

This post has described how to use Sinon's Fake Server to fully test an interface for an XHR request. XHR Requests can be mocked by Sinon easily with a general understanding of Sinon. After setting up a Mock that works for a product, similar tests can be copied and reused elsewhere. This is why Sinon's Fake Server is a powerful tool.

Please use Sinon and [Sinon's Fake Server](http://sinonjs.org/releases/v2.1.0/fake-xhr-and-server/). Let [me](/issue) know if this post can be improved or if it helped.
