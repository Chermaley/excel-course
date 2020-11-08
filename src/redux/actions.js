import {CHANGE_TEXT,
    CHANGE_STYLES,
    TABLE_RESIZE,
    APPLY_STYLE,
    CHANGE_HEADER,
    LAST_DATE
} from './types';

// action creater
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}
export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    };
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
}

export function changeHeader(data) {
    return {
        type: CHANGE_HEADER,
        data
    };
}

export function lastDate() {
    return {
        type: LAST_DATE
    };
}