---
title: Switching Back To Sublime 3 and Why It Was a Good Move
date: 2017-02-13 00:00:00 Z
permalink: "/switching-back-to-sublime/"
categories:
- note
- story
layout: post
meta: This post discusses why I switched back to the Sublime text dditor after trying out Atom, another text editor.
imgix: true
share_image: "https://yowainwright.imgix.net/icons/js.jpg"
---
The majority of people on the Frontend Team in my current use [Atom](https://atom.io/) as a text editor. To more closely mimic my team, I decided to make the switch from Sublime 3 (another text editor) to Atom.

## Initial Feelings

My initial take on Atom was that beautiful—more beautiful out-of-the-box than Sublime and I liked that. I started to invest time learning quick keys. Over time, I noticed that Sublime had out of the box features that were not available with Atom—like drag-and-drop.  Avoiding dragging is important but for *_1 thing_ I do a lot I couldn't find a solution and dragging seems easier for me. 

> *RE =>1 thing: With an Atom Window open I could not figure out a way to drag-and-drop a new project folder into its sidebar. 

Beyond that, I found Atom to be slow and a memory hog. I've heard the debate that Sublime can become slow when a lot of plugins are added but I've never seen or felt that. 

## Realizing that I am more productive with Sublime

After a few months of feeling like I wasn't as productive with Atom, I decided to switch back to Sublime. I started re-learning my quick keys and then looking into some of the features that I liked about Atom—to see if I could add them with a plugin in Sublime.

## Making Sublime as beauitful as Atom

I love Atom's out of the box beauty. I've found that it only takes a few minutes to get Sublime to take on the features I enjoy.

1. File Icons: I doubt that file icons came with Atom but that's were I first saw them. With the plugin [a-file-icon](https://github.com/ihodev/a-file-icon) I was able to achieve that. 

2. A new app icon: even though I personally didn't mind the Sublime icons there are some out there that just great. I updated the Sublime App icon with this great [replacement](https://github.com/YabataDesign/sublime-text-icon) from [José María Clemente](https://github.com/YabataDesign)

3. A sweet font: watching [Wes Bos's](http://wesbos.com/) videos caused me to wonder about that awesome font he uses ([Operator](https://www.typography.com/blog/introducing-operator)) as an editor font. I don't have the $270 for Operator on my home and work computer so I went with a another recommendation from [him](http://wesbos.com/programming-fonts/) called [m-2m](http://www.fontspace.com/m-fonts/m-2m).

## How I added things I liked from Atom to Sublime

1. For adding file icons, and an awesome them I went to the sublime package manager and downloaded them. I recommend the [material theme](https://github.com/equinusocio/material-theme) b/c I it transitions between regular and italic fonts and has a nice sweet of supporting features—linke icons for files.

```terminal
Sublime Text > Preferences > Package Control
```

2. For adding a new app icons, I went [here](https://github.com/YabataDesign/sublime-text-icon) and followed the steps

```terminal
-  click download
-  open /Applications/Sublime\ Text.app/Contents/Resources/
-  replace Sublime Text.icns
-  right click on the Sublime Text App > select 'get info'
-  drag the downloaded 'Sublime Text.icns' over the deafult icon in the top left corner
```
3. For changing the font, first I downloaded a font, [m-2m](http://www.fontspace.com/m-fonts/m-2m). Then I updated my Sublime Settings.

```terminal
-  download and install the font
-  Sublime Text (nav) > Preferences > Settings 
```
And here's the JSON
```javascript
"font_face": "mplus-2m-medium",
  "font_options":
  [
    "gray_antialias",
    "subpixel_antialias"
  ],
  "font_size": 17.0
```
## Summary

Atom is great. I really like how it is built but I like Sublime more for. It's easy to get caught up in the churn of trying new tools. I'm glad I went back to Sublime because it is still just the best (for me right now). 💛



