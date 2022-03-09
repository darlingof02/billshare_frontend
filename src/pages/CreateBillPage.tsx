import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTextarea, IonTitle, IonToast, IonToolbar, useIonAlert } from "@ionic/react";
import axios from "axios";
import { removeCircle, calendar } from 'ionicons/icons';
import React, { CSSProperties, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, CHECK_USER, CREATE_BILL} from "../api/constant";
import './CreateBillPage.css' 


/**
 * TODO: 点击manually， 自动算一下账单
 *  exclude me切换逻辑
 * 提交时检查账单是否一直，比如加起来不是总金额这种情况，尤其是包括自己的时候
 * 
 *
 * */ 


interface Payer {
    debtorEmail: string;
    amount: number;
    autoCalc: boolean
}
export const textAlignCenter: CSSProperties = {
    textAlign: "center"
};
// style="width:200px; height:20px;"

const CreateBillPage: React.FC = (props:any) => {
    const history = useHistory()
    const [present] = useIonAlert();

    const simulateMap: Map<string,Payer> = new Map()
    const simulate: Payer[] = [
        // {debtorEmail: 'yuninx1@uci.edu', amount: 0, autoCalc: true},
        // {debtorEmail: '1052073632@qq.com', amount: 0, autoCalc: true},
        {debtorEmail: 'xieyn12345@gmail.com', amount: 0, autoCalc: true},
        // {debtorEmail: 'yizhuanp1@uci.edu', amount: 0, autoCalc: true}
    ]

    simulate.forEach((payer:Payer,index,simulate) => simulateMap.set(payer.debtorEmail,payer))
    const [payerMap, setPayerMap] = useState<Map<string,Payer>>(simulateMap)
    const [total, setTotal] = useState(0)
    const [comment, setComment] = useState("")
    const [splitMode, setSplitMode] = useState("include")
    const [disabled, setDisabled] = useState(true)
    const [userExists, setUserExists] = useState(false)
    const [addFailed, setAddFailed] = useState(false)
    const [createFailed, setCreateFailed] = useState(false)
    const [due, setDue] = useState<Date|null>(null)


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

    function setDueOnClick() {
        present({
            header: 'Set Due date',
            // message: 'set due date',
            inputs: [
              {
                  name: 'due',
                  type: 'date',
                  handler: (e) => console.log("input", e)
              }
            ],
            buttons: [
              'Cancel',
              { text: 'Add', handler: (d) => { 
                  setDue(d.due)
              }},
            ],
            onDidDismiss: (e) => {console.log(e);console.log('did dismiss')},
          })
    }

    function handleNewPayer(d:any) {
        if(payerMap.has(d.debtorEmail)){
            setUserExists(true)
            return ;
        }
        let totalNum = total
        const payerMap_ : Map<string,Payer> | ((prevState: Map<string,Payer>) => Map<string,Payer>) = new Map(payerMap)
        payerMap_.set(d.email,{debtorEmail:d.email, amount:0, autoCalc:true})
        
        let payerNum = 1;
        if(splitMode === 'exclude')
            payerNum = 0
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
        if(payerMap_.size!==0 && totalNum!==0)
            setDisabled(false)
        else
            setDisabled(true)

        setPayerMap(payerMap_)  
    }

    function handleAddPayer() {
        present({
            cssClass: 'my-css',
            header: 'Add Payer',
            message: 'add new payer by his email',
            inputs: [
              {
                  name: 'email',
                  type: 'email',
                  placeholder: "input payer's email",
                  handler: (e) => console.log("input", e)
              }
            ],
            buttons: [
              'Cancel',
              { text: 'Confirm', handler: (d) => { 
                  axios({
                      url: API_URL + CHECK_USER,
                      params:d,
                  }).then((response) => handleNewPayer(d))
                    .catch((error) =>{
                        setAddFailed(true)
                    })
              }},
            ],
            onDidDismiss: (e) => {console.log(e);console.log('did dismiss')},
          })
    }

    function handleCreateBill() {

        const data = {
            amount: total,
            debtorInfos: Array.from(payerMap.values()),
            createTime: new Date(),
            dueTime: due,
            comment: comment,
            
        }
        console.log(data)

        axios({
            url: API_URL + CREATE_BILL,
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(()=>{history.replace("/home")}).catch((error)=>console.log(error))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New Bill</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonItem lines="inset">
                <IonLabel position="floating">Total Amount</IonLabel>
                <IonInput type='tel' onIonChange={(event) => {splitAmountMap(Number(event.detail.value))}}></IonInput>
                
            </IonItem>

            <IonItem>
                <IonLabel>Due</IonLabel>
                <IonButton size="small" onClick={setDueOnClick}>
                    {due}
                    <IonIcon slot="end" icon={calendar} />
                </IonButton>
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
                <IonItem key={payer.debtorEmail} id={payer.debtorEmail}>
                    <IonLabel >{payer.debtorEmail}</IonLabel>
                    <IonInput className="payerInput" payer-email={payer.debtorEmail} type='tel' 
                        value={String(payer.amount)} slot="end" clearOnEdit={true} style={textAlignCenter}
                        onIonChange={(e)=>{handlePayerInputChangeMap(e)}}></IonInput>
                    <IonButton payer-email={payer.debtorEmail} slot="end" fill={payer.autoCalc?"outline":"solid"} 
                        onClick={(e) => handleManuallyButtonMap(e)}>
                        manually
                    </IonButton>
                    <IonIcon payer-email={payer.debtorEmail} color="danger" slot="end" ios={removeCircle} 
                    onClick = {(event) =>{delMap(event)}}/>
                </IonItem>
                
            )}
            </IonList>

            <IonItem lines="none">
                <IonButton fill="outline" size="small" onClick={handleAddPayer}>
                    Add Payer
                </IonButton>
            </IonItem>


            <IonItem>
                <IonLabel position="floating"> Comment </IonLabel>
                <IonTextarea placeholder="Add comments here"  value ={comment} onIonChange={e => setComment(e.detail.value!)}></IonTextarea>
            </IonItem>
            
            <IonButton expand="block" disabled={disabled} onClick={handleCreateBill}>
                Create Bill
            </IonButton>

            <IonButton expand="block" color="danger" onClick={()=>{ history.replace("./home")}}>
                Cancel
            </IonButton>
            </IonContent>
            <IonToast
                isOpen={userExists}
                onDidDismiss={() => setUserExists(false)}
                message= "User is already in the payer list"
                duration={1500}
                position='top'
                color='success'
                cssClass='toast'
            />
            <IonToast
                isOpen={addFailed}
                onDidDismiss={() => setAddFailed(false)}
                message= "Add user failed, Email incorrect!"
                duration={1500}
                position='top'
                color='danger'
                cssClass='toast'
            />
            <IonToast
                isOpen={createFailed}
                onDidDismiss={() => setCreateFailed(false)}
                message= "Create bill failed!"
                duration={1500}
                position='top'
                color='danger'
                cssClass='toast'
            />

        </IonPage>
    )
}

export default CreateBillPage


