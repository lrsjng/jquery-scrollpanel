const WIN = window; // eslint-disable-line no-undef
const JQ = WIN.jQuery;
let append_content = true;

const update = () => {
    const $panel = JQ('.no5');
    const $container = JQ('.no5 .sp-container');
    const length = $container.children().length;

    if (length <= 0) {
        append_content = true;
    } else if (length >= 10) {
        append_content = false;
    }

    if (append_content) {
        $container.prepend(`<div class="foo">${length}</div>`);
    } else {
        $container.children().eq(0).remove();
    }

    $panel.scrollpanel('update');
};

const init = () => {
    JQ('.scrollpanel').each((idx, el) => {
        for (let i = 0; i < 10; i += 1) {
            JQ(el).prepend(`<div class="foo">${i}</div>`);
        }
    }).scrollpanel();

    WIN.setInterval(update, 1000);
};

JQ(init);
