import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name;
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.prepare();
        this.unsubscribers = [];
        this.store = options.store;
    }
    // настраиваем наш компонент до init
    prepare() {}
    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }
    // Добавляем DOM слушатели
    init() {
        this.initDOMListeners();
    }
    // удаляем компонент, чистим функции
    destroy() {
        this.unsubscribers.forEach(unsub => unsub());
        this.removeDOMListeners();
    }
    // уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }
    // Сюда приходят  только изменения по тем полям, на которые мы подписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key);
    }
}