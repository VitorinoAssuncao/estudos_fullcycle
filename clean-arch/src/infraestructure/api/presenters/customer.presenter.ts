import { toXML } from "jstoxml";
import { ListCustomerOutput } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  public static toXML(data: ListCustomerOutput): string {
    const xmlOption = {
        header: true,
        indent: '  ',
        newLine: '\n',
        allowEmpty: true,
    }


    return toXML({ customers: data.customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
            street: customer.address.street,
            number: customer.address.number,
            zipCode: customer.address.zipCode,
            city: customer.address.city,
        }
    })) },xmlOption);
  }
}