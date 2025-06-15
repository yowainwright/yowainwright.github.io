---
title: "The 2000s are no longer a teenager, starting out 2020"
date: "2020-01-06"
path: /2000s-not-a-teenager
meta: >-
  This post summarizes my first days of 2020 with brief reflections on 2019,
  what I learned which included Functional Programming, TypeScript, nervous
  system healing and awareness
categories:
  - update
  - date
---

> A swell came to Southern California the last days of 2019 giving SoCal Surfers the opportunity to shred into the new year. I was one of them. I surfed Ventura Point and El Porto into the new year. It was a good way to wrap 2019 which in no way went as expected for me.

---

I started out last year, 2019, focused on becoming better at [Functional Programming](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) and [Typescript](https://en.wikipedia.org/wiki/TypeScript) but later changed my focus to art, interpersonal communication, and [nervous system healing](https://www.brainpickings.org/2016/06/20/the-body-keeps-the-score-van-der-kolk/) via acupuncture. I couldn’t have imagined the journeys and adventures I had over the course of 2019. Almost nothing I experienced I would have expected even at the very end of 2018.

In this post, I'm going cover what I anticipated I would learn and then write about what I actually learned, or did.

<figure class="figure--post">
  <img src="https://yowainwright.imgix.net/2000s-not-a-teenager/2.jpg?auto=format&w=800&fit=crop&crop=focalpoint&auto=format" alt="Angeles Forest Early 2020" />
</figure>

## Functional Programming, simplicity and expectations

Functional Programming is a way of programming where an expected input always delivers an expected output. Many engineers believe functional programming is easier to understand once its patterns are more understood and it generally easier to test—an expected input should always deliver an expected output.

> An expected input always delivers an expected output

To understand more about functional programming, I suggest reading posts by Eric Elliot or looking at [Ramda](https://fr.umio.us/why-ramda/), an open source library full of JavaScript programming utilities written [functionally and in TypeScript](https://ramdajs.com/docs/). [Eric Elliot](https://ericelliottjs.com/) offers so much content on the subject of [functional programming](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc).

The code below demonstrates a [linked list](https://en.wikipedia.org/wiki/Linked_list) in functional form. View a living [Codepen here](https://codepen.io/yowainwright/pen/eYmqeWo).

```javascript
const link = (tree, item) => [item, tree];

const items = [{ a: "a" }, { b: "b" }, { c: "c" }];

const linkedList = items.reduceRight(link, []);
```

## TypeScript, data type checking for JavaScript

[TypeScript](http://www.typescriptlang.org/) is a computer programming language that compiles to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). JavaScript can run anywhere—in a web browser, server, etc but is not safely typed.

With JavaScript, a function as listed below does not require specific types which means that any type of data can be passed into the function.

```javascript
const add = (num, num2) => num + num2;
```

Which means that it can be invoked with a `number` data type and `string` data type as arguments even though the function is meant to be invoked with a `number` and a `number`.

```javascript
add(2, 'hat)
```

With TypeScript, a code editor would catch this potential mistake and the function would be written like so.

```typescript
const add = (num: number, num2: number): number => num + num2;
```

The code, written in TypeScript above basically says the the function requires 2 numbers and returns a number.

```typescript
const add = (num: number, num2: number): number => num + num2;

const addedNumber = add(2, 4); // 6
const erroringAddedNumber = add(2, "4"); // TypeScript would catch this within a text editor, and a build
```

If I tried to use the `add` function above with an number and string as I wrote above with JavaScript, TypeScript would throw an error at build time and within a [text editor](https://code.visualstudio.com/). See the could above for the general idea.

## After Years of Not Making Any Art, I Started Making Art Again

After 2 trips to Kauai in September, a strong desire to draw and paint manifested. I've long had a passion for Art. Making Art again now feels wonderful. It feels great to have the duality of writing software which is very logical while also painting which feels emotional. Painting, for me, comes from feeling versus the consideratation I rely on writing software.

<figure class="figure--post">
  <img src="https://yowainwright.imgix.net/2000s-not-a-teenager/6-grey.jpg?auto=format&w=800&fit=crop&crop=focalpoint&auto=format" alt="Jacob holding a painting I did" />
</figure>

As I continue through my journey into 2020, I hope to continue to explore art and painting.

## Interpersonal Communication, The Subtle Art Of The Emotional Presense That Comes From The Body

The nuances of human interaction have always been confusing to me. Language and vocal communication are strengths of mine, generally. However, I find my mannerisms in certain conversations or to be awkward. In some respects this awkwardness is part of who I am. However, some of my mannerisms felt tied to something psychical within my body. I felt like I was holding stress in the body. At the beginning of last year, i decided I wanted to work on healing this stress.

A friend of mine suggested acupunture for helping with stress. This confused me. I thought acupuncture was for psychical ailments, not removing stress! It was a gift to learn I was wrong. Through acupuncture, I feel like my body was able to release stress from my body and get more in tune with it. I did later find a mental health professional to work with

After my success with acupuncture, I decided to try other forms of body stress relief. I tried Reiki and Symatic Experience Therapy. I found acupuncture to be very healing. I strongly recommend doing things to check in with the body. Making sure I'm aware of stress my body is holding is important for knowing how my body is feeling and how I am feeling.

## January 2020 onward

2019 was not what I expected. I started with one set of goals and ended up learning about completely different things and focusing on completely different things. Transitioning from a tecnical focus to an emotional one caused my mind to feel more at ease and my body to generally feel more relaxed—which has really help me out learning technical things. I couldn't have expected or anticipated how 2019 went for me. I'm curious how 2020 will go. Let's do it.
