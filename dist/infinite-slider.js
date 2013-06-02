/*! Infinite Slider - v0.1.0 - 2013-06-02
* https://github.com/helielson/infinite-slider
* Copyright (c) 2013 Helielson; Licensed MIT */
;(function ( $, window, document, undefined ) {

    "use strict";

    var pluginName = "infiniteSlider",
        defaults = {
        itemsSelector: null,
        autoRotate: true,
        delay: 5 * 1000,
        dotsControls: true
    };

    function Plugin ( element, options ) {
        this.element = element;
        this.$element = $(element);
        this.elementWidth = this.$element.outerWidth();
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var itemsSelector = this.settings.itemsSelector;
            this.$items = itemsSelector ? $(this.element).find(itemsSelector) : $(this.element).children();

            this.setUpHTML();
            this.bindEvents();
        },
        /**
         * Creates the HTML and sets the style necessary for plugin work.
         */
        setUpHTML: function () {
            this.$element.css({
                "overflow": "hidden",
                "position": "relative"
            });
            this.$items.css({
                "width": this.$items.width(),
                "float": "left"
            });

            var itemsLength = this.$items.length;
            this.sliderWrapperWidth = this.elementWidth * itemsLength;

            this.$items.wrapAll($("<div/>", {
                "class": "all-items",
                "style": "width: " + this.elementWidth * itemsLength + "px"
            }));

            if (this.settings.dotsControls) {
                this.$element.append(this.getDotsControls(itemsLength));
            }
        },

        /**
         * Returns the html of the controls
         */
        getDotsControls: function(size) {
            var dotsHTML = "";
            var isActive = true;
            for (var idx=0; idx < size; idx++) {
                dotsHTML += this._buildHTMLControlItem(idx, isActive);
                isActive = false;
            }
            return "<div class=\"controls\">" + dotsHTML + "</div>";
        },

        _buildHTMLControlItem: function(idx, isActive) {
            return "<div class=\"control-item" + (isActive ? " active" : "") + "\" data-idx=\"" + idx +"\"></div>";
        },

        /**
         * Adds the binds and behavious for the slider
         */
        bindEvents: function() {
            if (this.$items.length > 1) {

                // FAZER ISSO ANTES DO ANIMATE "BACK"
                // this.$items.eq(0).before(this.$items.eq(-1));
                // var $allItems = $('.all-items').css('margin-left', - this.elementWidth);

                var $allItems = $('.all-items');
                var _this = this;
                $('.controls div').on('click', function() {
                    var idx = parseInt($(this).data('idx'), 10),
                        left = idx * _this.elementWidth;
                        $('.controls div').removeClass('active').eq(idx).addClass("active");

                    $allItems.stop().animate({
                        'margin-left' : -left
                  }, 1000);
                });

                // var $sliderWrapper = $('.slide-images'),
                //     SLIDER_WIDTH = parseInt($sliderWrapper.width()),
                //     SLIDE_MASK_WIDTH = 940;

                // $('.prev, .next', '.slider .controls').on('click', function() {
                //     var direction = this.className,
                //         marginLeft = parseInt($sliderWrapper.css('margin-left')) || 0;

                //     if (direction == 'next') {
                //         // Ensures that there's a next image by putting the first image after the last
                //         $('.slide-images a:last').after($('.slide-images a:first'));

                //         $sliderWrapper.css('margin-left', 0).stop().animate({
                //             'margin-left' : SLIDE_MASK_WIDTH * (-1)
                //         });
                //     }
                //     else {
                //       // The 'setup' of this function ensures that always there's a previous image.
                //       // So, we can do the animation.
                //       $sliderWrapper.stop().animate({
                //           'margin-left' : 0
                //       }, 500, function() {
                //           $('.slide-images a:first').before($('.slide-images a:last'));
                //           $sliderWrapper.css('margin-left', SLIDE_MASK_WIDTH * (-1) + 'px');
                //       });
                //     }
                //     return false;
                // });

                // // The infinite loop to rotate images
                // NAMESPACE.rotate = function() {
                //     $('.next', '.slider .controls').click();
                // }
                // NAMESPACE.run = setInterval('NAMESPACE.rotate()', NAMESPACE.GLOBAL_SLIDE_TIMEOUT);

                // //if mouse hover, pause the auto rotation, otherwise rotate it
                // $('.slider .controls, .slider li').hover(
                //     function() {
                //         NAMESPACE.run && clearInterval(NAMESPACE.run);
                //     },
                //     function(e) {
                //         // Ensures that the mouse isn't hover any slider element
                //         if ($(e.relatedTarget).closest('.controls').length || $(e.relatedTarget).closest('.slide-mask').length)
                //             return;
                //         NAMESPACE.run = setInterval('NAMESPACE.rotate()', NAMESPACE.GLOBAL_SLIDE_TIMEOUT);
                //     }
                // );

            }
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
