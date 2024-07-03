import ID from "../../../@shared/domain/vo/id.vo";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
    id: new ID('1'),
    name: 'Client 1',
    email: 'email@teste',
    address: 'endereço teste'
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
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
    });
});