import { IonAvatar, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToolbar } from "@ionic/react";
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
export interface Debts {
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
    const [indebts, setIndebts] = useState<Debts[]>([])
    const { billId } = useParams() as {
        billId: any
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
                {indebts.map((item: any) => (

                    <IonItem key={item.debtorId}>
                        <IonAvatar slot="start">
                            <IonImg src={item.debtorAvatar} />
                        </IonAvatar>
                        <IonLabel>{item.debtorNickName} Owes You ${item.amount}</IonLabel>
                    </IonItem>

                ))}


            </IonContent>
        </IonPage>
    );
}

export default BillDetailPage;