/* ========================================================================
 * Bootstrap: carousel.js v3.0.2
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    /*this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this)) */

    this.getActiveIndex();

    this.init();

  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
  }

  Carousel.prototype.init = function() {
    this.$items.not(this.$active).css('top', '100%');
  }

  Carousel.prototype.cycle =  function (e) {
    console.log('shall cycle');
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children().removeClass('no-transition');


    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {

    var activeIndex = this.getActiveIndex()

    // wenn quatsch aufgerufen wird
    if (pos > (this.$items.length - 1) || pos < 0) return;

    // wenn das gleiche item...
    if( activeIndex === parseInt(pos) ) {
      console.log('bin der gleiche');
      return;
    }

    // return ums chainable zu halten,
    // wenn pos größer als der aktive index, dann nächste, also das item rechts davon, ansonsten das item links davon
    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))


  }

  Carousel.prototype.pause = function (e) {
    console.log('shall pause');
  }

  Carousel.prototype.next = function () {
    console.log('next');
  }

  Carousel.prototype.prev = function () {
     console.log('prev');
  }

  Carousel.prototype.slide = function (type, nextItem) {

    // aktiv nach links fahren
    if(type == 'next') {

      nextItem.css({
        'top': '0',
        'left': '100%'
      });

      nextItem.one('webkitTransitionEnd', $.proxy(this.activateItem,this));

      // animate
      nextItem.css({
        '-webkit-transform': 'translate(-100%,0)'
      });

      this.$active.css({
        '-webkit-transform': 'translate(-100%,0)',
      }).removeClass('active');

    }else if(type == 'prev') {

      nextItem.css({
        'top': '0',
        'left': '-100%'
      });

      nextItem.one('webkitTransitionEnd', $.proxy(this.activateItem,this));

      nextItem.css({
        '-webkit-transform': 'translate(100%,0)'
      });

      this.$active.css({
        '-webkit-transform': 'translate(100%,0)',
      }).removeClass('active');

    }


  }

  Carousel.prototype.activateItem = function(evt) {

    var $item = $(evt.target).addClass('active');

    this.$active.add($item).addClass('no-transition'),

    this.$active.css({
      'left': '0',
      'top': '100%',
      '-webkit-transform': 'translate(0,0)'
    });

    $item.css({
      'left': '0',
      '-webkit-transform': 'translate(0,0)'
    });

  };


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {

    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false


    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);