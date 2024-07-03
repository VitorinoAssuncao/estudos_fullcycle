import Client from "../domain/client.entity";
import { AddClientInputDTO } from "../usecase/add-client/add-client.dto";

export default interface ClientGateway{
    add(input: Client): Promise<void>;
    findByID(id: string): Promise<Client>;
}