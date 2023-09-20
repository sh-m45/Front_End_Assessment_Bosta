import { GET_SHIPMENT_DATA } from '../actionTypes/ActionTypes'

export default (state = [], action) => {
    let newState;
    switch (action.type) {
        case GET_SHIPMENT_DATA:
            newState = action.payload ;
            // localStorage.setItem('shipmentDetails',JSON.stringify(newState));
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}
