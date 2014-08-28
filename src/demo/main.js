(function() {
'use strict';

var $ = jQuery;
var appendContent = true;

function generateContent() {

    $('.scrollpanel').each(function () {

        for (var i = 0; i < 10; i += 1) {
            $(this).prepend('<div class="foo">' + i + '</div>');
        }
    });
}

function updateContent() {

    var $panel = $('.no5');
    var $panelContent = $('.no5 > .sp-viewport > .sp-container');
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
    $('.scrollpanel').scrollpanel();

    setInterval(updateContent, 1000);
}

$(init);

}());
