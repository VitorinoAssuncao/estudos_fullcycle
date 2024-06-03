import Notification from "./notification";

describe("Notification", () => {
    it("should create a new notification", async () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.messages("customer")).toBe("customer: Error message");

        const otherError = {
            message: "Other Error Message",
            context: "customer",
        }

        notification.addError(otherError);

        expect(notification.messages("customer")).toBe("customer: Error message, customer: Other Error Message");

        const productError = {
            message: "Product Error Message",
            context: "product",
        }

        notification.addError(productError);

        expect(notification.messages("customer")).toBe("customer: Error message, customer: Other Error Message");

        expect(notification.messages()).toBe("customer: Error message, customer: Other Error Message, product: Product Error Message");
    })

    it("should check if a notification has at least one error", async () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        expect(notification.hasErrors()).toBe(false);

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    })

    it("should get all errors in notification", async () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.errors).toEqual([error]);
    })
})