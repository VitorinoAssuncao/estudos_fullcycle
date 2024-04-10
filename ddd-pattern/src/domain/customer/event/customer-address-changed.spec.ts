import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../../customer/entity/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerAddressChangedHandler from "./handler/customer-address-changed.handler";

describe("Customer events tests", () =>{
    it("should register an event handler", ()=>{
        const eventDispatcher = new EventDispatcher;

        const eventHandler1 = new CustomerAddressChangedHandler();

        eventDispatcher.register("CustomerAddressChanged", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"].length).toBe(1);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChanged"][0]).toMatchObject(eventHandler1);
    })

    it("should unregister an event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerAddressChangedHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerAddressChangedHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
    })

    it("should notify all event handlers",() =>{
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerAddressChangedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Usuário 1",
            address:new Address("Rua dos bobos",1,"89030112","Santos")
        });

        eventDispatcher.notify(customerAddressChangedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    })
})