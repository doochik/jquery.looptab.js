(function(/**jQuery*/$) {
    /**
     * jQuery plugin to capture tab key navigation inside given element.
     * Plugin cycles tabulation inside the given element (usually a modal popup),
     * Acts the following way: tab key moves cursor inside element -> browser toolbar(-s) -> inside element.
     * 
     * @see https://github.com/doochik/jquery.looptab.js
     * @author Alexey Androsov <doochik@ya.ru>
     * @licence GPLv3/MIT
     * @version 0.1
     */

    /**
     * Captures tab key navigation inside given element.
     * @description Sets tabindex to -1 for all active elements outside the given element.
     */
    $.fn.captureTab = function() {
        var capture = [];
        var self = this;
        $('a, [tabindex]').each(function() {
            for (var i = 0, l = self.length; i < l; i++ ) {
                if (!$.contains(self[i], this)) {
                    capture.push({
                        el: this,
                        tabindex: this.getAttribute('tabindex')
                    });
                    this.setAttribute('tabindex', -1);
                }
            }
        });
        this.data('looptab-capture', capture);
    };

   /**
     * Releases tab key navigation.
     * @description According to saved values from $.captureTab restores tabindex to active elements on the page.
     */
    $.fn.releaseTab = function() {
        var capture = this.data('looptab-capture');
        if ($.isArray(capture)) {
            for (var i = 0, j = capture.length; i < j; i++) {
                var info = capture[i];
                if (info.tabindex === null) {
                    info.el.removeAttribute('tabindex');
                } else {
                    info.el.setAttribute('tabindex', info.tabindex);
                }
            }
        }
        this.removeData('looptab-capture');
    };

})(jQuery);