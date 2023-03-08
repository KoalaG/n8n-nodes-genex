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

	console.log({ responseData: responseData['ServiceList']['Service'] });

	const rawServiceList = responseData['ServiceList']['Service'];
	if (rawServiceList === undefined) {
		return this.helpers.returnJsonArray([]);
	}

	const data = parseServiceList(rawServiceList);
	return this.helpers.returnJsonArray(data);

}
