import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from './table.template';
import {resizeHandler} from './resize';
import {shouldResize} from './table.functions';
import {isCell} from './table.functions';
import {TableSelection} from './TableSelection';
import {matrix} from './table.functions';
import {nextSelector} from './table.functions';
import {$} from '@core/dom';
import {defaultStyles} from '../../constants';
import * as actions from '@/redux/actions';
import {parse} from '../../core/parse';
export class Table extends ExcelComponents {
    static className = 'excel__table'
    static rowCount = 50
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(Table.rowCount, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', text => {
            this.selection.current.attr('data-value', text);
            this.selection.current.text(parse(text));
            this.updateTextInStore(text);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
        this.$on('toolbar: applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:next', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize error', e);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $cell = $(event.target);
            if (!event.shiftKey) {
                this.selectCell($cell);
            } else {
                const $cells = matrix($cell, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            }
        }
    }
    onKeydown(event) {
        const keys = ['Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(
                key,
                Table.rowCount,
                id));
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        this.updateTextInStore( $(event.target).text());
    }
}


