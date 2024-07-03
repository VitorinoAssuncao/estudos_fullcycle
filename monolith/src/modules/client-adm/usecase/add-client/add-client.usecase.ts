import ID from "../../../@shared/domain/vo/id.vo";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.dto";

export default class AddClientUsecase {
    private _repository;
    constructor(repository: ClientGateway) {
        this._repository = repository;
    }

    async execute(input:AddClientInputDTO): Promise<AddClientOutputDTO> {
        const client = new Client({
            id: new ID(input.id),
            name: input.name,
            email: input.email,
            address: input.address
        });

        await this._repository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
        
    }
}