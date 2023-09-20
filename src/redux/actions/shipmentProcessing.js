import axios from "axios";
import { GET_SHIPMENT_DATA, IS_LOADING } from "../actionTypes/ActionTypes";
export const getShipmentDetails = (shipmentNum) => async dispatch => {
    // console.log("shipmentNum :", shipmentNum)
    dispatch({ type: IS_LOADING, payload: true });
    await axios.get(`https://tracking.bosta.co/shipments/track/${shipmentNum}`).then((respone) => {
        const shipmentDetails = respone.data;
        console.log("shipmentDetails :", shipmentDetails)
        if (respone.status === 200) dispatch({ type: GET_SHIPMENT_DATA, payload: shipmentDetails });
        dispatch({ type: IS_LOADING, payload: false });
        return;
    }).catch((error) => { console.log("error => ", error) });
}