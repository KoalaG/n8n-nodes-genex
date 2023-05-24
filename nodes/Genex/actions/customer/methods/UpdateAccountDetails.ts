
import type { IExecuteFunctions } from 'n8n-core';
import type { INodeExecutionData, INodePropertyOptions } from 'n8n-workflow';
import * as transport from '../../../transport';

import type { CustomerProperties } from '../../Interfaces';
import { CustomerNumber } from '../../CommonFields';

const ENDPOINT = 'Customer';
const SUBENDPOINT = 'Service';
const METHOD = 'UpdateAccountDetails';

export const operation: INodePropertyOptions = {
	name: 'Update Account Details',
	value: METHOD,
	action: 'Update Account Details',
};

export const properties: CustomerProperties = [
	CustomerNumber(METHOD),
	{
		displayName: 'Notes',
		name: 'Notes',
		type: 'string',
		default: '',
		typeOptions: {
			rows: 5,
		},
		description: 'General notes on customer account',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Contract Start Date',
		name: 'ContractStartDate',
		type: 'dateTime',
		default: null,
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Contract Term',
		name: 'ContractTerm',
		type: 'number',
		default: null,
		description: 'Contract Term period in months',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Account Status',
		name: 'AccountStatus',
		type: 'string',
		default: '',
		description: 'Mapping defined in AccountStatus data structure',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Credit Category',
		name: 'CreditCategory',
		type: 'string',
		default: '',
		description: 'Please request the list from your Account Manager, after configuring the credit categories as per business requirements',
		displayOptions: { show: { operation: [ METHOD ], }, },
	},
	{
		displayName: 'Ceiling Amount',
		name: 'CeilingAmount',
		type: 'number',
		default: null,
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const Notes = this.getNodeParameter('Notes', index);
	const ContractStartDate = this.getNodeParameter('ContractStartDate', index)?.toLocaleString().substring(0, 10);
	const ContractTerm = this.getNodeParameter('ContractTerm', index);
	const AccountStatus = this.getNodeParameter('AccountStatus', index);
	const CreditCategory = this.getNodeParameter('CreditCategory', index);
	const CeilingAmount = this.getNodeParameter('CeilingAmount', index);

	const data = {
		CustomerNumber: this.getNodeParameter('CustomerNumber', index),
		CustomerAccountDetail: {} as any,
	};

	if (Notes) {
		data.CustomerAccountDetail.Notes = Notes;
	}

	if (ContractStartDate) {
		data.CustomerAccountDetail.ContractStartDate = ContractStartDate;
	}

	if (ContractTerm || ContractTerm === 0) {
		data.CustomerAccountDetail.ContractTerm = ContractTerm;
	}

	if (AccountStatus) {
		data.CustomerAccountDetail.AccountStatus = AccountStatus;
	}

	if (CreditCategory) {
		data.CustomerAccountDetail.CreditCategory = CreditCategory;
	}

	if (CeilingAmount || CeilingAmount === 0) {
		data.CustomerAccountDetail.CeilingAmount = CeilingAmount;
	}

	const responseData = await transport.apiRequest.call(
		this, ENDPOINT, SUBENDPOINT, METHOD, data
	);

	return this.helpers.returnJsonArray(responseData);

}
