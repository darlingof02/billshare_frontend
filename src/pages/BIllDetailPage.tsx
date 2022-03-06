import { IonAvatar, IonButton, IonContent, IonHeader, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonToolbar } from "@ionic/react";
import { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router";
import BillService from "../api/BillService";
import BillComponent from "../components/BillComponent";

export interface BillDetails {
    ownerId: number,
    ownerNickName: string,
    ownerFirstName: string,
    ownerLastName: string,
    totalAmount: number,
    status: number,
    receipt: ImageBitmap|null,
    comment: string|null,
    type: string|null,
    createTime: string,
    due: string|null
}
export interface Debt {
    debtorEmail: string,
    debtorAvatar: null,
    debtorNickName: string,
    debtorFirstName: string,
    debtorLastName: string,
    debtorTel: number|null,
    amount: number,
    status: number,
    acceptTime: Date|null,
    payTime: null,
    debtorId: number
}

const textAlignCenter: CSSProperties = {
    textAlign: "center"
};

const BillDetailPage: React.FC = (props) => {

    const [billDetails, setBillDetail] = useState<BillDetails>();
    const [indebts, setIndebts] = useState<Debt[]>([])
    const { billId } = useParams() as {
        billId: any
    }

    const buttonStyle = (status:number):CSSProperties => {
        if(status === 0)
            return {backgroundColor:"#cccccc"};
        if(status === 1)
            return {backgroundColor:"#f4b42a"};
        if(status === 2)
            return {backgroundColor:"#80eaca"};
        return {backgroundColor:"#80eaca"};
    }
    const buttonColor = (status:number):string => {
        if(status === 0)
            return "medium";
        if(status === 1)
            return "warning";
        if(status === 2)
            return "secondary";
        return "success";
    }
    const buttonText = (status:number) => {
        if(status === 0)
            return "unaccepted";
        if(status === 1)
            return "unpaid";
        if(status === 2)
            return "confirm";
        return "finished";
    }

    useEffect(
        () => {
            BillService.getIndebtByBill(billId)
            .then(
                (response) => {
                    console.log(response.data)
                    setIndebts(response.data)
                }
            )

            BillService.getBillById(billId)
            .then(
                (response) => {
                    console.log(response.data)
                    setBillDetail(response.data)
                }
            )
        },
        []
    )

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={textAlignCenter}>
                    This is Bill {billId}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {billDetails ? <BillComponent billInfo={billDetails}/> : null}
                <IonListHeader>
                    Indebtors
                </IonListHeader>
                {indebts.map((item: Debt) => (
                    <IonItemSliding key={item.debtorId}>
                        <IonItemOptions side="end">
                            <IonItemOption color="danger" onClick={() => console.log('Delete')}>Delete</IonItemOption>
                        </IonItemOptions>
                        <IonItem key={item.debtorId}>
                            <IonAvatar slot="start">
                                <IonImg src={String(item.debtorAvatar)} />
                            </IonAvatar>
                            <IonLabel>{item.debtorNickName} Owes You ${item.amount}</IonLabel>
                            <IonButton disabled = {item.status!==2} color = {buttonColor(item.status)}
                                onClick={()=>{}}>{buttonText(item.status)}</IonButton>
                        </IonItem>
                    </IonItemSliding>


                ))}


            </IonContent>
        </IonPage>
    );
}

export default BillDetailPage;