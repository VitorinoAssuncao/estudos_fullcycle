import Product from "./product";

describe("Product unit tests", () =>{
    it("should create product successfully",() =>{
        const product = new Product("123", "Product",100);
        expect(product.id).toBe("123");
        expect(product.name).toBe("Product");
        expect(product.price).toBe(100);
    });

    it("should throw error when id is empty",() =>{
        expect(() =>{
        let product = new Product("","Product",1)
        }).toThrow("product: Id is required")
    });

    it("should throw error when name is empty",() =>{
        expect(() =>{
        let product = new Product("123","",1)
        }).toThrow("product: Name is required")
    });

    it("should throw error when name and id are empty",() =>{
        expect(() =>{
        let product = new Product("","",1)
        }).toThrow("product: Id is required, product: Name is required")
    });

    it("should throw error when price is zero",() =>{
        expect(() =>{
        let product = new Product("123","Product",0)
        }).toThrow("product: Price need to be greater than zero")
    });

    it("should throw error when price is negative",() =>{
        expect(() =>{
        let product = new Product("123","Product",-5)
        }).toThrow("product: Price need to be greater than zero")
    });

    it("should change name",() =>{
        const product = new Product("123", "Product",100);

        product.changeName("Product2");

        expect(product.name).toBe("Product2");
    });

    it("should change price",() =>{
        const product = new Product("123", "Product",100);

        product.changePrice(150);

        expect(product.price).toBe(150);
    });

})