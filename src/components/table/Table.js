import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from './table.template';
import {resizeHandler} from './resize';
import {shouldResize} from './table.functions';
import {isCell} from './table.functions';
import {TableSelection} from './TableSelection';
import {matrix} from './table.functions';
import {nextSelector} from './table.functions';
import {$} from '@core/dom';
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
        return createTable(Table.rowCount);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:next', $cell);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $cell = $(event.target);
            if (!event.shiftKey) {
                this.selection.select($cell);
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
    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}


