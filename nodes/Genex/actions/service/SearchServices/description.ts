import type { ServiceProperties } from '../../Interfaces';

export const SearchServicesDescription: ServiceProperties = [

	{
		displayName: 'Search String',
		name: 'SearchString',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [ 'SearchServices' ],
			},
		},
		default: ''
	},

	{
		displayName: 'Include Released',
		name: 'IncludeReleased',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: [ 'SearchServices' ],
			},
		},
		default: false
	}

];
