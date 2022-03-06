import { IonChip } from "@ionic/react"

export const calcDaysBeforeDue = (date:Date, due:Date|string):number => {
    if(typeof(due) == 'string')
        due = new Date(due)
    return (due.getTime() - date.getTime()) / (1000 * 3600 * 24)
}



export  const DueChipComponent = (props:{due:string|null}) => {
    const DueColor = (due:string | null) => {
        if(due == null)
            return "success"
        if(calcDaysBeforeDue(new Date(),due) < 0)
            return "dark"
        if(calcDaysBeforeDue(new Date(),due) < 1)
            return "danger"
        if(calcDaysBeforeDue(new Date(),due) < 7)
            return "warning"
        return "success"
    }

    return <IonChip color={DueColor(props.due)}>{props.due == null? "No due":props.due.substring(0,10)}</IonChip>
}