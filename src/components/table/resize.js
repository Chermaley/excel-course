import {$} from '@core/dom';
export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const cords = $parent.getCords();
        const index = $parent.data.col;
        const attributeName = $resizer.$el.getAttribute('data-resize');
        let value;
        const type = $resizer.data.resize;
        const sideProp = attributeName === 'col' ? 'bottom' : 'right';
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        });

        document.onmousemove = e => {
            if (attributeName === 'col') {
                const delta = e.pageX - cords.right;
                value = cords.width + delta;
                $resizer.css({right: -delta + 'px'});
            } else {
                const delta = e.pageY - cords.bottom;
                value = cords.height + delta;
                $resizer.css({bottom: -delta + 'px'});
            }
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0,
            });
            if (attributeName === 'col') {
                $parent.css({width: value + 'px'});
                $root.findAll(`[data-col="${index}"]`).forEach(el => {
                    $(el).css({width: value + 'px'});
                });
            } else {
                $parent.css({height: value + 'px'});
            }
            resolve({
                value,
                type,
                id: $parent.data[type]
            });
        };
    });
}

