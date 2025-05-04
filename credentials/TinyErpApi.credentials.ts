import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TinyErpApi implements ICredentialType {
	name = 'tinyErpApi';
	displayName = 'Tiny ERP API';
	documentationUrl = 'https://api.tiny.com.br/manual';
	properties: INodeProperties[] = [
		{
			displayName: 'Token de Acesso',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Token de acesso da API do Tiny ERP',
		},
	];
} 