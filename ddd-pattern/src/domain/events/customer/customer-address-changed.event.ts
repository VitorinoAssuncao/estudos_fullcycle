import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface{
    createdAt: Date;
    eventData: any;

    constructor(eventData:any){
        this.createdAt = new Date();
        this.eventData = eventData;
    }
}