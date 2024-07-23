import ID from "../../@shared/domain/vo/id.vo";
import Client from "../domain/client.entity"
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository  implements ClientGateway{
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

    async findByID(id: string): Promise<Client> {
        const client = await ClientModel.findByPk(id);
        if(!client){
            throw new Error("Client not found");
        }

        return new Client({
            id: new ID(client.id),
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }
}
    