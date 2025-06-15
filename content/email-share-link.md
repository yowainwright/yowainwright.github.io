---
title: Debugging email share links
date: "2016-12-07"
path: "/email-share-link"
meta:
  Email share links are often disregarded as simple but there are a few challenges
  to be aware of
categories:
  - code
  - javascript
  - html
---

After an Apple Phone IOS update, there was an issue with email links on several content websites when customers would click the **email share link**. When clicking on the email share, customers were being shown an alert box.

On desktop devices, there was no issue.

After going through various debugging techniques, I noticed 2 things that may help other developers out:

- Make sure that there is no target attribute on the email share link. This is what initiates alerts on mobile devices.
- When debugging errors with email share links on Device Simulators, remember that simulators like the IOS Simulator don't have email clients installed initially.

Here's a code sample of something that works:

```html
<a
  href="mailto:?subject={{articleTitle}}&amp;body={{articleLink}}"
  data-track-share="Email"
  data-track-slug="{{articleLink}}"
  class="share__link share__link--mail js-share-mail js-share-event"
  title="Email"
  >Share</a
>
```
