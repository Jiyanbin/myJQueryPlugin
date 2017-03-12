// pictureEnlargement.js
// Jiyanbin 2016

$(function ($) {

  $.fn.pictureEnlargement = function (attributes) {

    var $element = this;

    if (!$element.is("img")) {
      console.log("错误");
      return;
    }
    var $IMAGE_URL    = $element.attr("src");
    var $IMAGE_WIDTH  = $element.width();
    var $IMAGE_HEIGHT = $element.height();
    var NATIVE_IMG    = new Image();
    NATIVE_IMG.src    = $element.attr("src");

    var defaults = {
      round      : true,
      width      : 200,
      height     : 200,
      background : "#FFF",
      shadow     : "0 8px 17px 0 rgba(0, 0, 0, 0.2)",
      border     : "6px solid #FFF",
      cursor     : true,
      zIndex     : 999999
    }

    var $options = $.extend(defaults, attributes);

    // Modify target image
    $element.on('dragstart', function (e) { e.preventDefault(); });
    $element.css("cursor", $options.cursor ? "crosshair" : "none");

    var lens = document.createElement("div");
    lens.id = "BlowupLens";

    $("body").append(lens);

    $blowupLens = $("#BlowupLens");

    $blowupLens.css({
      "position"          : "absolute",
      "visibility"        : "hidden",
      "pointer-events"    : "none",
      "zIndex"            : $options.zIndex,
      "width"             : $options.width,
      "height"            : $options.height,
      "border"            : $options.border,
      "background"        : $options.background,
      "border-radius"     : $options.round ? "50%" : "none",
      "box-shadow"        : $options.shadow,
      "background-repeat" : "no-repeat",
    });

    $element.mouseenter(function () {
      $blowupLens.css("visibility", "visible");
    })

    $element.mousemove(function (e) {

      var lensX = e.pageX - $options.width / 2;
      var lensY = e.pageY - $options.height / 2;

      var relX = e.pageX - this.offsetLeft;
      var relY = e.pageY - this.offsetTop;
     
      var zoomX = -Math.floor(relX / $element.width() * NATIVE_IMG.width - $options.width / 2);
      var zoomY = -Math.floor(relY / $element.height() * NATIVE_IMG.height - $options.height / 2);

      $blowupLens.css({
        left                  : lensX,
        top                   : lensY,
        "background-image"    : "url(" + $IMAGE_URL + ")",
        "background-position" : zoomX + " " + zoomY
      });

    })

    $element.mouseleave(function () {
      $blowupLens.css("visibility", "hidden");
    })

  }
})
