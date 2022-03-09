import axios from "axios";

import { IonButtons, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonNote, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../api/constant";
import MenuComponent from "../components/MenuComponent";
import { textAlignCenter } from "./CreateBillPage";
import { DueChipComponent } from "../components/DueChipComponent";
import UserSevice from "../api/UserService"

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
let interval:any = null

export interface UserInfo {
    firstName: string,
    lastName: string,
    nickName: string,
    email: string,
    tel: number,
    avatar: string|null,
    uid: number,
}

const HomePage: React.FC = (props:any) => {

    const [billList, setBillList] = useState<OwnedBillInfo[]>([])
    const [debtList, setDebtList] = useState<InDebtInfo[]>([])
    const [userInfo, setUserInfo] = useState<UserInfo>()

    const history = useHistory()
    const [selected, setSelected] = useState<string>('bill')
    

    const fetchBills = () => {
        axios({
            url: API_URL+"/owned_bills",
            method: "get",
            headers: {
            'Content-Type': 'application/json',
            },
        }).then((response) => {
                // console.log(response);
                setBillList(response.data) 

        }).catch((e)=>console.log(e));
    }
    const fetchDebts = () => {
        axios({
            url: API_URL+"/unarchived_debts",
            method: "get",
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
                setDebtList(response.data) 
          }).catch((e)=>console.log(e));
    }


    const restartInterval = (func:Function) => {
        func()
        clearInterval(interval)
        interval = setInterval(() =>{  
            if(history.location.pathname ==="/home") {
                func()
            }
        }, 2000)
    }

    // const handleDebtUpdate = (e:any) => {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     const bid = e.target.getAttribute("debtor-id")
    //     const status = e.target.getAttribute("debtor-status")

    //     console.log(bid)
    //     console.log(debtList)
    //     axios({
    //         url: API_URL + `/debts/${bid}`,
    //         method: "PUT",
    //         data: {status:Number(status)}
    //     }).then(showDebt).catch(showDebt)
    // }



    useEffect(() => {

        fetchBills()
        fetchDebts()
        restartInterval(fetchBills)
        console.log("页面挂载",interval)
        

        UserSevice.getUserBasicInfo()
        .then((response) => {
            console.log(response.data);
            setUserInfo(response.data);
          }).catch((e) => {
              console.log(e)
          })

        return ()=>{console.log("页面卸载",interval);clearInterval(interval)}; 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const showBill = () => {
        setSelected("bill")
        restartInterval(fetchBills)
    }

    const showDebt = () => {
        setSelected("indebt")
        restartInterval(fetchDebts)
    }
    return (        
        <IonPage id="homepage">

            <MenuComponent userInfo={userInfo}/>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>HomePage</IonTitle>
            </IonToolbar>

            <IonSegment value={selected}>
                <IonSegmentButton value="bill" onClick={showBill}><IonLabel>bill</IonLabel></IonSegmentButton>
                <IonSegmentButton value="indebt" onClick={showDebt}><IonLabel>indebt</IonLabel></IonSegmentButton>
            </IonSegment>


            <IonContent>
                <IonList> 
                    {selected === "bill" ? billList.map((billInfo) =>  (

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
                            <IonItem key={inDebtInfo.bid} routerLink={`/debts/${inDebtInfo.bid}/${inDebtInfo.status}`} >
                                <IonLabel >Owe ${inDebtInfo.amount} to {inDebtInfo.oname}</IonLabel>
                                <IonNote slot="end">
                                    <DueChipComponent due={inDebtInfo.due}/>
                                </IonNote>
                                {/* <IonButton debtor-id = {inDebtInfo.bid} debtor-status={inDebtInfo.status} 
                                 slot="end" onClick={(e)=>handleDebtUpdate(e)}>Update info</IonButton> */}
                                 {/* <DebtorUpdateStatusButton status={inDebtInfo.status} bid={inDebtInfo.bid}/> */}
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>


            <IonFab vertical="center" horizontal="start" slot="fixed">
                <IonFabButton onClick={e=>history.push("./create_bill")}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            {/* <IonFab vertical="bottom" horizontal="start" slot="fixed">
                <IonFabButton color="danger" onClick={e=>{history.push('./test');}}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab> */}

 
        </IonPage>
    )
}

export default HomePage