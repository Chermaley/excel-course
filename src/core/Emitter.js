export default class Emitter {
    constructor() {
        this.listeners = {};
    }
    // Уведомляем слушателей если они есть
    // table.emit('table:select', {a:1})
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach(listener => {
                listener(...args);
            });
            return true;
        } else {
            return false;
        }
    }
    // Подписываемся на уведомления
    // Добавляем нового слушателя

    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] =
                this.listeners[event].fiter(listener => listener !== fn);
        };
    }
}

