
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { ServiceProperties } from '../../Interfaces';
import { IncludeReleased, SearchString } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'SearchServices';

export const operation: INodePropertyOptions = {
	name: 'Search Services',
	value: METHOD,
	action: 'Search services',
};

export const properties: ServiceProperties = [
	SearchString(METHOD),
	IncludeReleased(METHOD),
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		SearchString: this.getNodeParameter('SearchString', index),
		IncludeReleased: this.getNodeParameter('IncludeReleased', index),
	}) as any;

	// Parse results and return
	return this.helpers.returnJsonArray(responseData);

}
