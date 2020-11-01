import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No root prov for DOMListeener');
        }
        this.$root = $root;
        this.listeners = listeners;
    }
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented
                 in ${this.name || ''}`
                );
            }
            // Привязываем метод к его собственному контексту
            // чтобы можно было обращатся к элементам
            // если не использовать bind контекст потеряется
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        });
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventNAme) {
    return 'on' + capitalize(eventNAme);
}