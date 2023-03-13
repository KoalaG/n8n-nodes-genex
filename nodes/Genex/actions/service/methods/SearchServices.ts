
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'SearchServices';

export const operation: INodePropertyOptions = {
	name: 'Search Services',
	value: METHOD,
	description:
		'This web method is used to search for a service, across all customers, using a keyword. The functionality is similar to the service search option on Services screen in Genex UI. The keyword is matched to service identifier and list of service with matching value is returned. If a service exists with exact match, only that record will be returned. Partial matches are only reported if no record with exact match exists.',
	action: 'Search services',
};

export const properties: ServiceProperties = [
	{
		displayName: 'Search String',
		description: 'Ex. mydataconnnection@dsl.com or “0921534289”.',
		name: 'SearchString',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [ 'SearchServices' ],
			},
		},
		default: ''
	},
	{
		displayName: 'Include Released',
		description: 'Whether response should include released services. If the use case is checking a service number before new service, then this flag should be set to false to identify if there is any active service with same identifier. Ex. False – only include non-released service.',
		name: 'IncludeReleased',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: [ 'SearchServices' ],
			},
		},
		default: false
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		SearchString: this.getNodeParameter('SearchString', index),
		IncludeReleased: this.getNodeParameter('IncludeReleased', index),
	}) as any;

	// Check if results were found
	const rawServiceList = responseData['ServiceList']['Service'];

	// Parse results and return
	return this.helpers.returnJsonArray(rawServiceList);

}
