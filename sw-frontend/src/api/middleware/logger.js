
/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching_____', action)
    let result = next(action)
    console.log('next state_____', store.getState())
    console.groupEnd()

    return result
}

export default logger;