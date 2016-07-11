/**
 * Dynamic responsive modals
 *
 * @file mdmodal.js
 * @author Tommy Eliassen (tommy@minddesign.no)
 * @version 0.0
 * @dependencies jQuery
 */
 
(function ($) {
    var modals = [];
    var overlay = null;
    var getCurrent = function () {
        return modals.length ? modals[modals.length - 1] : null;
    };

    /**
     * The modal object
     *
     * @param el
     * @param options
     */
    $.mdmodal = function (el, options) {
        this.$body = $('body');
        this.options = $.extend({}, $.mdmodal.defaults, options);
        this.modalDiv = this.build(el);

        modals.push(this); // Add this to modals array

        this.show(); // Append modal to body
    };

    $.mdmodal.close = function () {
        var current = getCurrent();
        current.close();
        modals.pop();

        current.modalDiv.remove();

        if (modals.length == 0) {
            $(overlay).removeClass('show').remove();
            overlay = null;
        }
    };

    $.mdmodal.defaults = {
        title: null,
        closeText: 'Close',
        showNavBar: false,
        showCloseButton: true
    };

    $.fn.mdmodal = function(options){
        var self = this;
        if (self !== null && typeof self === 'object') {
            new $.mdmodal(this, options);
        }
        return this;
    };

    $.mdmodal.prototype = {
        constructor: $.mdmodal,

        build: function (el) {
            var modalDiv = $('<div/>').addClass('mdmodal');

            $('<div/>').addClass('mdmodal-content').html(el).appendTo(modalDiv);

            if (this.options.showNavBar) {
                modalDiv.addClass('has-navbar');

                var navBar = $('<div class="mdmodal-navbar"></div>').prependTo(modalDiv);

                /* Add this when z-index solved for back button
                if (this.options.title !== null) {
                    $('<div/>').addClass('modal-title').html(this.options.title).appendTo(navBar);
                }*/

                var btn = $('<div class="btn"></div>')
                    .html('<i class="fa fa-chevron-left"></i> ' + this.options.closeText)
                    .on('click', function () {
                        $.mdmodal.close();
                    })
                    .appendTo(navBar);
            }

            if (this.options.showCloseButton) {
                var closeButton = $('<span class="mdmodal-close">' + this.options.closeText + '</span>')
                    .on('click', function () {
                        $.mdmodal.close();
                    })
                    .appendTo(modalDiv);
            }

            return modalDiv;
        },

        overlay: function () {
            overlay = $('<div class="mdoverlay"></div>').on('click', function () {
                $.mdmodal.close();
            }).appendTo(this.$body);
        },

        close: function () {

        },

        show: function () {
            // First show overlay
            if (overlay === null) this.overlay();

            // Show modal
            this.modalDiv.appendTo(this.$body);
            this.modalDiv.css({
                'z-index': 2000 + modals.length,
                'margin-top': (-1 * (this.modalDiv.outerHeight() / 2)),
            });
        }
    };


})(jQuery);