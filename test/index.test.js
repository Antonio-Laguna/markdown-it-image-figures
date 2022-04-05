/* eslint-disable prefer-arrow-callback */
'use strict';
import assert from 'assert';
import attrs from 'markdown-it-attrs';
import mdIT from 'markdown-it';
import implicitFigures from '../dist/markdown-it-images-figures.mjs';

describe('markdown-it-image-figures', function() {
  let md;
  beforeEach(function() {
    md = mdIT().use(implicitFigures);
  });

  it('should add <figure> when image is by itself in a paragraph', function() {
    const src = 'text with ![](img.png)\n\n![](fig.png)\n\nanother paragraph';
    const expected = '<p>text with <img src="img.png" alt=""></p>\n<figure><img src="fig.png" alt=""></figure>\n<p>another paragraph</p>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should add <figure> when image is by itself in a paragraph and preceeded by a standalone link', function() {
    md = mdIT().use(implicitFigures, { dataType: true, figcaption: true });
    const src = '[![](fig.png "Caption")](http://example.com)';
    const expected = '<figure data-type="image"><a href="http://example.com"><img src="fig.png" alt=""></a><figcaption>Caption</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should add data-type=image to figures when opts.dataType is set', function() {
    md = mdIT().use(implicitFigures, { dataType: true });
    const src = '![](fig.png)\n';
    const expected = '<figure data-type="image"><img src="fig.png" alt=""></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert title text into a figcaption when opts.figcaption is true', function() {
    md = mdIT().use(implicitFigures, { figcaption: true });
    const src = '![This is an alt](fig.png "This is a caption")';
    const expected = '<figure><img src="fig.png" alt="This is an alt"><figcaption>This is a caption</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert title text for each image into a figcaption when opts.figcaption is true', function() {
    md = mdIT().use(implicitFigures, { figcaption: true });
    const src = '![alt 1](fig.png "caption 1")\n\n![alt 2](fig2.png "caption 2")';
    const expected = '<figure><img src="fig.png" alt="alt 1"><figcaption>caption 1</figcaption></figure>\n<figure><img src="fig2.png" alt="alt 2"><figcaption>caption 2</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert title text into a figcaption when opts.figcaption is "title"', function() {
    md = mdIT().use(implicitFigures, { figcaption: 'title' });
    const src = '![This is an alt](fig.png "This is a caption")';
    const expected = '<figure><img src="fig.png" alt="This is an alt"><figcaption>This is a caption</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert title text for each image into a figcaption when opts.figcaption is "title"', function() {
    md = mdIT().use(implicitFigures, { figcaption: 'title' });
    const src = '![alt 1](fig.png "caption 1")\n\n![alt 2](fig2.png "caption 2")';
    const expected = '<figure><img src="fig.png" alt="alt 1"><figcaption>caption 1</figcaption></figure>\n<figure><img src="fig2.png" alt="alt 2"><figcaption>caption 2</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert alt text into a figcaption when opts.figcaption is set to "alt"', function() {
    md = mdIT().use(implicitFigures, { figcaption: 'alt' });
    const src = '![This is an alt](fig.png "This is a caption")';
    const expected = '<figure><img src="fig.png" alt="This is an alt"><figcaption>This is an alt</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should convert alt text for each image into a figcaption when opts.figcaption is set to "alt"', function() {
    md = mdIT().use(implicitFigures, { figcaption: 'alt' });
    const src = '![alt 1](fig.png "caption 1")\n\n![alt 2](fig2.png "caption 2")';
    const expected = '<figure><img src="fig.png" alt="alt 1"><figcaption>alt 1</figcaption></figure>\n<figure><img src="fig2.png" alt="alt 2"><figcaption>alt 2</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should throw an error when opts.figcaption is "ttitle"', function () {
    md = mdIT().use(implicitFigures, { figcaption: 'ttitle' });
    const src = '![alt 1](fig.png "caption 1")\n\n![alt 2](fig2.png "caption 2")';

    assert.throws(() => {
      md.render(src);
    }, /figcaption must be one of: true,false,alt,title/);
  });


  it('should add incremental tabindex to figures when opts.tabindex is set', function() {
    md = mdIT().use(implicitFigures, { tabindex: true });
    const src = '![](fig.png)\n\n![](fig2.png)';
    const expected = '<figure tabindex="1"><img src="fig.png" alt=""></figure>\n<figure tabindex="2"><img src="fig2.png" alt=""></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should reset tabindex on each md.render()', function() {
    md = mdIT().use(implicitFigures, { tabindex: true });
    const src = '![](fig.png)\n\n![](fig2.png)';
    const expected = '<figure tabindex="1"><img src="fig.png" alt=""></figure>\n<figure tabindex="2"><img src="fig2.png" alt=""></figure>\n';
    let res = md.render(src);
    assert.strictEqual(res, expected);
    // render again, should produce same if resetting
    res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should not make figures of paragraphs with text and inline code', function() {
    const src = 'Text.\n\nAnd `code`.';
    const expected = '<p>Text.</p>\n<p>And <code>code</code>.</p>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should not make figures of paragraphs with links only', function() {
    const src = '[link](page.html)';
    const expected = '<p><a href="page.html">link</a></p>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should linkify captions', function() {
    md = mdIT({ linkify: true }).use(implicitFigures, { figcaption: true });
    const src = '![](fig.png "www.google.com")';
    const expected = '<figure><img src="fig.png" alt=""><figcaption><a href="http://www.google.com">www.google.com</a></figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should work with markdown-it-attrs', function() {
    md = mdIT().use(attrs).use(implicitFigures);
    const src = '![](fig.png){.asdf}';
    const expected = '<figure><img src="fig.png" alt="" class="asdf"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should put the image inside a link to the image if it is not yet linked', function() {
    md = mdIT().use(implicitFigures, { link: true });
    const src = '![www.google.com](fig.png)';
    const expected = '<figure><a href="fig.png"><img src="fig.png" alt="www.google.com"></a></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should not mess up figcaption when linking', function() {
    md = mdIT().use(implicitFigures, { figcaption: true, link: true });
    const src = '![](fig.png "www.google.com")';
    const expected = '<figure><a href="fig.png"><img src="fig.png" alt=""></a><figcaption>www.google.com</figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should leave the image inside a link (and not create an extra one) if it is already linked', function() {
    md = mdIT().use(implicitFigures, { link: true });
    const src = '[![www.google.com](fig.png)](link.html)';
    const expected = '<figure><a href="link.html"><img src="fig.png" alt="www.google.com"></a></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should keep structured markup inside caption (event if not supported in "alt" attribute)', function() {
    md = mdIT().use(implicitFigures, { figcaption: true });
    const src = '![](fig.png "Image from [source](to)")';
    const expected = '<figure><img src="fig.png" alt=""><figcaption>Image from <a href="to">source</a></figcaption></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should copy attributes from img to figure tag', function() {
    md = mdIT().use(attrs).use(implicitFigures, { copyAttrs: '^class$' });
    const src = '![alt](fig.png){.cls attr=val}';
    const expected = '<figure class="cls"><img src="fig.png" alt="alt" class="cls" attr="val"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should support lazy loading', function() {
    md = mdIT().use(attrs).use(implicitFigures, { lazy: true });
    const src = '![alt](fig.png)';
    const expected = '<figure><img src="fig.png" alt="alt" loading="lazy"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should be possible to override lazy', function() {
    md = mdIT().use(attrs).use(implicitFigures, { lazy: true });
    const src = '![alt](fig.png){loading=eager}';
    const expected = '<figure><img src="fig.png" alt="alt" loading="eager"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should support async decoding', function() {
    md = mdIT().use(attrs).use(implicitFigures, { async: true });
    const src = '![alt](fig.png)';
    const expected = '<figure><img src="fig.png" alt="alt" decoding="async"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should be possible to override decoding', function() {
    md = mdIT().use(attrs).use(implicitFigures, { async: true });
    const src = '![alt](fig.png){decoding=sync}';
    const expected = '<figure><img src="fig.png" alt="alt" decoding="sync"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should support removing source', function() {
    md = mdIT().use(attrs).use(implicitFigures, { removeSrc: true });
    const src = '![alt](fig.png)';
    const expected = '<figure><img alt="alt" data-src="fig.png"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should support adding classes', function() {
    md = mdIT().use(attrs).use(implicitFigures, { classes: 'one two' });
    const src = '![alt](fig.png)';
    const expected = '<figure><img src="fig.png" alt="alt" class="one two"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });

  it('should support copying classes', function() {
    md = mdIT().use(attrs).use(implicitFigures, { copyAttrs: '^class$', classes: 'one two' });
    const src = '![alt](fig.png){.cls attr=val}';
    const expected = '<figure class="cls"><img src="fig.png" alt="alt" class="cls one two" attr="val"></figure>\n';
    const res = md.render(src);
    assert.strictEqual(res, expected);
  });
});
