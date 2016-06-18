(function () {
    'use strict';

    var win = window; // eslint-disable-line no-undef
    var jq = win.jQuery;
    var appendContent = true;

    function generateContent() {
        jq('.scrollpanel').each(function (idx, el) {
            for (var i = 0; i < 10; i += 1) {
                jq(el).prepend('<div class="foo">' + i + '</div>');
            }
        });
    }

    function updateContent() {
        var $panel = jq('.no5');
        var $panelContent = jq('.no5 > .sp-viewport > .sp-container');
        var length = $panelContent.children().length;

        if (length <= 0) {
            appendContent = true;
        } else if (length >= 10) {
            appendContent = false;
        }

        if (appendContent) {
            $panelContent.prepend('<div class="foo">' + length + '</div>');
        } else {
            $panelContent.children().eq(0).remove();
        }

        $panel.scrollpanel('update');
    }

    function init() {
        generateContent();
        jq('.scrollpanel').scrollpanel();

        win.setInterval(updateContent, 1000);
    }

    jq(init);
}());
