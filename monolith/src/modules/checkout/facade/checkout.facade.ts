import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import { PlaceOrderFacadeInputDTO, PlaceOrderFacadeOutputDTO } from "./checkout.facade.interface";

export interface UseCaseProps {
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacadeInterface {
    private _placeOrderUseCase: any;

    constructor(useCaseProps: UseCaseProps) {
        this._placeOrderUseCase = useCaseProps.placeOrderUseCase;
    }

    async placeOrder(input: PlaceOrderFacadeInputDTO): Promise<PlaceOrderFacadeOutputDTO> {
        return this._placeOrderUseCase.execute(input);
    }
}