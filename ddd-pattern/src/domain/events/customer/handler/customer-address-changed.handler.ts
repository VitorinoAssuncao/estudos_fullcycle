import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class CustomerAddressChangedHandler implements EventHandlerInterface{
    handle(event: EventInterface): void {
        const id = event.eventData.id;
        const name = event.eventData.name;
        const address = event.eventData.address.toString();

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`)
    }
}