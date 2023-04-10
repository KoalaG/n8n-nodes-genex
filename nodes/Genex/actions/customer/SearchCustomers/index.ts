import { SearchCustomers as execute } from './execute';
import { SearchCustomersDescription as description } from './description';
import { INodePropertyOptions } from 'n8n-workflow';

export { description, execute };


//const ENDPOINT = 'Customer';
//const SUBENDPOINT = 'Service';
const METHOD = 'SearchCustomers';

export const operation: INodePropertyOptions = {
	name: 'Search Customers',
	value: METHOD,
	//description: 'Get customer details.',
	action: 'Search customers',
};
