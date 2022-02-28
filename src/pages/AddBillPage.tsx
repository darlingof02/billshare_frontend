import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, play, removeCircle } from 'ionicons/icons';
import React, { useState } from "react";
import { useHistory } from "react-router";


interface Payer {
    email: string;
    amount: number;
    autoCalc: boolean
}


const AddBillPage: React.FC = () => {
    const history = useHistory()

    const simulate: Payer[] = [
        {email: 'yuninx1@uci.edu', amount: 0, autoCalc: true},
        {email: '1052073632@qq.com', amount: 0, autoCalc: true},
        {email: 'xieyn12345@gmail.com', amount: 0, autoCalc: true},
        {email: 'yizhuanp1@uci.edu', amount: 0, autoCalc: true}
    ]

    const [total, setTotal] = useState(0)
    const [mode, setMode] = useState("include")
    const [payerList, setPayerList] = useState<Payer[]>(simulate)

    const calcAmount = (deduction:Number) => {


    }
    
    const del = (e:any) => {
        const index = e.target.getAttribute("data-index");
        console.log(index)
        const element = document.getElementById(index)
        console.log(element)
        // element?.parentNode?.removeChild(element);
        const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
        Object.assign(payerList_,payerList)
        for(let i =0;i<payerList_.length;i++ ) {
            if(payerList_[i].email==index){
                payerList_.splice(i,1);
                break;
            }
        }
        setPayerList(payerList_)
    }


    return (
        <IonPage>

            <IonToolbar>
                <IonButtons slot="secondary">
                    <IonButton >
                        <IonIcon slot="icon-only" icon={menu} />
                    </IonButton>
                    <IonButton >
                        <IonIcon slot="icon-only" icon={search} />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton>
                        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical} />
                    </IonButton>
                </IonButtons>
                <IonTitle>New Bill</IonTitle>
            </IonToolbar>
            <IonContent>
            <IonItem>
                <IonLabel>Total Amount</IonLabel>
                <IonInput type='tel' onIonChange={(event) => {console.log(payerList);setTotal(Number(event.detail.value))}}></IonInput>
            </IonItem>

            <IonItem>
                <IonSegment value={mode} onIonChange={e => setMode(String(e.detail.value))}>
                    <IonSegmentButton value="include">
                        <IonLabel>include me</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="exclude">
                        <IonLabel>exclude me</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonItem>


            <IonList >
            {payerList.map((payer) => 
                <IonItem key={payer.email} id={payer.email}>
                    <IonLabel >{payer.email}</IonLabel>
                    <IonInput type='tel' inputmode="numeric" slot="end" clearOnEdit={true}></IonInput>
                    <IonIcon data-index={payer.email} color="danger" slot="end" ios={removeCircle} 
                    onClick = {(event) =>{del(event)}}/>
                </IonItem>
                
            )}
            </IonList>



            <IonButton onClick={()=>{console.log("add new payer")}}>
                Add Payer
            </IonButton>

            <IonButton expand="block" onClick={()=>{console.log("add new payer")}}>
                Create Bill
            </IonButton>
            
            <IonButton expand="block" color="danger" onClick={()=>{setPayerList([]); history.push("./home")}}>
                Cancel
            </IonButton>
            </IonContent>



 
        </IonPage>
    )
}

export default AddBillPage