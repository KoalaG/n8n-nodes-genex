import type { IExecuteFunctions } from 'n8n-core';

import type { IDataObject, INodeExecutionData } from 'n8n-workflow';

import * as configuration from './configuration';
//import * as connection from './connection';
import * as customer from './customer';
//import * as note from './note';
import * as service from './service';
//import * as statement from './statement';
import * as transaction from './transaction';

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
			if (genex.resource === 'configuration') {
				responseData = await configuration.methods[genex.operation].execute.call(this, i);
			} else

			//if (genex.resource === 'connection') {
			//	responseData = await connection.methods[genex.operation].execute.call(this, i);
			//} else

			if (genex.resource === 'customer') {
				responseData = await customer[genex.operation].execute.call(this, i);
			} else

			//if (genex.resource === 'note') {
				//responseData = await note.methods[genex.operation].execute.call(this, i);
			//} else

			//if (genex.resource === 'statement') {
				//responseData = await statement.methods[genex.operation].execute.call(this, i);
			//} else

			if (genex.resource === 'service') {
				responseData = await service.methods[genex.operation].execute.call(this, i);
			} else

			if (genex.resource === 'transaction') {
				responseData = await transaction.methods[genex.operation].execute.call(this, i);
			} else {
				throw new Error('Invalid Resource');
			};

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
