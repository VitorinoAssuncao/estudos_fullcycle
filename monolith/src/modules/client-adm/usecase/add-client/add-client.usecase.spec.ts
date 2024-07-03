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
            email: 'email@teste',
            address: 'endereço teste'
        };


        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    });
});