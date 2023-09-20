import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import Navbar from './layout/navbar/Navbar';
import SpecificShipment from './components/specificShipment/SpecificShipment';
import ShipmentDetails from './components/shipmentDetails/ShipmentDetails';
import LoadingScreen from './layout/loadingScreen/LoadingScreen';
import "@fontsource/cairo";
import "@fontsource/cairo/400.css";
import './App.css';

function mapStateToProps(state) {
  return {
    getLoadingScreen: state.getLoadingScreen
  }
}

function App({ getLoadingScreen }) {
  const { i18n: { language } } = useTranslation();
  return (
    <React.StrictMode>
      <div className="App" dir={language === "ar" ? "rtl" : "ltr"}>
        <Navbar />
        {getLoadingScreen ?
          <LoadingScreen /> :
          <>
            <SpecificShipment />
            <ShipmentDetails />
          </>
        }
      </div>
    </React.StrictMode>
  );
}

export default connect(mapStateToProps)(App);
