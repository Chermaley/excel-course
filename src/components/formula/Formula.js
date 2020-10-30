import {ExcelComponents} from '@core/ExcelComponents';

export class Formula extends ExcelComponents {
    static className = 'excel__formula'
    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>`;
    }
}