import { GetCustomerDetails as execute } from './execute';
import { GetCustomerDetailsDescription as description } from './description';
import { INodePropertyOptions } from 'n8n-workflow';

export { description, execute };

//const ENDPOINT = 'Customer';
//const SUBENDPOINT = 'Service';
const METHOD = 'GetCustomerDetails';

export const operation: INodePropertyOptions = {
	name: 'Get Customer Details',
	value: METHOD,
	//description: 'Get customer details.',
	action: 'Get customer details',
};
