/*
 * infinite-slider
 * https://github.com/helielson/infinite-slider
 *
 * Copyright (c) 2013 Helielson
 * Licensed under the MIT license.
 */

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

                var $allItems = $('.all-items', this.$element);
                var _this = this;
                $('.controls div', this.$element).on('click', function() {
                    var idx = parseInt($(this).data('idx'), 10),
                        left = idx * _this.elementWidth;
                        $('.controls div', _this.$element).removeClass('active').eq(idx).addClass("active");

                    $allItems.stop().animate({
                        'margin-left' : -left
                  }, 1000);
                });

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
