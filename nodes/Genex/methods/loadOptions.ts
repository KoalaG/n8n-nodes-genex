import { ILoadOptionsFunctions } from "n8n-core";
import { INodePropertyOptions } from "n8n-workflow";
import { CarrierType, ServiceDisconnectionReasonsType } from "../actions/Interfaces";
import { apiRequest } from "../transport";


export async function getServiceDisconnectionReasons(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const disconnectionReasons: ServiceDisconnectionReasonsType[] = await apiRequest.call(this, 'Configuration', '', 'GetServiceDisconnectionReasons', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...disconnectionReasons.map((disconnectionReason) => ({
			name: disconnectionReason.Reason,
			value: disconnectionReason.Code,
		})),
	)
	return returnData;
}

export async function getCarriers(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const carriers: CarrierType[] = await apiRequest.call(this, 'Configuration', '', 'GetCarriers', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...carriers.map((carrier) => ({
			name: carrier.Name,
			value: carrier.Code,
		})),
	)
	return returnData;
}

