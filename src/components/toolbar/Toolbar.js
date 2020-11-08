import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolBar} from './toolbar.template';
import {$} from '@core/dom';
import {defaultStyles} from '../../constants';
export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles);
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles);
        console.log(changes);
    }

    get template() {
        return createToolBar(this.state);
    }

    toHTML() {
        return this.template;
    }
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            this.$emit('toolbar: applyStyle', value);
        }
    }
}