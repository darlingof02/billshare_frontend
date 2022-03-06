import axios from "axios";

import { IonButton, IonButtons, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonNote, IonPage, IonRouterOutlet, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, add, calendar } from 'ionicons/icons';

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../api/constant";
import MenuComponent from "../components/MenuComponent";
import { textAlignCenter } from "./CreateBillPage";
import { DueChipComponent } from "../components/DueChipComponent";

interface OwnedBillInfo {
    bid: number,
    status: number,
    due: string|null,
    amount: number,
    ownerEmail: String,
    paidAmount: number,
    totalAmount: number,
    debtorNum: number,
    debtorPaidNum: number,
}

interface InDebtInfo {
    bid: number,
    oname: number,
    status: number,
    due: string|null,
    amount: number,
}

const HomePage: React.FC = (props:any) => {

    const [billList, setBillList] = useState<OwnedBillInfo[]>([])
    const [debtList, setDebtList] = useState<InDebtInfo[]>([])

    const fetchData = () => {
        axios({
            url: API_URL+"/owned_bills",
            method: "get",
            headers: {
            'Content-Type': 'application/json',
            },
        }).then((response) => {
                console.log(response);
                setBillList(response.data) 

        }).catch((e)=>console.log(e));

      axios({
        url: API_URL+"/unarchived_debts",
        method: "get",
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
            console.log("debts: ",response); 
            setDebtList(response.data) 
      }).catch((e)=>console.log(e));
    }


    useEffect(() => {
        fetchData()
        const interval = setInterval(() =>{       
            fetchData();
        }, 2000)
        return ()=>clearInterval(interval); 
    },[])

    // console.log("rendered")
    const history = useHistory()

    const [selected, setSelected] = useState<string>('bill')


    const showBill = () => {
        setSelected("bill")
    }

    const showDebt = () => {
        setSelected("indebt")
    }
    return (        
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
                    {selected == "bill" ? billList.map((billInfo) =>  (

                        <IonItemSliding key={billInfo.bid}>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => console.log('Delete')}>Delete</IonItemOption>
                            </IonItemOptions>
                            <IonItem key={billInfo.bid} routerLink={`/bills/${billInfo.bid}`}>
                                <IonLabel >Amount: {billInfo.amount}</IonLabel>
                                <p style={textAlignCenter}>{billInfo.debtorPaidNum}</p>
                                <IonNote slot="end">
                                    <DueChipComponent due={billInfo.due}/>
                                </IonNote>
                                
                            </IonItem>
                        </IonItemSliding>
                    )): debtList.map((inDebtInfo:InDebtInfo) =>  (

                        <IonItemSliding key={inDebtInfo.bid}>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => console.log('Delete')}>Delete</IonItemOption>
                            </IonItemOptions>
                            <IonItem key={inDebtInfo.bid} routerLink={`/debts/${inDebtInfo.bid}`}>
                                <IonLabel >Owe ${inDebtInfo.amount} to {inDebtInfo.oname}</IonLabel>
                                <IonNote slot="end">
                                    <DueChipComponent due={inDebtInfo.due}/>
                                </IonNote>
                                
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
                <IonFabButton color="danger" onClick={e=>{history.push('./test');}}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

 
        </IonPage>
    )
}

export default HomePage