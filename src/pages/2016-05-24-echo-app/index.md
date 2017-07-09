---
title: MDR Developer Meetup, Making an Echo App for Alexa
date: "2016-05-24"
layout: post
readNext: "/"
path: "/making-echo-app/"
meta: MDR Developer Meetup, Making an Echo App for Alexa by Patrick Teague of Washio
  & Hacking on the Impact Spectrum with Andrew Skotzko
share_image: "/assets/icons/js.jpg"
categories:
- javascript
- code
---

On May 24th, 2016 with the [Marina Del Rey Developer Meetup](http://www.meetup.com/Marina-Del-Rey-Developer-Meetup/events/230952417/), [Patrick Teague](https://github.com/teagup) discussed making an [Echo App](https://developer.amazon.com/appsandservices/solutions/devices/echo) & [Andrew Skotzko](https://github.com/skotzko) discussed _Hacking on the Impact Spectrum_.

## Meetup Topic 1: Hacking on the Impact Spectrum with Andrew Skotzko

Over the last months of 2016, Andrew Skotzko was thinking about how he could make the most impact with his available time. He broke his thinking down into 2 key terms: Impact Spectrum & Effective Altruism. Impact Spectrum from what I understood is how a person can focus their time. Effective Altruism _is a philosophy and social movement that applies evidence and reason to determining the most effective ways to improve the world_ ~[Wikipedia](https://en.wikipedia.org/wiki/Effective_altruism).

Big Question: So you want to make a contribution?

## Impact Spectrum

-  Scaled Direct Service
-  Systems Change
-  Framework Change
-  Direct Service
   -  Localized Impact
   -  Does it leverage skills?

## Philosophy

-  [Effective Altruism](http://www.effectivealtruism.org/)
   -  Charity Navigator
   -  Give Well (Better)

## How to look into helping

-  [80,000 Hours](https://80000hours.org/): Making the biggest difference with your career
-  [Catchafire](https://www.catchafire.org/): skills based volunteering

## Summary of Presentation: Discussing tech for non-profits & how you can get involved

-  New Project Andrew is working on: [Good Technology Project](http://goodtechnologyproject.org/) (Information Technology)
-  He's working with TED Fellows so far
-  An example - Data Oasis - create a ways to connect data

## Q/A

-  Rewarding: putting people together
-  Non-profits: [xprize](http://www.xprize.org/)
-  Board Level: confused with data opportunities
-  Book: Doing Good Better


## Meetup Topic 2: Making the Washio Echo App with speaker Patrick Teague

Patrick Teague with [Washio](https://www.getwashio.com/) made an app so that their (Washio's) customer's could use Alexa to get their clothes to be cleaned. He discussed how he made to Echo App, some utilities he used & some bugs he encountered.

<figure class="figure figure--full">
	<iframe style="height: auto; min-height: 315px; width: 100%;" src="https://www.youtube.com/embed/acybh2Q_qNg" frameborder="0" allowfullscreen></iframe>
</figure>

## Alexa (an Amazon device), responds to your voice commands

-  Alexa apps are called skill
   -  consists of 1 or more intents
      -  `[Alexa],[App][What to do]`
      -  `Alexa:{App: {what to do: ‘’}}`
-  Alexa skills kits are called asks
-  Amazon manages some key words like `yes` & with synonyms
-  Your app has to tell you how to use it.

Note: *NPM Module = AlexaApp*

## Q/A

-  Do you have to have an Echo? Yes
-  Does Alexa have push functionality? No
-  Does Alexa do well recognizing your voice? Yes
-  Does Alexa support multiple languages? Yes
-  You have to have certified Alexa namespace.

**NOTE (5/24/2016)**: Links to powerpoints _might_ happen. ~Thanks
