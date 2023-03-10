import * as methods from './methods';
import type { INodeProperties } from 'n8n-workflow';

export { methods };

export const descriptions: INodeProperties[] = [

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: { resource: ['configuration'] },
		},

		options: [
			methods.GetCustomerTypes.option,
			methods.GetCycles.option,
			methods.GetGroups.option,
			methods.GetRatePlans.option,
			methods.GetAccountStatuses.option,
			methods.GetAddressTypes.option,
			methods.GetStreetTypes.option,
			methods.GetStreetTypeSuffixes.option,
			methods.GetStateTypes.option,
			methods.GetCountryTypes.option,
			methods.GetAuthorisationTypes.option,
			methods.GetCreditCardAuthorityTypes.option,
			methods.GetCreditCardTypes.option,
			methods.GetDirectDebitMethods.option,
			methods.GetDirectDebitProcessOptions.option,
			methods.GetFlagLabels.option,
			methods.GetCarriers.option,
			methods.GetProvisioningStatuses.option,
			methods.GetUsageTypes.option,
			methods.GetTransactionTypes.option,
			methods.GetChargeTypes.option,
			methods.GetOnceOffChargeTariffs.option,
			methods.GetGenexUsers.option,
			methods.GetContactNoteTypes.option,
			methods.GetContactNoteStatuses.option,
			methods.GetRecurringChargeTariffs.option,
			methods.GetServiceDisconnectionReasons.option,
		],

		default: '',
	},

	...methods.GetCustomerTypes.properties,
	...methods.GetCycles.properties,
	...methods.GetGroups.properties,
	...methods.GetRatePlans.properties,
	...methods.GetAccountStatuses.properties,
	...methods.GetAddressTypes.properties,
	...methods.GetStreetTypes.properties,
	...methods.GetStreetTypeSuffixes.properties,
	...methods.GetStateTypes.properties,
	...methods.GetCountryTypes.properties,
	...methods.GetAuthorisationTypes.properties,
	...methods.GetCreditCardAuthorityTypes.properties,
	...methods.GetCreditCardTypes.properties,
	...methods.GetDirectDebitMethods.properties,
	...methods.GetDirectDebitProcessOptions.properties,
	...methods.GetFlagLabels.properties,
	...methods.GetCarriers.properties,
	...methods.GetProvisioningStatuses.properties,
	...methods.GetUsageTypes.properties,
	...methods.GetTransactionTypes.properties,
	...methods.GetChargeTypes.properties,
	...methods.GetOnceOffChargeTariffs.properties,
	...methods.GetGenexUsers.properties,
	...methods.GetContactNoteTypes.properties,
	...methods.GetContactNoteStatuses.properties,
	...methods.GetRecurringChargeTariffs.properties,
	...methods.GetServiceDisconnectionReasons.properties,

];
