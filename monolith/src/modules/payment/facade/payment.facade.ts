import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import { ProcessPaymentFacadeInputDTO, ProcessPaymentFacadeOutputDTO } from "./payment.facade.interface";

export interface UsecaseProps{
    processPaymentUseCase: UseCaseInterface;
}

export default class PaymentFacade{
    private _processPaymentUseCase: any;

    constructor(useCaseProps:UsecaseProps){
        this._processPaymentUseCase = useCaseProps.processPaymentUseCase;
    }

    async processPayment(input: ProcessPaymentFacadeInputDTO): Promise<ProcessPaymentFacadeOutputDTO> {
        return this._processPaymentUseCase.execute(input);
    }
}