import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '../../constants';
import {ActiveRoute} from '../../core/routes/ActiveRoute';
export class Header extends ExcelStateComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input', 'click'],
            subscribe: ['title']
        });
    }


    toHTML(state) {
        const title = this.store.getState().title || defaultTitle;
        return `<div class="excel__header">

        <input type="text" class="input" 
        data-type="input" value="${title}" />

        <div>

          <div class="button" data-value="delete">
            <i class="material-icons" data-value="delete">delete</i>
          </div>

          <div class="button" data-value="exit">
            <i class="material-icons" data-value="exit">exit_to_app</i>
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
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.value === 'exit') {
            ActiveRoute.navigate('');
        } else if ($target.data.value === 'delete') {
            const decision =
            confirm('Вы действительно хотите удалить таблицу?');
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param);
                ActiveRoute.navigate('');
            }
        }
    }
}