import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

//import * as Charges from './Charges';
//import * as Configuration from './Configuration';
//import * as ContactNotes from './ContactNotes';
//import * as CustomerAccount from './CustomerAccount';
import * as customer from './customer';
//import * as CustomerStatements from './CustomerStatements';
import type { Genex } from './Interfaces';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<Genex>('resource', i);
		let operation = this.getNodeParameter('operation', i);
		if (operation === 'del') {
			operation = 'delete';
		} else if (operation === 'desactive') {
			operation = 'deactive';
		}

		const genex = {
			resource,
			operation,
		} as Genex;

		try {
			if (genex.resource === 'customer') {
				responseData = await customer[genex.operation].execute.call(this, i);
			} /*else if (genex.resource === 'message') {
				responseData = await CustomerService[genex.operation].execute.call(this, i);
			} else if (genex.resource === 'reaction') {
				responseData = await CustomerService[genex.operation].execute.call(this, i);
			} else if (genex.resource === 'user') {
				responseData = await CustomerService[genex.operation].execute.call(this, i);
			}*/

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [operationResult];
}
