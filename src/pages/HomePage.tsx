import axios from "axios";

import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
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
    const [debtMap, setDebtMap] = useState<Map<number,OwnedBillInfo>>(new Map())
    
    useEffect(() => {
        axios({
            url: API_URL+"/owned_bills",
            method: "get",
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
                console.log(response);
                response.data.forEach((ownedBillInfo: OwnedBillInfo)=>{
                    billMap.set(ownedBillInfo.bid,ownedBillInfo)
                })
                setBillMap(new Map(billMap))

          }).catch((e)=>console.log(e))
    },[])

    

    // console.log("rendered")
    const history = useHistory()

    const [selected, setSelected] = useState<string>('bill')


    const showBill = () => {

        // BillService.getBillsByEmail(localStorage.getItem('localEmail')).then(
        //     (response) => {
        //         console.log(response);
        //     }
        // )
        // request bills

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
                    {Array.from(billMap.values()).map((billInfo) =>  (

                        <IonItemSliding key={billInfo.bid} >
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => console.log('Delete')}>Delete</IonItemOption>
                            </IonItemOptions>
                            <IonItem key={billInfo.bid} routerLink={`/bills/${billInfo.bid}`}>

                                <IonLabel >Amount: {billInfo.amount}</IonLabel>
                                <IonLabel slot="end" color="success">{billInfo.due?.substring(0,10)}
                                <IonIcon icon={calendar}></IonIcon></IonLabel>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                    
                </IonList>
            </IonContent>


            <IonFab vertical="center" horizontal="start" slot="fixed">
                <IonFabButton onClick={e=>history.push('./create_bill')}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <IonFab vertical="bottom" horizontal="start" slot="fixed">
                <IonFabButton color="danger" onClick={e=>history.push('./test')}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

 
        </IonPage>
        </>
    )
}

export default HomePage