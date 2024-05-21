import ProductFactory from "./product.factory";

describe("Product Factory unit tests", () => {
    it("should create product A successfully", () =>{
        const product = ProductFactory.create("a", "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    })

    it("should create product B successfully", () =>{
        const product = ProductFactory.create("b", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    })

    it("should throw error when product type is not supported", () =>{
                expect(() => ProductFactory.create("C", "Product C", 1)).toThrow("Product Type not supported")
    })

})