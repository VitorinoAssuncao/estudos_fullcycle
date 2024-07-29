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
            document: input.document,
            email: input.email,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode
        });

        await this._repository.add(client);

        return {
            id: client.id.value,
            name: client.name,
            document: client.document,
            email: client.email,
            address: {
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode
            },
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
        
    }
}