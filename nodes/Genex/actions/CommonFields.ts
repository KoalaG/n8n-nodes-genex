import { INodeProperties } from "n8n-workflow";


export function CustomerNumber(METHOD: string) : INodeProperties {
	return {
		displayName: 'Customer Number',
		name: 'CustomerNumber',
		type: 'number',
		default: 0,
		required: true,
		description: 'Must be a valid Genex customer number',
		displayOptions: { show: { operation: [ METHOD ], }, },
	};
}

export function ServiceNumber(METHOD: string) : INodeProperties {
	return {
		displayName: 'Service Number',
		name: 'ServiceNumber',
		type: 'string',
		default: '',
		required: true,
		description: 'Genex service number (Service Nofield in Service Details section of Services screen) associated to the Customer. Service must exist in Genex and should not be released.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function DisconnectionDate(METHOD: string) : INodeProperties {
	return {
		displayName: 'Disconnection Date',
		name: 'DisconnectionDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'The date from which service should be disconnected. Date can be in past or future.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function SendDisconnectionRequest(METHOD: string) : INodeProperties {
	return {
		displayName: 'Send Disconnection Request',
		name: 'SendDisconnectionRequest',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether Genex should send disconnection request in provisioning file',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function DisconnectionReason(METHOD: string) : INodeProperties {
	return {
		displayName: 'Disconnection Reason Name or ID',
		name: 'DisconnectionReason',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getServiceDisconnectionReasons',
		},
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function Carrier(METHOD: string) : INodeProperties {
	return {
		displayName: 'Carrier Name or ID',
		name: 'Carrier',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCarriers',
		},
		default: '',
		required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function DeclaredDate(METHOD: string) : INodeProperties {
	return {
		displayName: 'Declared Date',
		name: 'DeclaredDate',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'The date from which service should be declared. Date can be in past or future.',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function DateProvisioned(METHOD: string) : INodeProperties {
	return {
		displayName: 'Provisioned Date',
		name: 'DateProvisioned',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'The date which the service was provisioned',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function ExtraInformation(METHOD: string) : INodeProperties {
	return {
		displayName: 'Extra Information',
		name: 'ExtraInformation',
		type: 'string',
		default: '',
		required: true,
		description: 'Value to be updated into the Extra Information field',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function SearchString(METHOD: string) : INodeProperties {
	return {
		displayName: 'Search String',
		name: 'SearchString',
		type: 'string',
		default: '',
		required: true,
		description: 'Value to search',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}

export function IncludeReleased(METHOD: string) : INodeProperties {
	return {
		displayName: 'Include Released',
		name: 'IncludeReleased',
		type: 'boolean',
		default: false,
		description: 'Whether to include released services in the search',
		displayOptions: { show: { operation: [ METHOD ], }, },
	}
}
