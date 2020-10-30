export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('No root prov for DOMListeener');
        }
        this.$root = $root;
    }
}