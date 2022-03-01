import { IonButton, IonButtons, IonCheckbox, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, removeCircle } from 'ionicons/icons';
import React, { CSSProperties, useState } from "react";
import { useHistory } from "react-router";
import createBillService from "../api/CreateBillService"
import './AddBillPage.css' 


// TODO: 将idx改成payer在list中的idx，就不用遍历列表了

interface Payer {
    email: string;
    amount: number;
    autoCalc: boolean
}
const payerAmount: CSSProperties = {
    width: "60px"
};

const CreateBillPage: React.FC = () => {
    const history = useHistory()

    const simulateMap: Map<string,Payer> = new Map()
    const simulate: Payer[] = [
        {email: 'yuninx1@uci.edu', amount: 0, autoCalc: true},
        {email: '1052073632@qq.com', amount: 0, autoCalc: true},
        {email: 'xieyn12345@gmail.com', amount: 0, autoCalc: true},
        {email: 'yizhuanp1@uci.edu', amount: 0, autoCalc: true}
    ]

    simulate.forEach((payer:Payer,index,simulate) => simulateMap.set(payer.email,payer))
    const [payerMap, setPayerMap] = useState<Map<string,Payer>>(simulateMap)

    const [total, setTotal] = useState(0)
    const [splitMode, setSplitMode] = useState("include")
    const [disabled, setDisabled] = useState(true)

    const splitAmountMap = (totalNum:number) => {
        let payerNum = 1;
        if(splitMode === 'exclude')
            payerNum = 0
        const payerMap_ : Map<string,Payer> | ((prevState: Map<string,Payer>) => Map<string,Payer>) = new Map(payerMap)
        Array.from(payerMap_.keys()).forEach((pemail:string, idx ) =>{
            let payer:undefined | Payer = payerMap_.get(pemail)
            if(!payer!.autoCalc)
                totalNum -= payer!.amount!;
            else 
                payerNum++;
        })
        Array.from(payerMap_.keys()).forEach((pemail:string, idx ) =>{
            let payer:undefined | Payer = payerMap_.get(pemail)
            if(payer!.autoCalc)
                payer!.amount = Math.max(Number((totalNum/payerNum).toFixed(2)),0)
        })
        setTotal(totalNum)
        if(payerMap_.size!==0 && totalNum!==0)
            setDisabled(false)
        else
            setDisabled(true)

        setPayerMap(payerMap_)  
    }

    const handleManuallyButtonMap = (e:any) => {
        // console.log(e.target.getAttribute("fill"))

        const email = e.target.getAttribute("payer-email");
        const payerMap_ : Map<string,Payer> | ((prevState: Map<string,Payer>) => Map<string,Payer>) = new Map(payerMap)
        e.target.getAttribute("fill") === "outline"? payerMap_.get(email)!.autoCalc=false: payerMap_.get(email)!.autoCalc=true
        setPayerMap(payerMap_)
    }

    const handlePayerInputChangeMap = (e:any) => {
        // console.log(e.target.getAttribute("fill"))
        console.log(e.target.value)
        const email = e.target.getAttribute("payer-email");
        const payerMap_ : Map<string,Payer> | ((prevState: Map<string,Payer>) => Map<string,Payer>) = new Map(payerMap)
        payerMap_.get(email)!.amount = Number(e.target.value)
        setPayerMap(payerMap_)
    }
    const delMap = (e:any) => {
        const pemail = e.target.getAttribute("payer-email");
        console.log(pemail)
        const payerMap_ : Map<string,Payer> | ((prevState: Map<string,Payer>) => Map<string,Payer>) = new Map(payerMap)
        payerMap_.delete(pemail)

        let payerNum = 1;
        if(splitMode === 'exclude')
            payerNum = 0
        let totalNum = total
        Array.from(payerMap_.values()).forEach((payer:Payer,idx,payerList_) =>{
            payer.autoCalc? payerNum++ : totalNum -= payer.amount;
        })
        Array.from(payerMap_.values()).forEach((payer:Payer,idx,payerList_) =>{
            if(payer.autoCalc)
                payer.amount = Number((totalNum/payerNum).toFixed(2))
        })
        payerMap_.size === 0?setDisabled(true):setDisabled(false);
            
        setPayerMap(payerMap_)

    }

    function handleSubmit(e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) {
        
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
            <IonItem lines="inset">
                <IonLabel slot="" position="floating">Total Amount</IonLabel>
                <IonInput type='tel' onIonChange={(event) => {splitAmountMap(Number(event.detail.value))}}></IonInput>
                
            </IonItem>

            <IonItem lines="inset">
                <IonSegment value={splitMode} onIonChange={e => {setSplitMode(String(e.detail.value))}}
                 onClick={e=>splitAmountMap(total)}>
                    <IonSegmentButton value="include" >
                        <IonLabel>include me</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="exclude" >
                        <IonLabel>exclude me</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonItem>


            <IonList >
            {Array.from(payerMap.values()).map((payer) => 
                <IonItem key={payer.email} id={payer.email}>
                    <IonLabel >{payer.email}</IonLabel>
                    <IonInput className="payerInput" payer-email={payer.email} type='tel' 
                        value={String(payer.amount)} slot="end" clearOnEdit={true}
                        onIonChange={(e)=>{handlePayerInputChangeMap(e)}}></IonInput>
                    <IonButton payer-email={payer.email} slot="end" fill={payer.autoCalc?"outline":"solid"} 
                        onClick={(e) => handleManuallyButtonMap(e)}>
                        manually
                    </IonButton>
                    <IonIcon payer-email={payer.email} color="danger" slot="end" ios={removeCircle} 
                    onClick = {(event) =>{delMap(event)}}/>
                </IonItem>
                
            )}
            </IonList>


            <IonItem lines="none">
                <IonButton fill="outline" size="small" onClick={()=>{console.log("add new payer")}}>
                    Add Payer
                </IonButton>
            </IonItem>

            <IonButton expand="block" disabled={disabled} onClick={(e)=>{console.log("add new payer"); handleSubmit(e)}}>
                Create Bill
            </IonButton>
            
            <IonButton expand="block" color="danger" onClick={()=>{ history.push("./home")}}>
                Cancel
            </IonButton>
            </IonContent>

        </IonPage>
    )
}

export default CreateBillPage


