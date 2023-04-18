---
title: Document Cookies Are a Useful Tool With A Simple API With Some Nunaces
date: '2022-02-05'
layout: post
readNext: '/'
path: '/document-cookie-nuances'
meta: "This brief artice covers nuances of document.cookie and how to use it to store and access data."
featured_image: null
post_type: technical
categories:
  - code
  - javascript
  - html
---

[Document Cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) is a part of the HTML Document. It's used on many, if not most, websites to store data.
Although, `document.cookie` is a string, there are subtle nuances to its API which can be misunderstood.
In this article, these nuances are explored in _just enough_ detail to, hopefully, make `document.cookie` even more understandable.

## The Basics of Document Cookie

Cookies can be created or referenced via the `document.cookie` property.

To create a cookie, all that is needed is something very simple.

```javascript
document.cookie = '<key>=<value>;';
```

Reading cookies is very simple as well.

```javascript
const cookies = new UrlSearchParams(document.cookie.replaceAll('; ', '&'));
cookies.get('<key>');
```

## Cookie Attributes Are Write Only (Nuance 1)

After reading "The Basics of Document Cookie" section above, Cookies are incredibly simple to understand.
However, if viewing [MDN's](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) description of `document.cookie`, you'll notice attributes can be added to a cookie to control its behavior.
This concept is easy to understand. However, when viewing the API for adding attributes, it's slightly more confusing.

```javascript
document.cookie = '<key1>=value1; expires=<date1>; path=<path>; domain=<domain>; secure; httponly';
document.cookie = '<key2>=value2; expires=<dat2>; path=<path>;secure; httponly';
const cookies = new UrlSearchParams(document.cookie);
Object.fromEntries(cookies); // { key1: 'value1', key2: 'value2' }
```

### Code Observations

- When reading the cookie output, all attributes are removed
- Each cookie only has an accessible `key` and `value`

### Browser Observation

- Cookie attributes can be viewed in the browser only!

---

## Cookie Updates (Nuance 2)

Hint, a Cookie cannot be updated. It can only be re-written!
The good news is that because a cookie is only a string containing a key and value separated by a `=`, it is easy to find a replace with code.

Lets see this in in action!

```javascript
const cookies = new UrlSearchParams(document.cookie); // '<key1>=<value`>;<key2>=<value2>;'
cookies.set('<key>', '<value>');
// note: when adding attributes the code  to update a cookie is slightly more complex
```

### Code Observation

- Cookies can't be updated. They can be re-written!
- It is important to remember when re-writing a cookie to set necessary attributes!
- It is important when designing the tech spec of a cookie to plan for attributes being write-only!

### Browser Obverations

- When viewing `cookies` assigned to `document.cookie` in a string, `attributes` are removed
- Cookie key and value pairs are separated by a `=` within the `cookies` string.
- Cookies are separated by a `;` with the `cookies` string

---
## Adding Multiple Cookies (Nuance 3)

When retrieving cookies, executing `console.log(document.cookie)`  will print all of the cookies on the document as key value pairs. In that same space, it isn’t far fetched to think multiple cookies could be added the same way—`document.cookie='foo=bar; biz=baz;'`. However, that could will only assign the first cookie.

To add multiple cookies, each cookie must be added in a separate `document.cookie` assignment like the code block below.

```javascript
  [{ key: 'foo', value: 'bar' }, { key: 'biz', value: 'baz' }].forEach(({ key, value }) => document.cookie = `${key}=${value};`);
  document.cookie; // 'foo=bar; biz=baz;'
```

### Code Observation

- Add cookies one at a time with the `document.cookie="<key>=<value>;"` assignment
- Read cookies all at the same time by logging `document.cookie`
- Each cookie must be added by assigning a key value pair to `document.cookie`
## Reading Multiple Added Cookies (Nuance 4)

When assigning a cookie, attributes are added with the same value as the key and value pair `=`, and `;`.
Weirdly, when retrieving cookies, each cookie represented by a key and value pair is also seperated by a `=`, and a `;`.

```javascript
document.cookie = '<key1>=<value1>; expires=<date1>; path=<path>; domain=<domain>; secure; httponly';
document.cookie; // '<key1>=<value1>;'
```

### Code Observation

- Don't worry about creating a cookie string with attributes and not being able to filter it among cookies and attributes!
- Do worry about writing tech spec which accounts for expires to only be re-written, not updated!
- Remember cookie keys are are unique, in that if you assign a cookie with the same key, it will overwrite the other cookie!
## Deleting Cookies (Nuance 5)

Deleting cookies is more complicated than expected. In order to delete the cookie, it must be assigned to no value as well as have its `Max-age` set to `-1`. It looks like this `document.cookie="foo=; Max-age=-1;";` . There is much discussion on Stackoverflow and the internet on the best way to delete cookies. Often the use of the setting the `expires` attribute to a date in the past is mentioned. However, defining a historical date seems more complex that setting a the Max-age to `-1`.

```javascript
  document.cookie = 'foo=bar;'; // foo=bar
  document.cookie = 'foo=; Max-age=-1;'; // empty
```

### Code Observation

- Delete cookies by assigning the cookie value to nothing and setting the Max-age or expires
- `Max-age` looks like a cleaner way to delete cookies vs `expires`
- Deleting cookies is can only be done 1 at a time, just like adding cookies

### Browser Observations

- If you only set the cookie value to empty (`document.cookie = "foo=;";`) (and don't set a Max-age or expires), the cookie will still display in the browser, but without value
- If you set the cookie value to empty and set the max-age to -1, the cookie will not display in the browser and will be deleted completely (`document.cookie = "foo=;max-age=-1;";`)

## Final thoughts

Cookies are a very simple useful way to store data.
The fact that they are write-only and can't be updated is important to understand.
Once those 2 points are understood, using cookies should be fun and generally easy.
Lastely, attributes are valuable for managing cookie behavior and keeping them secure!
Just remember they're only viewable in a browser's dev tools.

---

Before writing this post, I did get caught up in the nuances I have tried to describe in this article.
I always used [js-cookie](https://github.com/js-cookie/js-cookie) or similar so the nuances of `document.cookie` were hidden.
I wrote this simple utility, [mini-cookies](https://github.com/yowainwright/mini-cookies) with 0 dependencies to abstract these nuaces—but in a very mimimal way.
Please reach out if you have suggestions!

Happy Hacking!
