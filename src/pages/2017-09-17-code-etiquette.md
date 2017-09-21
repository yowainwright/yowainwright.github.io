---
title: Can Code Etiquette be a thing? Here are some starter thoughts on it.
date: "2017-09-16"
layout: post
readNext: "/"
path: "/code-etiquette/"
meta: Code Etiquette is an important for code quality, engineer happiness, and engineer growth—but is never talked about?
featured_image: null
share_image: null
categories:
- note
- story
---

_Code Etiquette_ is not discussed with a quarter of the level of scrutiny that _code_ is within the engineering community. Code etiquette affects learning, code quality, relationships, and self confidence. Code is logical in nature. It is easy to pin point code that is incorrect or could be improved. The human condition when looking at and discussing something that is logical (code) can disregard feelings of other people. This causes feelings get hurt and humans loose focus on learning and collaboration. This post boils down generalized feelings mixed suggested opportunities to improve **code etiquette**.

**Note:** Improving code etiquette, because of the human condition, is difficult! Here is a quick list of things that I've done, said, seen, or received that are easier wins in the art of Code Etiquette.

---

## Remove the person (`no personal reference`)

Without realizing it, often the difference between insightful critique and criticism is involving personal relationships in communication.

The lines below dissect a code review comment of the theoretical `function` where it is suggested that the there is an opportunity to return out of the function early.

#### **You and I: ** Using `you` or I `is` probably not offensive intentionally so don't worry. However, over time, involving the person _can_ start to feel less positive—especially if there are ever vocal tones added.

```md
You should return out of this function early
```

#### **We:** Using `we` is inclusive and it seems like a safe thing to say. However, if the person speaking says `we`, and has not worked on the code at all, it may seem falsely inclusive. 

```md
we should return out of this function early
```

#### **No personal reference:** Without personal reference, conversation or review will closely communicate to the problem, idea, or issue

```md
return out of this function early
```


Notice how the amount of text needed to communicate the same thing without using personal relationship takes less words and speaks most clearly to the to. This will help with human interaction, separate code discussion from personal discussion, and less words are need to communicate the exact same thing.

## Keep passionate conversations quiet

Passion is an important motivator for improving at things. Even passion when it is critical in nature can be very considerate and motivating. Feedback that is most useful to people is often critical in nature if the person receiving the critique is engaged. This sort of communication comes up a lot during architectural conversations or when discussing new products.

<figure>
<blockquote>Feedback that is most useful to a person is often critical in nature if the person receiving the critique is engaged.</blockquote>
<figcaption>**Note:** the person receiving the information **must** be ingaged to the critique.</figcaption>
</figure>

#### Imagine this comment when stated with exaggerated psychical movement, more excited vocal tone, and higher volume

```md
There are 8 web fonts used in this mock which may affect page load speed or even certain tracking metrics that could be caused by new race conditions!
```

#### Then, imagine a similar comment, even more terse but stated with a calm demeanor, slower delivery, and a normal vocal volume—followed by a question even

```md
There are 8 web fonts used in this mock. This will affect page load speed and possible tracking metrics because of potential race conditions! How can this be improved?
```

Notice, how the comments above are almost the same. The second comment is even more direct. It states a problem as a fact and then requests feedback. 

An important thing to remember when being passionate is taking on a quieter tone. This is a physical decision—not a social one. Passionate language can be the same and perceived very differently based on the orientation of the communicators tone. If psychical tone (body language), vocal tone, vocal pitch, and vocal volume remain gentle, it is observed that it is much more likely for an audience to remain engaged—even if the critique is critical in nature. 

Furthermore, it is observed that if the tone is seemingly aggressive in nature (exaggerated psychical movement, more excited vocal tone, higher volume) that the actual words used can be gentle in nature but the audience can feel very differently. This communication leads to embarrassment, a disengaged audience, and even loss of respect.

Seemingly aggressive communication is common with passionate communication because human condition wants to protect ideas that humans are passionate about. So, don't worry about it _too_ much if you observe that your audience is disengaged when discussing something that you're passionate about. The key is to remember that if you can create perceived gentle communication that it will be easier for your audience to remain engaged—even if they are not initially in agreement.

## Don't point, ever

Following the conversation above, pointing with written conversation or actual body language in almost any situation is not optimal for good communication. It changes the focal point of the conversation from the context of the conversation to a person or thing.

The example below shows how this behavior can happen in a code review. The example takes on the same `function` example as above—where the function can be return sooner.

#### The comment below provides a comment and then a link that goes above 5 levels higher which is actually confusing in the context of the code review.

```md
return out of this function earlier. You need to learn about [functional programming](http://www.cs.utah.edu/~germain/PPS/Topics/functions.html)
```

#### The comment below provides a comment then a sudo code suggestion

```javascipt
/* 
  return early like this 🏁
*/
const calculateStuff = (stuff) => {
  if (noStuff) return
  // calculate stuff
  return calculatedStuff
}
```

In the two comments above, the first comment causes the reader to go far beyond the issue. The conversation is more abstract—even [existential](https://www.merriam-webster.com/dictionary/existential). The second comment refers directly to the issue, then provides a `sudo code` example that relates directly to the comment.

Try to describe what is being discussed and try to remain on topic. This problem seems clear. 'Taking a step back', is a comment that happens often. This may be neccessary if the communicator is the one that is mis-communicating. If the communicator is referring that result of very different.

## You will probably never know if the product was right or good

Developers almost always want to re-write things. It is natural to break down problems to tasks and mentalities in real-time. Putting focus on _who's_ and _why's_ of products based on their history is an important to conceptualize because of the context that is gained. The phrase, 'history repeats itself' is key to that sentiment. This is important to remember when critiquing products or when a product you've written is critiqued. There is always a great amount of knowledge to be gained from context. 

---

The above list are general high level things that can help with positive engagement when talking about, reviewing, or reading about code or technology. I am a hypocrite. I do all of the things that I've written not to do in the list above. The goal for _Code Etiquette_ is develop a standard etiquette to strive for when discussing code in any format. Much like code, communication has things that are generally right and wrong. I hope to work with other developers to improve _Code Etiquette_ by developing standards by which code can be discussed. 

By thinking through the notes above for myself, I have created benchmarks where I have naturally begun to assess my _Code Etiquette_. I'm focusing on improving my communication based on my list daily. I would love would share these sentiments with other engineering to improve. ~Thanks
