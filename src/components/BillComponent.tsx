import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonImg, IonLabel } from "@ionic/react";
import { BillDetails } from "../pages/BillDetailPage"

// JS 推荐这种方式 | 可以搜一下 react typescript props

export const calcDaysBeforeDue = (date:Date, due:Date|string):number => {
    if(typeof(due) == 'string')
        due = new Date(due)
    return (due.getTime() - date.getTime()) / (1000 * 3600 * 24)
}

const BillComponent = (props:{billInfo:BillDetails}) => {

    const DueColor = (due:string | null) => {
        if(due == null)
            return "success"
        if(calcDaysBeforeDue(new Date(),due) < 1)
            return "danger"
        if(calcDaysBeforeDue(new Date(),due) < 7)
            return "warning"
        return "success"
    }

    return (
        <IonCard>
            <IonImg src="https://source.unsplash.com/random/300x100" />
            <IonCardHeader>
                Bill owner: <IonChip>{props.billInfo.ownerFirstName}</IonChip>
            </IonCardHeader>

            {props.billInfo.comment == null || props.billInfo.comment?.length == 0? null : 
                <IonCardHeader >Comment:</IonCardHeader>}

            {props.billInfo.comment == null || props.billInfo.comment?.length == 0? null : 
                <IonCardContent>{props.billInfo.comment}</IonCardContent>}

            {props.billInfo.type == null || props.billInfo.type?.length==0? null:
                <IonChip><IonCardHeader>Type: {props.billInfo.type}</IonCardHeader></IonChip>}
            
            <IonCardHeader>
                Due: <IonChip color={DueColor(props.billInfo.due)}>{props.billInfo.due == null? "No due":props.billInfo.due.substring(0,10)}</IonChip>
            </IonCardHeader>
            
        </IonCard>
    )
}

export default BillComponent;