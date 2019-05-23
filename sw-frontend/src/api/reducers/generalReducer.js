import StoreDefinitions from 'api/store/storeDefinitions';
import defaultValues from 'api/store/defaults';

export default function generalReducer(state = {
    ...defaultValues.general,
}, action) {
    switch (action.type) {
        case StoreDefinitions.GENERAL.SetStatusBarForeground:
            state = {
                ...state,
                statusBar: {
                    ...state.statusBar,
                    statusBarForeground: action.payload
                }
            }
            break;
    default:
        state = {
            ...state,
        }
    }

    return { ...state };
}