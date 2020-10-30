import {ExcelComponents} from '@core/ExcelComponents';

export class Header extends ExcelComponents {
    static className = 'excel__header'
    toHTML() {
        return `<div class="excel__header">

        <input type="text" class="input" value="Новая таблица" />

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
}