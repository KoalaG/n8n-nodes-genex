import type { IExecuteFunctions } from 'n8n-core';

import type { INodeExecutionData } from 'n8n-workflow';

import { apiRequest, parseServiceList } from '../../../transport';

export async function SearchServices(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await apiRequest.call(this, 'Customer', 'Service', 'SearchServices', {
		SearchString: this.getNodeParameter('SearchString', index),
		IncludeReleased: this.getNodeParameter('IncludeReleased', index),
	}) as any;

	const rawServiceList = responseData['ServiceList']['Service'];
	if (rawServiceList === undefined) {
		const data = parseServiceList(rawServiceList);
		return this.helpers.returnJsonArray(data);
	}

	return this.helpers.returnJsonArray([]);

}
