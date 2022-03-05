import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import {search,menu, ellipsisHorizontal, ellipsisVertical, add, calendar } from 'ionicons/icons';

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../api/constant";


// goal: finish the button to change status!
// put it into ../components/
type Props = {
    bid: number,
}

const ManangeBillButtonComponent = (props : Props) => {
    const handleUpgradeStatus = () => {
        console.log(props.bid)
        axios({
            url: API_URL + `/debt/${props.bid}`,
            method: "PUT",
            data: {"bid" : props.bid},
        })
    }
    return <IonPage><IonButton onClick={handleUpgradeStatus}>Update</IonButton></IonPage>
}

export default ManangeBillButtonComponent