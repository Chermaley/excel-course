import {$} from '@core/dom';
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        // Создаём обертку с классом excel
        const $root = $.create('div', 'excel');
        // перебираем переданные в Excel классы и создаем для каждого класса
        // элемент
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
    }
}