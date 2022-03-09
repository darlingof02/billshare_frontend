import { IonAvatar, IonButton, IonContent, IonHeader, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonToolbar } from "@ionic/react";
import { CSSProperties, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BillService from "../api/BillService";
import BillComponent from "../components/BillComponent";
import {UpdateDebtStatusButton} from "../components/OwnerUpdateStatusButton"

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
    const history = useHistory()
    console.log(history.location.pathname)
    console.log(history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1))
    const bid = Number(history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1))
    const fetchData = () => {
        console.log("fetched data")
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
    }


    useEffect(fetchData,[])

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
                            <IonLabel>{item.debtorNickName} Owes You </IonLabel>
                            <IonLabel>${item.amount}</IonLabel>
                            <UpdateDebtStatusButton debtStatus={item.status} bid={bid} did={item.debtorId} 
                            dname={item.debtorNickName} refresh={(data:Debt[]) => setIndebts(data)} ></UpdateDebtStatusButton>

                        </IonItem>
                    </IonItemSliding>
                ))}
            </IonContent>
        </IonPage>
    );
}

export default BillDetailPage;