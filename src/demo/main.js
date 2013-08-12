
(function($) {
	'use strict';

	var generateContent = function () {

			$('.scrollpanel').each(function () {

				var $this = $(this);

				for (var i = 0; i < 10; i += 1) {
					$this.prepend('<div class="foo">' + i + '</div>');
				}
			});
		},

		appendContent = true,
		updateContent = function () {

			var $panel = $('.no5'),
				$panelContent = $('.no5 > .sp-viewport > .sp-container'),
				length = $panelContent.children().length;

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
		},

		init = function () {

			generateContent();
			$('.scrollpanel').scrollpanel();

			setInterval(updateContent, 1000);
		};

	$(init);

}(jQuery));
