import { generalActions } from './generalActions';
import { userActions } from './userActions';
import  { tripActions } from './tripActions';
export {
    userActions,
    generalActions, 
    tripActions,
}

export function mapDispatchToProps(dispatch, actions) {
    let result = {}; //generalActions(dispatch);
    if (actions instanceof Array) {
        actions.forEach(element => {
            result = {
                ...result,
                ...element(dispatch)
            }
        });
    }
    return result;
}