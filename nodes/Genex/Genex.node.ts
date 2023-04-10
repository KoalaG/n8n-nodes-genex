/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeTypeDescription, IExecuteFunctions, INodeExecutionData, NodeOperationError, IDataObject, INodeType, NodeExecutionWithMetadata } from 'n8n-workflow';
import soap from 'soap';

import * as configuration from './actions/configuration';
import * as connection from './actions/connection';
import * as customer from './actions/customer';
import * as service from './actions/service';
import { router } from './actions/router';
import * as loadOptions from './methods/loadOptions';

export class Genex implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Genex',
		name: 'genex',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Genex API',
		defaults: {
			name: 'Genex',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'genexApi',
				required: true,
			},
		],
		properties: [

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'customer',
				noDataExpression: true,
				options: [
					{ name: 'Configuration', value: 'configuration' },
					{ name: 'Connection', value: 'connection' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Service', value: 'service' },
				]
			},

			...configuration.descriptions,
			...connection.descriptions,
			...customer.descriptions,
			...service.descriptions,

		]
	}

	methods = {
		loadOptions
	};

	execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
		return router.call(this);
	}

}

export class other {

	description: INodeTypeDescription = {
		displayName: 'Genex',
		name: 'genex',
		group: ['transform'],
		version: 1,
		subtitle: 'genex',
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Genex API',
		defaults: {
			name: 'Genex',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'genexApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://genexapi.billing.com.au/',
			url: '',
			headers: {
				Accept: 'application/xml',
				'Content-Type': 'application/xml',
			},
		},

		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [

			{
				displayName: 'Collection',
				name: 'collection',
				type: 'options',
				options: [
					{ name: 'Charges', 							value: 'Charges' },
					{ name: 'Configuration', 				value: 'Configuration' },
					{ name: 'Contact Notes',				value: 'ContactNotes' },
					{ name: 'Customer Account',			value: 'CustomerAccount' },
					{ name: 'Customer Service',			value: 'CustomerService' },
					{ name: 'Customer Statements',	value: 'CustomerStatements' },
				],
				default: 'Charges',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					// Charges
					{ name: 'Add Once Off Charge',					value: 'AddOnceOffCharge', 					displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Once Off Charges', 				value: 'GetOnceOffCharges', 				displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Once Off Charge',					value: 'GetOnceOffCharge', 					displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Unbilled Charges Summary', value: 'GetUnbilledChargesSummary', displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Billed Charges Summary', 	value: 'GetBilledChargesSummary', 	displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Add Recurring Manual Charge', 	value: 'AddRecurringManualCharge', 	displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Recurring Manual Charges', value: 'GetRecurringManualCharges', displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'Get Recurring Manual Charge', 	value: 'GetRecurringManualCharge', 	displayOptions: { show: { collection: ['Charges'] } } },
					{ name: 'End Recurring Manual Charge', 	value: 'EndRecurringManualCharge', 	displayOptions: { show: { collection: ['Charges'] } } },

					// Customer Service
					{ name: 'Search Services', 							value: 'SearchServices', 						displayOptions: { show: { collection: ['CustomerService'] } } },




				],
				default: 'AddOnceOffCharge',
				noDataExpression: true,
			},

			{
				displayName: 'Parameters',
				name: 'parameters',
				type: 'collection',
				placeholder: 'Query Parameters',
				default: {},
				options: [

					{
						displayName: 'SearchString',
						name: 'SearchString',
						type: 'string',
						default: '',
						displayOptions: { show: { operation: ['SearchServices'] }, },
					},

					{
						displayName: 'Include Released',
						name: 'IncludeReleased',
						type: 'boolean',
						default: true,
						displayOptions: { show: { operation: ['IncludeReleased'] }, },
					}

				]
			},

		],

	};

	static makeCall(credentials: any, collection: any, operation: any, parameters: any) {
		return new Promise((resolve, reject) => {
			soap.createClient(`WSDL/${collection}.wsdl`, {}, function(err, client) {

				if (err) {
					reject(err);
					return;
				}

				const args = {
					user: credentials,
					...parameters
				}

				client[operation](args, function(err: any, result: any) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});
			});
		});
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		//let item: INodeExecutionData;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {

				const credentials = await this.getCredentials('genexApi');
				const collection = this.getNodeParameter('collection', itemIndex, '') as string;
				const operation = this.getNodeParameter('operation', itemIndex, '') as string;
				const parameters = this.getNodeParameter('parameters', itemIndex, {}) as IDataObject;

				const result = await other.makeCall(credentials, collection, operation, parameters);

				console.log(result);

				/*

				myString = this.getNodeParameter('myString', itemIndex, '') as string;
				item = items[itemIndex];

				item.json['myString'] = myString;*/
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return this.prepareOutputData(items);
	}
}
