const methods = require('./methods');
import type { INodeProperties } from 'n8n-workflow';

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
			...Object.keys(methods).map((key) => methods[key].description),
			{
				name: 'Get Address Types',
				value: 'GetAddressTypes',
				description:
					'Returns a list of address types (ex. PO Box, Level, Unit etc.) configured in Genex. This refers to the Address Type field in Contact Address section of Customer Screen & Service Address section of Services screen.',
				action: 'Get address types',
			},
			{
				name: 'Get Authorisation Types',
				value: 'GetAuthorisationTypes',
				description:
					'Returns a list of authorisation types (ex. Drivers license, passport number etc.) configured in Genex. This refers to the Authorisation Type field in the Account Authorisation section on Customer Screen.',
				action: 'Get authorisation types',
			},
			{
				name: 'Get Carriers',
				value: 'GetCarriers',
				description:
					'Returns a list of carriers configured in Genex. This refers to the carriers configured in connections list on Services screen in Genex.',
				action: 'Get carriers',
			},
			{
				name: 'Get Charge Types',
				value: 'GetChargeTypes',
				description:
					'Returns a list of invoice/charge headings configured in Genex. This refers to the invoice headings that are displayed on 1st page of a statement.',
				action: 'Get charge types',
			},
			{
				name: 'Get Contact Note Statuses',
				value: 'GetContactNoteStatuses',
				description:
					'Returns a list of contact note statuses configured in Genex. This is same list as displayed on the Contact Notes screen in Genex.',
				action: 'Get contact note statuses',
			},
			{
				name: 'Get Contact Note Types',
				value: 'GetContactNoteTypes',
				description:
					'Returns a list of contact note types configured in Genex. This is same list as displayed on the Contact Notes screen in Genex.',
				action: 'Get contact note types',
			},
			{
				name: 'Get Country Types',
				value: 'GetCountryTypes',
				description:
					'Returns a list of Countries configured in Genex. This refers to the Country field in Contact Address section of Customer Screen & Service Address section of Services screen.',
				action: 'Get country types',
			},
			{
				name: 'Get Credit Card Authority Types',
				value: 'GetCreditCardAuthorityTypes',
				description:
					'Returns a list of Credit Card authority types configured in Genex. This refers to “Credit Card Authority” field in Payment Options section of Customer Screen. Generally this field is not used unless specifically required by your Credit Card Merchant facility provider.',
				action: 'Get credit card authority types',
			},
			{
				name: 'Get Credit Card Types',
				value: 'GetCreditCardTypes',
				description:
					'Returns a list of Credit Card types configured in Genex. This refers to “Credit Card Type” field in Payment Options section of Customer Screen.',
				action: 'Get credit card types',
			},
			{
				name: 'Get Customer Types',
				value: 'GetCustomerTypes',
				description:
					'Returns a list of Customer Type (ex. Business, SME, Residential etc.) configured in Genex. This refers to “Customer Type” field in Customer Details section of Customer Screen.',
				action: 'Get customer types',
			},
			{
				name: 'Get Cycles',
				value: 'GetCycles',
				description:
					'Returns a list of billing cycles configured in Genex. This refers to “Cycle” field in Customer Details section of Customer Screen.',
				action: 'Get cycles',
			},
			{
				name: 'Get Direct Debit Methods',
				value: 'GetDirectDebitMethods',
				description:
					'Returns a list of payment methods configured in Genex. This refers to “Payment Method” field in Payment Options section of Customer Screen. Though the method name refers to Direct Debit, the list includes all payment methods configured in your Genex database including options such as BPay, EFT etc.',
				action: 'Get direct debit methods',
			},
			{
				name: 'Get Direct Debit Process Options',
				value: 'GetDirectDebitProcessOptions',
				description:
					'Returns a list of direct debit process options configured in Genex. Usually value in this field is only On/Off. Functionality related to this field has to be configured separately. This refers to “Direct Debit Process Option” field in Payment Options section of Customer Screen.',
				action: 'Get direct debit process options',
			},
			{
				name: 'Get Flag Labels',
				value: 'GetFlagLabels',
				description:
					'Returns a list of flag labels configured for your Genex database instance. This refers to all the flags (check boxes) listed in the Customer Flags section of Customer Screen.',
				action: 'Get flag labels',
			},
			{
				name: 'Get Genex Users',
				value: 'GetGenexUsers',
				description:
					'Returns a list of currently active Genex users. This list is used when adding a new contact note for selecting User Added and/or User to Action.',
				action: 'Get genex users',
			},
			{
				name: 'Get Groups',
				value: 'GetGroups',
				description:
					'Returns a list of groups (brands) configured in Genex. This refers to “Group” field in Customer Details section of Customer Screen.',
				action: 'Get groups',
			},
			{
				name: 'Get Once Off Charge Tariffs',
				value: 'GetOnceOffChargeTariffs',
				description:
					'Returns a list of tariffs configured, for once off manual charge, in Genex. This is the same list of tariffs you can add through the Manual Charges screen in Genex.',
				action: 'Get once off charge tariffs',
			},
			{
				name: 'Get Provisioning Statuses',
				value: 'GetProvisioningStatuses',
				description:
					'Returns a list of provisioning status (across all carriers) configured for your Genex database instance. This refers to the “Connection Status” field in Connection Details section of Services Screen.',
				action: 'Get provisioning statuses',
			},
			{
				name: 'Get Rate Plans',
				value: 'GetRatePlans',
				description:
					'Returns a list of active rate plans configured in Genex. This refers to “Rate Plan” field in Customer Details section of Customer Screen & “Service Rate Plan” field in Service Details section of Services screen.',
				action: 'Get rate plans',
			},
			{
				name: 'Get State Types',
				value: 'GetStateTypes',
				description:
					'Returns a list of States configured in Genex. This refers to the State field in Contact Address section of Customer Screen & Service Address section of Services screen.',
				action: 'Get state types',
			},
			{
				name: 'Get Street Type Suffixes',
				value: 'GetStreetTypeSuffixes',
				description:
					'Returns a list of Street Type Suffixes (ex. West, North and Lower etc.) configured in Genex. This refers to the “Street Type Suffix” field in Contact Address section of Customer Screen & Service Address section of Services screen.',
				action: 'Get street type suffixes',
			},
			{
				name: 'Get Street Types',
				value: 'GetStreetTypes',
				description:
					'Returns a list of Street Types (ex. Road, Street, Highway, and Boulevard etc.) configured in Genex. This refers to the “Street Type” field in Contact Address section of Customer Screen & Service Address section of Services screen.',
				action: 'Get street types',
			},
			{
				name: 'Get Transaction Types',
				value: 'GetTransactionTypes',
				description:
					'Returns a list of transaction types (ex. Misc Debit, Misc Credit, Adjustment, and Write-off etc.) configured for your Genex database instance. This refers to the “Transaction Type” field on the Transactions Screen.',
				action: 'Get transaction types',
			},
			{
				name: 'Get Usage Types',
				value: 'GetUsageTypes',
				description:
					'Returns a list of service usage types configured for your Genex database instance. This refers to the “Usage Type” field in Service Details section of Services Screen.',
				action: 'Get usage types',
			},
		],

		default: 'GetAccountStatuses',
	},

];
