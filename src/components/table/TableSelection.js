export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = [];
        this.current = null;
    }
    select($el) {
        this.clear();
        this.group.push($el);
        this.current = $el;
        $el.focus().addClass(TableSelection.className);
    }
    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className);
        });
        this.group = [];
    }

    get selectedIds() {
        return this.group.map($el => $el.id());
    }

    selectGroup($cols) {
        this.clear();
        $cols.forEach($el => {
            this.group.push($el);
            $el.addClass(TableSelection.className);
        });
    }
    applyStyle(style) {
        this.group.forEach($el => {
            $el.css(style);
        });
    }
}