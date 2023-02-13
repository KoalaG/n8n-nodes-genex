import * as SearchServices from './SearchServices';
import type { INodeProperties } from 'n8n-workflow';

export { SearchServices };

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

			{
				name: 'Search',
				value: 'SearchServices',
				description: 'Search for a service',
				action: 'Search for a service',
			},

		],

		default: 'SearchServices',

	},

	...SearchServices.description,
];
