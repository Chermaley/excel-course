import {$} from '@core/dom';
export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        // Создаём обертку с классом excel
        const $root = $.create('div', 'excel');
        $root.classList.add('excel');
        // перебираем переданные в Excel классы и создаем для каждого класса
        // элемент
        this.components.forEach(Component => {
            const $el = $.create('div', Component.className);
            $el.classList.add(Component.className);
            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            $root.append($el);
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}