import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '../../constants';
export class Header extends ExcelStateComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input'],
            subscribe: ['title']
        });
    }

    toHTML(state) {
        const title = this.store.getState().title || defaultTitle;
        return `<div class="excel__header">

        <input type="text" class="input" 
        data-type="input" value="${title}" />

        <div>

          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>

        </div>

      </div>`;
    }


    onInput(event) {
        if (event.target.dataset.type === 'input') {
            const $target = $(event.target);
            const value = $target.text();
            this.$dispatch(actions.changeHeader({value}));
        }
    }
}