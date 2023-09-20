import axios from "axios";
import { GET_SHIPMENT_DATA, IS_LOADING } from "../actionTypes/ActionTypes";
export const getShipmentDetails = (shipmentNum) => async dispatch => {
    dispatch({ type: IS_LOADING, payload: true });

    // 3- Call the API and handle the response in a similar UI to the one attached here.
    await axios.get(`https://tracking.bosta.co/shipments/track/${shipmentNum}`).then((respone) => {
        const shipmentDetails = respone.data;
        if (respone.status === 200) dispatch({ type: GET_SHIPMENT_DATA, payload: shipmentDetails });
        dispatch({ type: IS_LOADING, payload: false });
        return;
    }).catch((error) => { console.log("error => ", error) });
}