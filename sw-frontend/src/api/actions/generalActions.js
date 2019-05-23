import StoreDefinitions from 'api/store/storeDefinitions';

export function generalActions(dispatch) {
    return {
        setStatusBarForeground: (color) => {
            dispatch({
                type: StoreDefinitions.GENERAL.SetStatusBarForeground,
                payload: color
            })
        },
        // showModal: (component, onCloseRequested, animationType = 'slide') => {
        //     dispatch({
        //         type: StoreDefinitions.Modal.SetComponent, payload: {
        //             component,
        //             animationType
        //         }
        //     })
        //     dispatch({
        //         type: StoreDefinitions.Modal.SetVisibility, payload: {
        //             visible: true,
        //             onCloseRequested
        //         }
        //     })
        // },
        // hideModal: () => {
        //     dispatch({
        //         type: StoreDefinitions.Modal.SetVisibility, payload: {
        //             visible: false
        //         }
        //     })
        // },
    }
}