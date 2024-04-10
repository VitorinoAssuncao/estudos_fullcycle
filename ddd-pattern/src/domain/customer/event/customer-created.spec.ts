
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerCreated1Handler from "./handler/customer-created-1.handler";
import CustomerCreated2Handler from "./handler/customer-created-2.handler";

describe("Customer events tests", () =>{
    it("should register all event handlers", ()=>{
        const eventDispatcher = new EventDispatcher;

        const eventHandler1 = new CustomerCreated1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new CustomerCreated2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2); 
    })

    it("should unregister an event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerCreated1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerCreated1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    })

    it("should notify all event handlers",() =>{
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new CustomerCreated1Handler();

        const spyEventHandler = jest.spyOn(eventHandler1, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new CustomerCreated2Handler();

        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "user",
        });

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })
})