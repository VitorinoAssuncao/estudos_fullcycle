import ID from "../../../@shared/domain/vo/id.vo";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
    id: new ID('1'),
    name: 'Client 1',
    document: '123456789',
    email: 'email@teste',
    street: 'Street 1',
    number: '123',
    complement: 'Complement 1',
    city: 'City 1',
    state: 'State 1',
    zipCode: '12345678',
});


const mockRepository = () =>{
    return {
        add: jest.fn(),
        findByID: jest.fn().mockResolvedValue(Promise.resolve(client))
    }

}

describe('FindClientUsecase', () => {
    it('should find a client', async () => {
        const repository = mockRepository();

        const usecase = new FindClientUsecase(repository);

        const input = {
            id: '1'
        };

        const result = await usecase.execute(input);

        expect(repository.findByID).toHaveBeenCalled();
        expect(result.id).toEqual(client.id.value);
        expect(result.name).toEqual(client.name);
        expect(result.document).toEqual(client.document);
        expect(result.email).toEqual(client.email);
        expect(result.address.street).toEqual(client.street);
    });
});