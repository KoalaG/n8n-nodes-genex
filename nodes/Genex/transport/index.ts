import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';

import type {
	IHttpRequestOptions,
} from 'n8n-workflow';

import * as xmljs from 'xml-js';

/**
 * Make an API request to Mattermost
 */
export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	subEndpoint: string,
	method: string,
	parameters: {},
) {

	const credentials = await this.getCredentials('genexApi');

	const soapJS = {
		'soap:Envelope'	: {
			'_attributes'			: {
				'xmlns:soap'	: 'http://schemas.xmlsoap.org/soap/envelope/',
			},
			'soap:Body'		: {
				'GetCustomerDetails'	: {
					'_attributes': {
						'xmlns'	: `http://genexapi.billing.com.au/${endpoint}`,
					},
					'user'		: {
						'Username'	: credentials.username,
						'Password'	: credentials.password,
						'DBAlias'		: credentials.database,
					},
					...parameters,
				}
			}
		}
	};

	const soapXML = xmljs.js2xml(soapJS, {compact: true, spaces: 4});

	const options: IHttpRequestOptions = {
		method: 'POST',
		body: soapXML,
		url: `${credentials.baseUrl}/${endpoint}${subEndpoint}.asmx`,
		headers: {
			'SOAPAction': `http://genexapi.billing.com.au/${endpoint}/${method}`,
			'Content-Type': 'text/xml; charset=utf-8',
		},
	};

	const data = await this.helpers.httpRequest.call(this, options);
	return xmljs.xml2js(data, {compact: true});

}
