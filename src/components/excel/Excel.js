import {$} from '@core/dom';
import Emitter from '@core/Emitter';
import {StoreSub} from '@core/StoreSub';
import * as actions from '@/redux/actions';
export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.emitter = new Emitter;
        this.store = options.store;
        this.subscriber = new StoreSub(this.store);
    }

    getRoot() {
        // Создаём обертку с классом excel
        const $root = $.create('div', 'excel');
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        };
        // перебираем переданные в Excel классы и создаем для каждого класса
        // элемент
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    init() {
        this.store.dispatch(actions.lastDate());
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        // this.components.forEach(component => component.destroy());
    }
}