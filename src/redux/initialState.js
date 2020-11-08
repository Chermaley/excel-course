import {defaultStyles, defaultTitle} from '../constants';
const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    stylesState: {},
    currentText: '',
    dataState: {},
    lastDate: new Date().toJSON(),
    currentStyles: defaultStyles
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState;
}