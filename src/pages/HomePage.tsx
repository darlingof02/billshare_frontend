import axios from "axios";

import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, add, calendar } from 'ionicons/icons';

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../api/constant";
import MenuComponent from "../components/MenuComponent";

interface OwnedBillInfo {
    bid: number,
    status: number,
    due: String|null,
    amount: number,
    ownerEmail: String,
    paidAmount: number,
    totalAmount: number,
    debtorNum: number,
    debtorPaidNum: number,
}




const HomePage: React.FC = () => {


    const [billMap, setBillMap] = useState<Map<number,OwnedBillInfo>>(new Map())
    
    useEffect(() => {
        axios({
            url: API_URL+"/owned_bills",
            method: "get",
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEiLCJleHAiOjE2NDY4OTI0MTMsImlhdCI6MTY0NjI4NzYxM30.9sM_e7-BzSGPL_EgLxmfodptcT7rBDvNqIodlA4ohWtT0R__8ezzNnBmc_8vrnsRvGiFAPYs7b2rEOR5vp6UgQ"
            },
          }).then((response) => {
            response.data.forEach((ownedBillInfo: OwnedBillInfo)=>{
                billMap.set(ownedBillInfo.bid,ownedBillInfo)
            })
            setBillMap(new Map(billMap))
            console.log(billMap.get(91))
            // console.log(billMap.get(91)?.due?.getDate())

          }).catch((e)=>console.log(e))
    },[])

    

    console.log("rendered")
    const history = useHistory()

    const [selected, setSelected] = useState<string>('bill')
    const showBill = () => {
        setSelected("bill")
    }

    const showDebt = () => {
        setSelected("indebt")
        
    }
    return (
        <>
        
        <IonPage >

            <MenuComponent />
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>HomePageTest</IonTitle>
            </IonToolbar>

            <IonSegment value={selected}>
                <IonSegmentButton value="bill" onClick={showBill}><IonLabel>bill</IonLabel></IonSegmentButton>
                <IonSegmentButton value="indebt" onClick={showDebt}><IonLabel>indebt</IonLabel></IonSegmentButton>
            </IonSegment>


            <IonContent>
                
                <IonList>
                    {Array.from(billMap.values()).map((billInfo) => 
                    <IonItem key={billInfo.bid} lines="inset">
                        <IonLabel slot="start">Amount:</IonLabel>
                        <IonLabel slot="start">{billInfo.amount}</IonLabel>
                        <IonButton slot="end" color="success">{billInfo.due?.substring(0,10)}<IonIcon icon={calendar}></IonIcon></IonButton>
                    </IonItem>)}
                </IonList>
            </IonContent>
            <IonFab vertical="center" horizontal="start" slot="fixed">
                <IonFabButton onClick={e=>history.push('./create_bill')}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

 
        </IonPage>
        </>
    )
}

export default HomePage