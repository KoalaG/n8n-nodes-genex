
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateServiceRatePlan';

export const operation: INodePropertyOptions = {
	name: 'Update Service Rate Plan',
	value: METHOD,
	description:
		'This web method is used to update the rate plan for a service. The new rate plan is applicable immediately (for the current billing period) and any plan based charges (fees, inclusions, credits) in the next bill run will apply as per the new rate plan.The method also has option to re-rate unbilled usage for the service and also remove any overrides (for the specific service only). You may want to remove the overrides if customer contracted (customised) rate are no longer applicable as part of signing up to the new rate plan.No action is taken if the new rate plan is same as current rate plan assigned to service.',
  action: 'Update service rate plan',
};

export const properties: ServiceProperties = [
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
		displayName: 'Service Number',
		name: 'ServiceNumber',
		type: 'string',
		default: '',
		required: true,
		description: 'Genex service number (Service Nofield in Service Details section of Services screen) associated to the Customer. Service must exist in Genex and should not be released.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Service Rate Plan',
		name: 'ServiceRatePlan',
		type: 'number',
		default: '',
		required: true,
		description: 'Value should be from the Planno field of RatePlandata structure',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Re Rate Unbilled',
		name: 'ReRateUnbilled',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether unbilled usage should be re-rated as per the new rate plan',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Remove Overrides',
		name: 'RemoveOverrides',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether any overrides (for the specific service only) should be removed',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		ServiceNumber: this.getNodeParameter('ServiceNumber', index),
		ServiceRatePlan: this.getNodeParameter('ServiceRatePlan', index),
		ReRateUnbilled: this.getNodeParameter('ReRateUnbilled', index),
		RemoveOverrides: this.getNodeParameter('RemoveOverrides', index),
	});

	return this.helpers.returnJsonArray(responseData);

}
