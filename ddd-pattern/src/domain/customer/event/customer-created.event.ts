import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface{
    createdAt: Date;
    eventData: any;

    constructor(eventData:any){
        this.createdAt = new Date();
        this.eventData = eventData;
    }
}