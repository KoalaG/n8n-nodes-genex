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
			show: { resource: [ 'service' ], },
		},
		options: [

			methods.SearchServices.operation,
			methods.GetCustomerServices.operation,
			methods.UpdateServiceRatePlan.operation,
			methods.ReleaseService.operation,
			methods.DisconnectServiceWithDisconnectionReason.operation,
			//methods.DisconnectService.operation,
			//methods.ReconnectService.operation,
			//methods.ReleaseServiceWithDisconnectionReason.operation,
			//methods.SetServiceDeclaredDate.operation,
			//methods.UpdateServiceAddress.operation,
			//methods.UpdateServiceContract.operation,
			//methods.UpdateServiceDepartment.operation,
			//methods.UpdateServiceDivision.operation,
			methods.UpdateServiceExternalReference.operation,
			methods.UpdateServiceExtraInformation.operation,
			methods.UpdateServiceName.operation,

		],

		default: '',

	},

	...methods.SearchServices.properties,
	...methods.GetCustomerServices.properties,
	...methods.UpdateServiceRatePlan.properties,
	...methods.ReleaseService.properties,
	...methods.DisconnectServiceWithDisconnectionReason.properties,
	//...methods.DisconnectService.properties,
	//...methods.ReconnectService.properties,
	//...methods.ReleaseServiceWithDisconnectionReason.properties,
	//...methods.SetServiceDeclaredDate.properties,
	//...methods.UpdateServiceAddress.properties,
	//...methods.UpdateServiceContract.properties,
	//...methods.UpdateServiceDepartment.properties,
	//...methods.UpdateServiceDivision.properties,
	...methods.UpdateServiceExternalReference.properties,
	...methods.UpdateServiceExtraInformation.properties,
	...methods.UpdateServiceName.properties,

];
