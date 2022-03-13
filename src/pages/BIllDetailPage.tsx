import { IonAvatar, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonListHeader, IonPage, IonToolbar } from "@ionic/react";
import { CSSProperties, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BillService from "../api/BillService";
import BillComponent from "../components/BillComponent";
import DebtorUpdateStatusButton from "../components/DebtorUpdateStatusButton";
import DebtStatusComponent from "../components/DebtStatusComponent";
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



const BillDetailPage = (props:{role: string|null}) => {

    const [billDetails, setBillDetail] = useState<BillDetails>();
    const [indebts, setIndebts] = useState<Debt[]>([])
    const { billId, status } = useParams() as {
        billId: any
        status: any
    }
    const history = useHistory()
    // console.log(history.location.pathname)
    // console.log(history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1))
    // console.log("bid: " + billId)
    // console.log("status: " + status)
    const bid = Number(history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1))
    const fetchData = () => {
        console.log("fetched data")
        if (props.role === 'owner') {
            BillService.getIndebtByBill(billId)
            .then(
                (response) => {
                    console.log(response.data)
                    setIndebts(response.data)
                }
            )
        }

        if (props.role === 'debtor') {
            BillService.getIndebtByBillForDebtor(billId)
            .then(
                (response) => {
                    console.log(response.data)
                    setIndebts(response.data)
                }
            )
        }

        BillService.getBillById(billId)
        .then(
            (response) => {
                console.log(response.data)
                setBillDetail(response.data)
            }
        )
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
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
                {props.role === 'debtor' ? <DebtStatusComponent status={status}/> : null}
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

                            <IonLabel>{item.debtorNickName} Owes {props.role === 'owner' ? "You" : ( billDetails === undefined ? null: billDetails.ownerNickName)} ${item.amount}</IonLabel>
                            <UpdateDebtStatusButton debtStatus={item.status} bid={bid} did={item.debtorId} role={props.role}
                            dname={item.debtorNickName} refresh={(data:Debt[]) => setIndebts(data)} ></UpdateDebtStatusButton>



                        </IonItem>
                    </IonItemSliding>
                ))}



            </IonContent>
            {props.role === 'debtor' ? 
                (
                    <IonFooter>

                        <DebtorUpdateStatusButton status={status} bid={billId} /> 

                    </IonFooter>
                ) : null }
        </IonPage>
    );
}

export default BillDetailPage;