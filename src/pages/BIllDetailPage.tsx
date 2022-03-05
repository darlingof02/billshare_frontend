import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BillService from "../api/BillService";
import BillComponent from "../components/BillComponent";

interface IndebtInfo {
    debtId: number,
    status: number,
    amount: number,
    debtorAvatar: String|null,
    debtorNickName: String|null,
}

const BillDetailPage: React.FC = (props) => {

    const [billDetails, setBillDetail] = useState<any>();
    // const [indebts, setIndebts] = useState<Map<number, IndebtInfo>>(new Map());
    const [indebts, setIndebts] = useState([])
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
                <IonToolbar>
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
                            <img src={item.debtorAvatar} />
                        </IonAvatar>
                        <IonLabel>{item.debtorNickName} Owes You ${item.amount}</IonLabel>
                    </IonItem>

                ))}


            </IonContent>
        </IonPage>
    );
}

export default BillDetailPage;