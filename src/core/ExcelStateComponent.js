import {ExcelComponents} from '@core/ExcelComponents';

export class ExcelStateComponent extends ExcelComponents {
    constructor(...args) {
        super(...args);
    }

    get template() {
        return JSON.stringify(this.state, null, 2);
    }

    initState(state) {
        this.state = {...state};
    }
    setState(newState) {
        this.state = {...this.state, ...newState};
        this.$root.html(this.template);
    }
}