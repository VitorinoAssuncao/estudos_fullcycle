import ClientADMFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/findClient/find-client.usecase";

export default class ClientADMFacadeFactory {
    static create(){
        const clientRepository = new ClientRepository();

        return new ClientADMFacade({
            addUseCase: new AddClientUsecase(clientRepository),
            findByIDUseCase: new FindClientUsecase(clientRepository)
        })
    }
}