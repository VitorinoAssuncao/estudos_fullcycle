import ValidatorInterface from "../../@shared/validator/validator";
import Customer from "../entity/customers";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory{
    static create(): ValidatorInterface<Customer>{
        return new CustomerYupValidator();
    }
}