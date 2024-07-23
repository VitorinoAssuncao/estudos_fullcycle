import AddClientUsecase from "./add-client.usecase";

const mockClientRepository = {
    add: jest.fn(),
    findByID: jest.fn()
};

describe('AddClientUsecase', () => {    
    it('should add a client', async () => {
        const repository = mockClientRepository;

        const usecase = new AddClientUsecase(repository);

        const input = {
            id: '1',
            name: 'Client 1',
            document: "123456789",
            email: 'email@teste',
            address: {
                street: 'Rua 1',
                number: '123',
                complement: 'Complemento',
                city: 'Cidade',
                state: 'Estado',
                zipCode: '12345678'
            }
        };


        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address.street).toEqual(input.address.street);
    });
});