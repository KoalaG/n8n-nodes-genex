import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';
import * as parseFunctions from './parseFunctions'

import type {
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

import * as xmljs from 'xml-js';
import { APIResponse } from '../actions/Interfaces';

/**
 * Make an API request to Mattermost
 */
export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	subEndpoint: string,
	method: string,
	parameters: {}
) : Promise<IDataObject | IDataObject[] | any>
{

	const credentials = await this.getCredentials('genexApi');

	const soapJS = {
		'soap:Envelope'	: {
			'_attributes'			: {
				'xmlns:soap'	: 'http://schemas.xmlsoap.org/soap/envelope/',
			},
			'soap:Body'		: {
				[method]	: {
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
		}
	};

	let rawData: any = null;
	let jsData: any = null;

	try {

		rawData = await this.helpers.httpRequest.call(this, options);
		jsData = xmljs.xml2js(rawData, {compact: true}) as APIResponse;

		// Make sure response status is OK
		if (jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ResponseStatusCode']['_text'] !== '200') {
			throw new Error(jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ResponseStatusDescription']['_text']);
		}

		// Attempt to parse response type if given
		const responseType = Object.keys(jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`])
			.filter(key => key !== 'ResponseStatusCode')
			.filter(key => key !== 'ResponseStatusDescription')[0];

		if (responseType) {
			const fnName = `parse${responseType}`;
			if ((parseFunctions as any)[fnName]) {
				return (parseFunctions as any)[fnName](jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`][responseType]) as IDataObject | IDataObject[];
			} else {
				throw new Error(`No parse function found for ${responseType}`);
			}
		} else {
			return {}
		}

	} catch (err) {
		console.log('DEBUG: SOAP REQUEST:', soapXML);
		console.log('DEBUG: SOAP RESPONSE:', rawData);
		console.log('DEBUG: JSON RESPONSE:', jsData);
		console.log('DEBUG: JSON SOAP BODY', jsData['soap:Envelope']['soap:Body']);
		console.log('DEBUG: JSON METHOD RESULT', jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]);
		console.log(err);
		throw err;
	}
}

export function parseServiceList(...data: any) {
	return data[0] as IDataObject | IDataObject[];
}
export function parseCustomerList(...data: any) {
	return data[0] as IDataObject | IDataObject[];
}
export function parseSystemReference(...data: any) {
	return data[0] as IDataObject | IDataObject[];
}
