import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientADMFacadeFactory from "../factory/facade.factory";

describe('ClientADM unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should add a client', async () => {

        const facade = ClientADMFacadeFactory.create();

        await facade.addClient({
            id: '1',
            name: 'Client 1',
            email: 'email@teste',
            address: 'endereço teste',
        });

        const result = await ClientModel.findByPk('1');

        expect(result.name).toEqual('Client 1');
        expect(result.email).toEqual('email@teste');
        expect(result.address).toEqual('endereço teste');
    });

    it('should find a client', async () => {
        const facade = ClientADMFacadeFactory.create();

        await ClientModel.create({
            id: '1',
            name: 'Client 1',
            email: 'email@teste',
            address: 'endereço teste',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await facade.findClient({ id: '1'});

        expect(result.id).toEqual('1');
        expect(result.name).toEqual('Client 1');
        expect(result.email).toEqual('email@teste');
        expect(result.address).toEqual('endereço teste');
    });


});