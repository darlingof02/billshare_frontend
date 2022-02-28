import { IonButton, IonButtons, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import {search,menu, ellipsisHorizontal, ellipsisVertical, removeCircle } from 'ionicons/icons';
import React, { useState } from "react";
import { useHistory } from "react-router";


// TODO: 将idx改成payer在list中的idx，就不用遍历列表了

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
    const [splitMode, setSplitMode] = useState("include")
    const [payerList, setPayerList] = useState<Payer[]>(simulate)

    const splitAmount = (totalNum:number) => {
        // console.log("splitMode in splictAmount",splitMode)
        let payerNum = 1;
        if(splitMode == 'exclude')
            payerNum = 0
        const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
        
        Object.assign(payerList_,payerList)
        payerList_.forEach((payer:Payer,idx,payerList_) =>{
            if(!payer.autoCalc)
                totalNum -= payer.amount;
            else 
                payerNum++;
        })
        payerList_.forEach((payer:Payer,idx,payerList_) =>{
            if(payer.autoCalc)
                payer.amount = Number((totalNum/payerNum).toFixed(2))
        })
        setTotal(totalNum)
        setPayerList(payerList_)
    }

    // const handleBlur = (e:React.FocusEvent<HTMLIonInputElement, Element>) => {
        
    //     const email = e.currentTarget.getAttribute("payer-email");
    //     let totalNum = total

    //     const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
    //     Object.assign(payerList_,payerList)
    //     for(let i =0;i<payerList_.length;i++ ) {
    //         if(payerList_[i].email==email){
    //             payerList_[i].autoCalc = false;
    //             payerList_[i].amount = e.target.value;
    //             console.log(email)
    //             console.log(payerList_[i])

    //             break;
    //         }
    //     }
    //     let payerNum = 0;
    //     if(splitMode == 'include')
    //         payerNum = 1
    //     payerList_.forEach((payer:Payer,idx,payerList_) =>{
    //         if(!payer.autoCalc)
    //             totalNum -= payer.amount;
    //         else 
    //             payerNum++;
    //     })
    //     payerList_.forEach((payer:Payer,idx,payerList_) =>{
    //         if(payer.autoCalc)
    //             payer.amount = Number((totalNum/payerNum).toFixed(2))
    //     })
    //     setPayerList(payerList_)

    // }
    
    // const handleEditManually = (e:any) => {
    //     const email = e.target.getAttribute("payer-email");
    //     console.log(e.target)
    //     if(e.target.getAttribute("fill") == "outline"){
    //         e.target.setAttribute("fill","solid")
    //         console.log("wuhu")
    //     }
            
    //     else
    //         e.target.getAttribute("fill","outline")
    //     const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
    //     Object.assign(payerList_,payerList)
    //     for(let i =0;i<payerList_.length;i++ ) {
    //         if(payerList_[i].email==email){
    //             payerList_[i].autoCalc = false;
    //             payerList_[i].amount = Number(e.target.value);
    //             // console.log(email)
    //             // console.log(payerList_[i])
    //             break;
    //         }
    //     }
    //     setPayerList(payerList_)
    // }
    // const handleChange = (e:any) => {
    //     const email = e.target.getAttribute("payer-email");
    //     const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
    //     Object.assign(payerList_,payerList)
    //     for(let i =0;i<payerList_.length;i++ ) {
    //         if(payerList_[i].email==email){
    //             payerList_[i].autoCalc = false;
    //             payerList_[i].amount = e.target.value;
    //             // console.log(email)
    //             // console.log(payerList_[i])
    //             break;
    //         }
    //     }
    //     setPayerList(payerList_)
    // }


    const del = (e:any) => {
        const index = e.target.getAttribute("payer-email");
        console.log(index)
        const payerList_: any[] | ((prevState: Payer[]) => Payer[]) = []
        Object.assign(payerList_,payerList)
        for(let i =0;i<payerList_.length;i++ ) {
            if(payerList_[i].email==index){
                payerList_.splice(i,1);
                break;
            }
        }
        let payerNum = 1;
        if(splitMode == 'exclude')
            payerNum = 0
        let totalNum = total
        payerList_.forEach((payer:Payer,idx,payerList_) =>{
            if(!payer.autoCalc)
                totalNum -= payer.amount;
            else 
                payerNum++;
        })
        payerList_.forEach((payer:Payer,idx,payerList_) =>{
            if(payer.autoCalc)
                payer.amount = Number((totalNum/payerNum).toFixed(2))
        })

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
            <IonItem lines="inset">
                <IonLabel slot="" position="floating">Total Amount</IonLabel>
                <IonInput type='tel' onIonChange={(event) => {splitAmount(Number(event.detail.value))}}></IonInput>
                
            </IonItem>

            <IonItem lines="inset">
                <IonSegment value={splitMode} onIonChange={e => {setSplitMode(String(e.detail.value))}}
                 onClick={e=>splitAmount(total)}>
                    <IonSegmentButton value="include" >
                        <IonLabel>include me</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="exclude" >
                        <IonLabel>exclude me</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonItem>


            <IonList >
            {payerList.map((payer) => 
                <IonItem key={payer.email} id={payer.email}>
                    <IonLabel >{payer.email}</IonLabel>
                    <IonInput  payer-email={payer.email} type='tel' value={String(payer.amount)} slot="end" clearOnEdit={true} 
                    onIonChange={(e)=>(e)}></IonInput>
                    <IonButton payer-email={payer.email} slot="end" fill="outline" 
                        onClick={(e) => (e)}>
                        manually
                    </IonButton>
                    <IonIcon payer-email={payer.email} color="danger" slot="end" ios={removeCircle} 
                    onClick = {(event) =>{del(event)}}/>
                </IonItem>
                
            )}
            </IonList>
            


            <IonButton fill="outline" size="small" onClick={()=>{console.log("add new payer");setPayerList(simulate);splitAmount(total)}}>
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