
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { TransactionProperties } from '../../Interfaces';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'AddTransaction';

export const operation: INodePropertyOptions = {
	name: 'Add Transaction',
	value: METHOD,
	description:
		'Send a new transaction to backend',
	action: 'Add transaction',
}

export const properties: TransactionProperties = [
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
		displayName: 'Transaction Date',
		name: 'TransactionDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'Date of transaction',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Credit Card Type',
		name: 'CreditCardType',
		type: 'string',
		default: '',
		description: 'Mapping defined in CreditCard Typedata structure.If Payment Method is Credit Card, then this field is mandatory',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Transaction Type',
		name: 'TransactionType',
		type: 'string',
		default: '',
		required: true,
		description: 'Mapping defined in Transaction Typedata structure',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Payment Method',
		name: 'PaymentMethod',
		type: 'string',
		default: '',
		description: 'Mapping defined in DirectDebit Methoddata structure',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Description',
		name: 'Description',
		type: 'string',
		default: '',
		description: 'Description of transaction',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Reference Number',
		name: 'ReferenceNumber',
		type: 'string',
		default: '',
		description: 'Reference number of transaction',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Transaction Amount',
		name: 'TransactionAmount',
		type: 'number',
		default: 0,
		description: 'Value in this field should be negative for Payments and Miscellaneous Credits.For all transaction types, amount will be inserted as populated in this field',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Statement Applied',
		name: 'StatementApplied',
		type: 'number',
		default: 0,
		description: 'Statement transaction is applied to',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}

];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const responseData = await transport.apiRequest.call(this, ENDPOINT, SUBENDPOINT, METHOD, {
		transaction: {
			CustomerNumber: this.getNodeParameter('CustomerNumber', index),

		}
	});

	return this.helpers.returnJsonArray(responseData);

}
