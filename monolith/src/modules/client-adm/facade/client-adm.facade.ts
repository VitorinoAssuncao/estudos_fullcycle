import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ID from "../../@shared/domain/vo/id.vo";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/findClient/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface UseCaseProps{
    addUseCase: UseCaseInterface;
    findByIDUseCase: UseCaseInterface;
}

export default class ClientADMFacade implements ClientAdmFacadeInterface{
    private _addUseCase: any;
    private _findByIDUseCase: any;

    constructor(useCaseProps:UseCaseProps){
        this._addUseCase = useCaseProps.addUseCase ;
        this._findByIDUseCase = useCaseProps.findByIDUseCase;
    }

    async addClient(input: AddClientFacadeInputDTO): Promise<void> {
        return this._addUseCase.execute(input);
    }

    async findClient(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return this._findByIDUseCase.execute({ id: input.id});
    }
}