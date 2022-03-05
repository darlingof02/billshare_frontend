import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel } from "@ionic/react";
import { BillDetails } from "../pages/BillDetailPage"

// JS 推荐这种方式 | 可以搜一下 react typescript props
const BillComponent = (props:{billInfo:BillDetails}) => {
    return (
        <IonCard>
            <IonImg src="https://source.unsplash.com/random/300x100" />
            <IonCardHeader>
                Bill owner: {props.billInfo.ownerNickName}
            </IonCardHeader>
            {props.billInfo.comment == null || props.billInfo.comment?.length == 0? null : 
                <IonCardHeader >Comment:</IonCardHeader>}
            {props.billInfo.comment == null || props.billInfo.comment?.length == 0? null : 
                <IonCardContent>{props.billInfo.comment}</IonCardContent>}
            {props.billInfo.type == null || props.billInfo.type?.length==0? null:
                <IonCardHeader>Type: {props.billInfo.type}</IonCardHeader>}
            <IonCardHeader>
                Due: {props.billInfo.due == null? "No due":props.billInfo.due.substring(0,10)}
            </IonCardHeader>
            
        </IonCard>
    )
}

export default BillComponent;