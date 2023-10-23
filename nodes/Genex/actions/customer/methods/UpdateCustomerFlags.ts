
import type { IExecuteFunctions } from 'n8n-core';
import type { IDataObject, INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { CustomerProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateCustomerFlags';
const PARSER = transport.parseSystemReference;

export const operation: INodePropertyOptions = {
	name: 'Update Customer Flags',
	value: METHOD,
	description:
		'This webmethod is used to update status of the flags on Customer screen in Genex',
	action: 'Update Customer Flags',
};

export const properties: CustomerProperties = [

	{
		displayName: 'Customer Number',
		name: 'CustomerNumber',
		type: 'number',
		default: 0,
		required: true,
		description: 'Must be a valid Genex customer number',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 1',
		name: 'Flag1',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 2',
		name: 'Flag2',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 3',
		name: 'Flag3',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 4',
		name: 'Flag4',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 5',
		name: 'Flag5',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 6',
		name: 'Flag6',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 7',
		name: 'Flag7',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 8',
		name: 'Flag8',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},

	{
		displayName: 'Flag 9',
		name: 'Flag9',
		type: 'boolean',
		default: false,
		displayOptions: { show: { operation: [ METHOD ], }, },
	}

];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		Flags: {
			Flag1: this.getNodeParameter('Flag1', index),
			Flag2: this.getNodeParameter('Flag2', index),
			Flag3: this.getNodeParameter('Flag3', index),
			Flag4: this.getNodeParameter('Flag4', index),
			Flag5: this.getNodeParameter('Flag5', index),
			Flag6: this.getNodeParameter('Flag6', index),
			Flag7: this.getNodeParameter('Flag7', index),
			Flag8: this.getNodeParameter('Flag8', index),
			Flag9: this.getNodeParameter('Flag9', index),
		}
	});

		return this.helpers.returnJsonArray([ PARSER(responseData.SystemReference) as IDataObject ]);



}
