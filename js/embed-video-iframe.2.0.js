
// https://john-dugan.com/javascript-debounce/
var debounce=function(e,t,n){var a;return function(){var r=this,i=arguments,o=function(){a=null,n||e.apply(r,i)},s=n&&!a;clearTimeout(a),a=setTimeout(o,t||200),s&&e.apply(r,i)}};



(function (window, d, debounce) {

  "use strict";

  // Button style object to iframed video version 2.0 31-08-2016

  // Requires:
  //    .hasJS class preferably set on <html> tag to allow CSS to kick-in early
  //    SVG definitions for: #icon-youtube-play, #icon-loading
  //    External functions: debounce()

  // To do:
  //    Externalise class names to cfg file

  // defaults global to this module
  var videoName = "video";
  var btnClass = "btn-video";
  var stages = [];

  var iframeClass = videoName + "_iframe";


  var _getStageSize = function (stageObj) {
    var size = {};
     // more performant than getBoundingClientRect
    size.width = stageObj.clientWidth;
    size.height = (size.width / 16) * 9;
    return size;
  };


  var _resizeTheatre = function () {

    function _resizeIframes (stageObj, size) {
      var iframes;
      var i;
      iframes = stageObj.getElementsByClassName(iframeClass);
      i = iframes.length;
      while (i--) {
        iframes[i].width = size.width;
        iframes[i].height = size.height;
      }
    }

    var stageObj;
    var size;
    var i = stages.length;
    while (i--) {
      stageObj = d.getElementById(stages[i]);
      size = _getStageSize(stageObj);
      stageObj.style.height = size.height + "px";
      _resizeIframes(stageObj, size);
    }
  };


  var _addIframe = function (stageObj) {

    var size = _getStageSize(stageObj);
    var iframe = d.createElement("iframe");

    iframe.src = stageObj.videoSrc + "?rel=0&autoplay=1";
    iframe.className = iframeClass;
    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("allowfullscreen", true);
    iframe.width = size.width;
    iframe.height = size.height;

    stageObj.style.height = size.height + "px";

    // Don't display iframe until its content is as ready as possible to detect
    iframe.addEventListener("load", function () {
      //requestAnimationFrame(function () { // support IE9

        //iframe.classList.add(videoName + "_iframe-on"); // supporting IE9
        iframe.className += " " + videoName + "_iframe-on";

        //stageObj.classList.remove("-fetching"); // supporting IE9
        stageObj.className =  stageObj.className.replace(" -iframe-fetching", " -iframe-on");
        iframe.focus();
      //});
    }, false);

    stageObj.className += " -iframe-fetching";
    stageObj.appendChild(iframe);
  };


  var _removeOldIframe = function (stageObj) {

    // fade existing iframe, leaving new image + svg
    var frames = stageObj.getElementsByClassName(iframeClass);

    // Only if more then 1 iframe present
    if (frames && frames.length > 1) {

      // Switch off old iframe
      //frames[0].classList.remove("video_iframe-on"); //support IE9
      frames[0].className = frames[0].className.replace(videoName + "_iframe-on", "");
      stageObj.className = stageObj.className.replace(" -iframe-on", "");
      setTimeout(function () {
        // remove old iframe
        stageObj.removeChild(frames[0]);
      }, 500);
    }
  };


  var _getTarget = function (obj) {
    var target = obj;
    var isBodyTag = obj.tagName.toLowerCase() === "body";
    if (isBodyTag) {
      target = false;
    } else {
      if (!obj.videoSrc) {
        target = _getTarget(obj.parentElement);
      }
    }
    return target;
  };


  var _btnAttachProperties = function (btnObj) {
    var btnReturn = false;
    var dataStr = "data-" + videoName;
    if (
      (btnObj.hasAttribute("href") || btnObj.hasAttribute(dataStr))
      && btnObj.hasAttribute(dataStr + "_stage")
      && d.getElementById(btnObj.getAttribute(dataStr + "_stage"))
      && btnObj.hasAttribute(dataStr + "_img")
    ) {
      // Attached properties are used on build
      // On-click they are evaluated again
      // allows developer to in-browser amend values before clicking
      btnObj.videoSrc = btnObj.getAttribute("href") || btnObj.getAttribute(dataStr);
      btnObj.stageId = btnObj.getAttribute(dataStr + "_stage");
      btnObj.imageSrc = btnObj.getAttribute(dataStr + "_img");
      btnObj.isButton = btnObj.tagName.toLowerCase() === "button";
      btnObj.isImage = btnObj.tagName.toLowerCase() === "img";

      // text only button option
      btnObj.isTextOnly = btnObj.hasAttribute(dataStr + "_textOnly");

      btnReturn = btnObj;
    }
    return btnReturn;
  };


  var _embedVideo = function (e) {

    e.preventDefault();

    var stageObj;
    var target = _getTarget(e.target); // Tests for presence of target.videoSrc property

    if (target) {

      // Do not rely on button properties initial state
      target = _btnAttachProperties(target);
      if (target) {

        stageObj = d.getElementById(target.stageId);
        stageObj.videoSrc = target.videoSrc;
        stageObj.style.backgroundImage = "url(" + target.imageSrc + ")";

        // Remove stage button
        var btns = stageObj.getElementsByClassName(btnClass);
        if (btns && btns[0]) {
          stageObj.removeChild(btns[0]);
        }

        _addIframe(stageObj);
        _removeOldIframe(stageObj);

      }
    }
  };


  var _keydown_btn = function (e) {
    // enter or space from the opener object
    if (e.which === 13 || e.which === 32) {
        e.preventDefault();
        _embedVideo(e);
    }
  };


  var _getSVG = function (icon, clss, title) {
    var svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.classList.add(clss); // IE9 support
    // svg.className = clss; // Edge support
    svg.setAttribute("class", clss);

    // Prevent IE focusing on SVG
    svg.setAttribute("focusable", "false");
    if (title) {
      var t = d.createElementNS("http://www.w3.org/2000/svg", "title");
      t.textContent = title;
      svg.appendChild(t);
    }
    var use = d.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + icon);
    svg.appendChild(use);
    return svg;
  };


  var _setStage = function (btnObj, stageObj) {

    var cloneBtn = btnObj.cloneNode(true);

    stageObj.setAttribute("role", "dialog");
    stageObj.style.height = _getStageSize(stageObj).height + "px";
    stageObj.style.backgroundImage = "url(" + btnObj.imageSrc + ")";

    cloneBtn.videoSrc = btnObj.videoSrc;

    var imgs = cloneBtn.getElementsByTagName("img");
    if (imgs && imgs[0]) {
      imgs[0].style.visibility = "hidden";
    }

    if (btnObj.isTextOnly) {
      cloneBtn.className = btnClass;
      cloneBtn.style.color = "transparent";
    }

    stageObj.innerHTML = "";
    stageObj.appendChild(cloneBtn);
    stageObj.appendChild(_getSVG("icon-loading", "svg-loading", "Loading"));
    stageObj.appendChild(_getSVG("icon-youtube-play", "svg-play", "Play video"));

    return cloneBtn;
  };


  var _addButtonEvents = function (btnObj) {
    // Non-buttons require keyboard controls
    if (!btnObj.isButton) {
      btnObj.addEventListener("keydown", _keydown_btn, false);
    }
    btnObj.addEventListener("click", _embedVideo, false);
  };


  var _initButton = function (btnObj) {

    btnObj.setAttribute("aria-controls", btnObj.stageId);

    // Non-buttons require keyboard controls
    if (!btnObj.isButton) {
      btnObj.setAttribute("aria-role", "button");
      btnObj.tabIndex = 0;
    }
    return btnObj;
  };


  var _addBtnImage = function (btnObj) {
    if (!btnObj.isTextOnly) {
    var img = d.createElement("img");
    img.className = btnClass + "_img";
    img.src = btnObj.imageSrc;
    img.alt = btnObj.alt || btnObj.textContent;
    btnObj.innerHTML = "";
    btnObj.appendChild(img);
    return img;
    }
  };


  var _convertImgToButton = function (imgObj) {
    // For the rare time an image is used as a button.
    var btn = d.createElement("button");
    var str = "data-" + videoName;

    btn.className = btnClass;
    btn.setAttribute(str, imgObj.getAttribute(str));
    btn.videoSrc = imgObj.getAttribute(str);
    btn.textContent = imgObj.alt;
    btn.setAttribute(str + "_img", imgObj.getAttribute(str + "_img"));
    btn.imageSrc = imgObj.getAttribute(str + "_img");
    btn.setAttribute(str + "_stage", imgObj.getAttribute(str + "_stage"));
    btn.stageId = imgObj.getAttribute(str + "_stage");
    imgObj.parentElement.replaceChild(btn, imgObj);

    return btn;
  };


  var configuration = function (cfg) {
    videoName = cfg.videoName || videoName;
    btnClass = cfg.btnClass || btnClass;
  };


  var _getFirstBtn = function (stageId) {
    var str = "." + btnClass;
    var str = "[class^=\"" + btnClass + "\"]";
    str += "[data-" + videoName + "_stage=\""  + stageId + "\"]";
    str += "[data-" + videoName + "_img]";
    str += "[data-" + videoName + "]";

    var btns = d.querySelectorAll(str);
    var btn = false;
    for (var i=0; i < btns.length; i++) {
      //if (btns[i].videoSrc !== "" && btns[i].imageSrc !== "") {
      if (btns[i].videoSrc !== "" && btns[i].imageSrc !== "") {
        btn = btns[i];
        break;
      }
    }
    return btn;
  };


  var _populateStages = function () {
    // run through each stages[] populate with first btn
    var firstBtn;
    var stageObj;
    var i = stages.length;
    while (i--) {
      stageObj = d.getElementById(stages[i]);
      firstBtn = _getFirstBtn(stageObj.id);
      if (firstBtn) {
        firstBtn = _setStage(firstBtn, stageObj);
        _addButtonEvents(firstBtn);
      }
    }
  };


  var initialise = function (cfg) {

    configuration(cfg);

    var btnObj;
    var firstBtn;
    var stageObj;
    var videoBtns = d.getElementsByClassName(btnClass);

    // Go back to queryselectorall to get partial class name for btn-video-textOnly???
    var videoBtns = d.querySelectorAll("[class^=\"" + btnClass + "\"]");
    var i = videoBtns.length;

    if (videoBtns) {

      while (i--) {

        btnObj = _btnAttachProperties(videoBtns[i]);
        if (btnObj) {

          // Ignore img btns for now !!!
          if (btnObj.isImage) {
            btnObj = _convertImgToButton(btnObj);
          }
          _addBtnImage(btnObj);
          _initButton(btnObj);
          _addButtonEvents(btnObj);

          if (stages.indexOf(btnObj.stageId) === -1) {
            stages.push(btnObj.stageId);
          }
        }
      }

      // run through each stages[] populate with first btn
      _populateStages();

      window.addEventListener("resize", debounce(_resizeTheatre, 250, false));
    }
  };

  initialise({
    videoName : "video",  // class name of video, the data attribute and also the base name for all classes used (except SVGs).
    btnClass : "btn-video" // Any object with this class will launch a video if data attributes are correctly set
  });

}(window, document, debounce));
