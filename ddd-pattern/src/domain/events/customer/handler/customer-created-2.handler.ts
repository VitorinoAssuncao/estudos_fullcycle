import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class CustomerCreated2Handler implements EventHandlerInterface{
    handle(event: EventInterface): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`)
    }
}