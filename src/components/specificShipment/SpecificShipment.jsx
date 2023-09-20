import React, { Fragment, useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { connect } from 'react-redux';
import style from './SpecificShipment.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { getTheme } from '../../utils';

const styles = {
    error: style.ResultItemDetailCancel,
    success: style.ResultItemDetailSuccess,
    warning: style.ResultItemDetailWarning
}

function mapStateToProps(state) {
    return {
        getShipmentDetailsData: state.getShipmentDetailsData
    }
}
function SpecificShipment(props) {
    let shipmentDetails = props.getShipmentDetailsData
    const { t, i18n } = useTranslation();

    let ShipmentDetailsData = props.getShipmentDetailsData
    const formatCurrentStateDate = new Date(ShipmentDetailsData?.CurrentStatus?.timestamp)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dotStyles = {
        error: {

            backgroundColor: "red"
        },
        success: {

            backgroundColor: "green"
        },
        warning: {
            backgroundColor: "rgb(251, 143, 11)"
        },
    }

    function getCurrenttheme(state) {
        if (state === "CANCELLED")
            return "error";
        else if (state === "DELIVERED")
            return "success";
        else if (state === "DELIVERED_TO_SENDER")
            return "warning";
    }

    function getCurrentStep(state) {
        if (state === "CANCELLED" || state === "DELIVERED_TO_SENDER")
            return 3;
        else if (state === "DELIVERED")
            return 4;
        else
            return 0;
    }

    const currentStep = getCurrentStep(shipmentDetails.CurrentStatus?.state)

    const currentTheme = getCurrenttheme(ShipmentDetailsData?.CurrentStatus?.state);

    return (
        <Fragment>
            <div className="d-flex w-100 justify-content-center">

                <div className={style.parentDetailsDiv}>
                    <div className='d-flex justify-content-around' >
                        <div className={style.itemDetail}>
                            <p className={style.TitleItemDetail}>{t('shipment Number')} {ShipmentDetailsData?.TrackingNumber}</p>
                            <p className={styles[getTheme(ShipmentDetailsData?.CurrentStatus?.state)]}>
                                {t(ShipmentDetailsData?.CurrentStatus?.state)}
                            </p>
                        </div>
                        <div className={style.itemDetail}>
                            <p className={style.TitleItemDetail}>{t('last Version')}</p>
                            <p className={style.ResultItemDetail}>
                                {ShipmentDetailsData?.TrackingNumber ?
                                    `${t(days[formatCurrentStateDate.getDay()])} ${formatCurrentStateDate.getFullYear()}/${formatCurrentStateDate.getMonth()}/${formatCurrentStateDate.getDay()} 
                                ${formatCurrentStateDate.getHours() == 12 || formatCurrentStateDate.getHours() == 0 ? 12 : formatCurrentStateDate.getHours() % 12}:${formatCurrentStateDate.getMinutes()}${formatCurrentStateDate.getHours() > 11 ? "PM" : "AM"}`
                                    : ""}

                            </p>
                        </div>
                        <div className={style.itemDetail}>
                            <p className={style.TitleItemDetail}>{t('Merchant name')}</p>
                            <p className={style.ResultItemDetail}>
                                {ShipmentDetailsData?.CurrentStatus?.state ? t('SOUQ.COM') : ""}

                            </p>
                        </div>
                        <div className={style.itemDetail}>
                            <p className={style.TitleItemDetail}>{t('Delivery time')}</p>
                            <p className={style.ResultItemDetail}>{ShipmentDetailsData?.nextWorkingDay?.[0]?.dayDate}</p>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <section className={style.parentSectionProgressBar}>
                            <div className={style.progressBar}>

                                <div className={style.progressLine} style={{ width: `${(currentStep - 1) * 33.33}%`, ...dotStyles[currentTheme] }}></div>
                                <div className={style.steps}>
                                    <div className={style.step} style={currentStep >= 1 ? dotStyles[currentTheme] : {}}><FontAwesomeIcon className={style.iconsStyle} icon={faCheck} /></div>
                                    <div className={style.step} style={currentStep >= 2 ? dotStyles[currentTheme] : {}}><FontAwesomeIcon className={style.iconsStyle} icon={faCheck} /></div>
                                    <div className={style.step} style={currentStep >= 3 ? dotStyles[currentTheme] : {}}><FontAwesomeIcon className={style.iconsStyle} icon={faTruck} /></div>
                                    <div className={style.step} style={currentStep >= 4 ? dotStyles[currentTheme] : {}}><FontAwesomeIcon className={style.iconsStyle} icon={faClipboardCheck} /></div>
                                </div>
                            </div>

                            <ol className={style.progressBarContent}>
                                <li>
                                    <div >{t('TICKET_CREATED')}</div>
                                </li>
                                <li >
                                    <div >{t('RECEIVED_FROM_SENTER')}</div>
                                </li>
                                <li >
                                    <div >{t('OUT_FOR_DELIVERY')}</div>
                                </li>
                                <li >
                                    <div >{t('DELIVERED')}</div>
                                </li>
                            </ol>

                        </section>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default connect(mapStateToProps)(SpecificShipment)
