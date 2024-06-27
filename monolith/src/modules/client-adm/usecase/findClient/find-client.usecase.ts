import ClientGateway from "../../gateway/client.gateway";

export default class FindClientUsecase {
     private _repository:ClientGateway;
     
        constructor(repository: ClientGateway) {
            this._repository = repository;
        }

        async execute(id: string) {
            const client = await this._repository.findByID(id)
        
            return {
                id: client.id.value,
                name: client.name,
                email: client.email,
                address: client.address,
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
            }
        };
        
}