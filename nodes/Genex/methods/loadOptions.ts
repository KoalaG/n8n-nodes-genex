import { ILoadOptionsFunctions } from "n8n-core";
import { INodePropertyOptions } from "n8n-workflow";
import { AddressTypeType, CarrierType, CountryType, ServiceDisconnectionReasonsType, StateTypeType, StreetTypeSuffixType, StreetTypeType } from "../actions/Interfaces";
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

export async function getAddressTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const addressTypes: AddressTypeType[] = await apiRequest.call(this, 'Configuration', '', 'GetAddressTypes', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...addressTypes.map((addressType) => ({
			name: addressType.Description + ' (' + addressType.Type + ')',
			value: addressType.Code,
		})),
	)
	return returnData;
}

// GetStreetTypes
export async function getStreetTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const types: StreetTypeType[] = await apiRequest.call(this, 'Configuration', '', 'GetStreetTypes', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...types.map((type) => ({
			name: type.Description,
			value: type.Type,
		})),
	)
	return returnData;
}

export async function getCountryTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const types: CountryType[] = await apiRequest.call(this, 'Configuration', '', 'GetCountryTypes', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...types.map((type) => ({
			name: type.CountryName,
			value: type.CountryId,
		})),
	)
	return returnData;
}

// GetStreetTypeSuffixes
export async function getStreetTypeSuffixes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const suffixes: StreetTypeSuffixType[] = await apiRequest.call(this, 'Configuration', '', 'GetStreetTypeSuffixes', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...suffixes.map((suffix) => ({
			name: suffix.Description + ' (' + suffix.Suffix + ')',
			value: suffix.Suffix,
		})),
	)
	return returnData;
}

// GetStateTypes
export async function getStateTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const stateTypes: StateTypeType[] = await apiRequest.call(this, 'Configuration', '', 'GetStateTypes', {});
	returnData.push({ name: '[Empty]', value: '' });
	returnData.push(
		...stateTypes.map((stateType) => ({
			name: stateType.CountryId + ' (' + stateType.StateName + ')',
			value: stateType.State,
		})),
	)
	return returnData;
}
