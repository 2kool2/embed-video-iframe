#On demand, embed YouTube video's in an iframe

One or more video links playing a video in one or more target locations.

<strong>CodePen demo: <a href="https://codepen.io/2kool2/pen/dXEwEd">Embed video iframe</a></strong>

<br>
<h2>Features</h2>

* All customisations are via inline HTML attributes and CSS. No need to edit JavaScript.
* <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2 level AA with WAI-<abbr title="Accessible Rich Internet Applications">ARIA</abbr> support
* Fully responsive, mobile-first approach.<br><code>iframe</code> resizes with the window.
* Vanilla JavaScript with zero dependencies.
* Lightweight, less than XXX KB to the browser with XXX KB CSS.
* Just a link is presented when JavaScript is unavailable.
* Multiple video links targeting one or more target locations.
* Link and target area may be the same container.

Solution presented accomodates multiple video choices into a single area


<br>
<h2>Basic usage</h2>

Link to the stylesheet:
```html
<link rel="stylesheet" href="css/styles.css">
```

Define SVGs for the "close" and "loading" icons:
```html
<svg style="display:none">
  <defs>
    <symbol viewBox="0 0 224 170" id="icon-youtube-play">
      <title>Play video</title>
      <path fill="white" d="M92 111l54-28L92 55V111z"></path>
      <path d="M209 46c0 0-2-14-8-20-7-8-16-8-20-8-28-2-69-2-69-2h0c0 0-42 0-69 2-4 1-12 1-20 8-6 6-8 20-8 20s-2 16-2 32v15c0 16 2 32 2 32s2 14 8 20c8 8 18 8 22 8 16 2 67 2 67 2s42 0 69-2c4 0 12 0 20-8 6-6 8-20 8-20s2-16 2-32v-15C211 62 209 46 209 46zM92 111V55l54 28L92 111z"></path>
    </symbol>
    <symbol viewBox='0 0 150 130' id="icon-loading">
      <title>Loading</title>
      <path d='M81.5 33l30.8-32.8c0.3-0.3 0.5-0.2 0.3 0.3 -1.8 5.2-1.7 15.3-1.7 15.3 -0.1 6.8-0.8 11.7-6.6 17.9L74.8 65.1c-0.2 0.2-0.4 0-0.3-0.2 1.5-5.1 1.2-15.1 1.2-15.1C75.4 45.6 76.4 38.4 81.5 33M105.9 54.8l43.8 10.3c0.4 0.1 0.4 0.4-0.2 0.4 -5.4 1-14.1 6.1-14.1 6.1 -6 3.3-10.5 5.2-18.8 3.2l-41.9-9.9c-0.3-0.1-0.2-0.3 0-0.4 5.2-1.3 13.7-6.5 13.7-6.5C92 55.9 98.7 53.1 105.9 54.8M99.4 86.3l13 43.2c0.1 0.4-0.1 0.5-0.4 0.1 -3.6-4.2-12.4-9.2-12.4-9.2 -5.8-3.5-9.7-6.5-12.2-14.6L75 64.5c-0.1-0.3 0.2-0.4 0.3-0.2 3.7 3.9 12.5 8.6 12.5 8.6C91.5 74.8 97.3 79.2 99.4 86.3M68.7 97l-30.8 32.8c-0.3 0.3-0.5 0.2-0.3-0.3 1.8-5.2 1.7-15.3 1.7-15.3 0.1-6.8 0.8-11.7 6.6-17.9l29.5-31.4c0.2-0.2 0.4 0 0.3 0.2 -1.5 5.1-1.2 15.1-1.2 15.1C74.8 84.4 73.8 91.6 68.7 97M44.1 75.8L0.3 65.4C-0.1 65.3-0.1 65 0.5 65c5.4-1 14.1-6.1 14.1-6.1 6-3.3 10.5-5.2 18.8-3.2l41.9 9.9c0.3 0.1 0.2 0.3 0 0.4 -5.2 1.3-13.7 6.5-13.7 6.5C58.1 74.7 51.3 77.5 44.1 75.8M50.2 43.8l-13-43.2c-0.1-0.4 0.1-0.5 0.4-0.1C41.2 4.7 50 9.7 50 9.7c5.8 3.5 9.7 6.5 12.2 14.6l12.4 41.3c0.1 0.3-0.2 0.4-0.3 0.2 -3.7-3.9-12.5-8.6-12.5-8.6C58.1 55.4 52.4 50.9 50.2 43.8'/>
    </symbol>
  </defs>
</svg>
```

Add data attributes to the link.
<br><code>data-video</code> is a requirement, it only needs populating with a value if it's different to the <code>href</code>.
<br><code>data-video_img</code> The location of the image to use as background.
<br><code>data-video_stage</code> The id of the container to add the video to.
```html
<div id=stage class=stage role=presentational>

    <a class=btn-video
       href="https://www.youtube.com/watch/RLEKiXaixLY"
       data-video="https://www.youtube.com/embed/RLEKiXaixLY"
       data-video_img="img/video-2.jpg"
       data-video_stage="stage">
      Play the [description] video
    </a>

</div>
```

Add the script:
```html
<script src="js/accessible-video-iframe.2.0.min.js"></script>
```


<br>
<h2>Alternate launch buttons</h2>

The video may be launched by objects other than links.<br>
The demo shows, links (image and text-only), buttons, and just an image.


<br>
<h2>Caveat</h2>

This method neither raises or lowers accessibility barriers caused by the <code>iframe</code> content itself.


<br>
<h2>Current status</h2>

Currently in use as part of the <a href="http://www.tesco.com/baking/">Tesco Bake Off</a> campaign.<br>
Preliminary accessibility testing performed by the <a href="http://www.digitalaccessibilitycentre.org/">Digital Accessibility Centre</a>.


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
