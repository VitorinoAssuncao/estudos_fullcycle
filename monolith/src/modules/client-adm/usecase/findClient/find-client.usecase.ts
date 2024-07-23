import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDTO } from "./find-client.dto";

export default class FindClientUsecase {
     private _repository:ClientGateway;
     
        constructor(repository: ClientGateway) {
            this._repository = repository;
        }

        async execute(input: FindClientInputDTO) {
            const client = await this._repository.findByID(input.id);
        
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
            }
        };
        
}