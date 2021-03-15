# markdown-it-image-figures

Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

This module is a fork from [markdown-it-implicit-figures](https://github.com/arve0/markdown-it-implicit-figures) in which I wanted to introduce new features and make sure this was up to what the standard is today.

Example input:
```md
text with ![](img.png)

![](fig.png)

works with links too:

[![](fig.png)](page.html)
```

Output:
```html
<p>text with <img src="img.png" alt=""></p>
<figure><img src="fig.png" alt=""></figure>
<p>works with links too:</p>
<figure><a href="page.html"><img src="fig.png" alt=""></a></figure>
```


## Install

```
$ npm install markdown-it-image-figures
```

## Usage

```js
const md = require('markdown-it')();
const implicitFigures = require('markdown-it-image-figures');

md.use(implicitFigures);

const src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
const res = md.render(src);

console.log(res);

/*
<p>text with <img src="img.png" alt=""></p>
<figure><img src="fig.png" alt=""></figure>
<p>another paragraph</p>
*/
```

### Options

- `dataType`: Set `dataType` to `true` to declare the `data-type` being wrapped,
  e.g.: `<figure data-type="image">`. This can be useful for applying a special
  styling for different kind of figures.

- `figcaption`: Set `figcaption` to `true` to use the title as a `<figcaption>` block after the image. E.g.: `![This is an alt](fig.png "This is a caption")` renders to

```html
<figure>
    <img src="fig.png" alt="This is an alt">
    <figcaption>This is a caption</figcaption>
</figure>
```

- `tabindex`: Set `tabindex` to `true` to add a `tabindex` property to each figure, beginning at `tabindex="1"` and incrementing for each figure encountered. Could be used with [this css-trick](https://css-tricks.com/expanding-images-html5/), which expands figures upon mouse-over.

- `link`: Put a link around the image if there is none yet.

- `copyAttrs`: Copy attributes matching (RegExp or string) `copyAttrs` to `figure` element.

- `lazy`: Removes the source from the image and applies the `loading` attribute as `lazy`.

Code like `![alt](fig.png)` renders to:

````html
<figure>
    <img alt="alt" data-src="fig.png" class="lazy" loading="lazy">
</figure>
````

Then you need to load something like [Lozad.js](https://github.com/ApoorvSaxena/lozad.js) and some script like [this](./lazy-example.js). It's possible to change the `lazy` class added to the `img` (for easy selector) by just passing the class to the option such as:

```js
md.use(implicitFigures, {
  lazy: 'some-other-class'
});

const src = '![alt](fig.png)';
const res = md.render(src);

console.log(res);
/*
<figure>
    <img alt="alt" data-src="fig.png" class="some-other-class" loading="lazy">
</figure>
*/
```
