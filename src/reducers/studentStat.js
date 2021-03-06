import * as stat from '../actions/studentStat';

export default function studentStatState(state = {}, action) {
    switch (action.type) {
        case stat.STAT_FETCH_REQUESTED || stat.STAT_CREATE_REQUESTED || stat.STAT_UPDATE_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case stat.STAT_FETCH_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                stat: action.stat
            };
        case stat.STAT_CREATE_SUCCEEDED || stat.STAT_UPDATE_SUCCEEDED || stat.STAT_REQUEST_FAILED:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };
        default:
            return state;
    }
}
