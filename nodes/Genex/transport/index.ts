import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-core';
import * as parseFunctions from './parseFunctions';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import {
	IDataObject,
	//IHttpRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

import * as xmljs from 'xml-js';
import { GenexAPIResponse, GenexResultType } from './interfaces';

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

	const options: AxiosRequestConfig = {
		method: 'post',
		data: soapXML,
		url: `${credentials.baseUrl}/${endpoint}${subEndpoint}.asmx`,
		headers: {
			'SOAPAction': `http://genexapi.billing.com.au/${endpoint}/${method}`,
			'Content-Type': 'text/xml; charset=utf-8',
		}
	};

	let response: AxiosResponse = null as unknown as AxiosResponse;
	let jsData: GenexAPIResponse = null;

	try {

		// make request using axios
		console.log("Calling Axios", options);
		response = await Axios.request(options);
		console.log("Response", response);

		//rawData = await	this.helpers.httpRequest.call(this, options);
		jsData = xmljs.xml2js(response.data, {compact: true}) as GenexAPIResponse;

		if (!jsData) {
			throw new Error('No response data');
		}

		// Throw Validation Error
		if (
			jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ResponseStatusCode']['_text'] == '204'
		) {
			const validationResponseData = jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ValidationResponseData'];
			if (validationResponseData) {
				throw new NodeApiError(
					this.getNode(),
					{
						validationErrors: validationResponseData['ValidationResponse'].map(
							(vr) => ({ Field: vr['Key']['_text'], Message: vr['Message']['_text']})
						),
						parameters: parameters,
						XML: xmljs.js2xml(parameters, {compact: true, spaces: 4})
					},
					{
						message: 'Validation Error'
					}
				);
			}
		}

		// Make sure response status is OK
		if (jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ResponseStatusCode']['_text'] != '200') {
			throw new NodeApiError(
				this.getNode(),
				{
					...jsData['soap:Envelope']['soap:Body'],
					parameters: parameters,
					XML: xmljs.js2xml(parameters, {compact: true, spaces: 4})
				},
				{
					message: jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`]['ResponseStatusDescription']['_text'],
				}
			);
		}

		const methodResult = jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`];

		// Attempt to parse response type if given
		const responseType = Object.keys(methodResult)
			.filter(key => key !== 'ResponseStatusCode')
			.filter(key => key !== 'ResponseStatusDescription')[0] as keyof GenexResultType;

		if (responseType) {
			const fnName = `parse${responseType}`;
			if ((parseFunctions as any)[fnName]) {
				return (parseFunctions as any)[fnName](methodResult[responseType]) as IDataObject | IDataObject[];
			} else {
				throw new Error(`No parse function found for ${responseType}`);
			}
		} else {
			return {
				ResponseStatusCode: methodResult.ResponseStatusCode._text,
				ResponseStatusDescription: methodResult.ResponseStatusDescription._text,
				Input: parameters
			}
		}

	} catch (err) {

		if (err.isAxiosError) {

			if (err.response.status == 500) {
				const jsData = xmljs.xml2js(err.response.data, {compact: true}) as any;
				console.log(jsData['soap:Envelope']['soap:Body']['soap:Fault']);
				const soapErr: any = new NodeApiError(
					this.getNode(),
					{
						...jsData['soap:Envelope']['soap:Body']['soap:Fault'],
						parameters: parameters,
						XML: xmljs.js2xml(parameters, {compact: true, spaces: 4})
					},
					{
						message: jsData['soap:Envelope']['soap:Body']['soap:Fault']['faultstring']['_text'],
						description: jsData['soap:Envelope']['soap:Body']['soap:Fault']['detail']['_text'],
					}
				);
				throw soapErr;
			}

			console.log(err.toJSON())
			throw err;

		}


		console.log('DEBUG: SOAP REQUEST:', soapXML);
		console.log('DEBUG: SOAP RESPONSE:', response);
		console.log('DEBUG: JSON RESPONSE:', jsData);
		console.log('DEBUG: JSON SOAP BODY', jsData ? jsData['soap:Envelope']['soap:Body'] : null);
		console.log('DEBUG: JSON METHOD RESULT', jsData ? jsData['soap:Envelope']['soap:Body'][`${method}Response`][`${method}Result`] : null);
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
