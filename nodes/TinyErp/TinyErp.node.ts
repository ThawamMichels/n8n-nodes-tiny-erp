import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class TinyErp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tiny ERP',
		name: 'tinyErp',
		icon: 'file:capi_ico.PNG',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consumir API do Tiny ERP',
		defaults: {
			name: 'Tiny ERP',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'tinyErpApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Produto',
						value: 'produto',
					},
					{
						name: 'Pedido',
						value: 'pedido',
					},
					{
						name: 'Usuário',
						value: 'usuario',
					},
				],
				default: 'produto',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'produto',
						],
					},
				},
				options: [
					{
						name: 'Obter Produtos',
						value: 'getProdutos',
						description: 'Obter lista de produtos',
						action: 'Obter lista de produtos',
					},
				],
				default: 'getProdutos',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'pedido',
						],
					},
				},
				options: [
					{
						name: 'Obter Dados do Pedido',
						value: 'getPedido',
						description: 'Obter dados de um pedido específico',
						action: 'Obter dados de um pedido',
					},
				],
				default: 'getPedido',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'usuario',
						],
					},
				},
				options: [
					{
						name: 'Obter Dados do Usuário',
						value: 'getUsuario',
						description: 'Obter dados de usuário',
						action: 'Obter dados de usuário',
					},
				],
				default: 'getUsuario',
			},
			// Parâmetros para Produtos
			{
				displayName: 'Número de Páginas',
				name: 'numeroPaginas',
				type: 'number',
				default: 1,
				description: 'Número de páginas para paginação',
				displayOptions: {
					show: {
						resource: [
							'produto',
						],
						operation: [
							'getProdutos',
						],
					},
				},
			},
			// Parâmetros para Pedidos
			{
				displayName: 'Número do Pedido',
				name: 'numeroPedido',
				type: 'string',
				default: '',
				required: true,
				description: 'Número do pedido a ser consultado',
				displayOptions: {
					show: {
						resource: [
							'pedido',
						],
						operation: [
							'getPedido',
						],
					},
				},
			},
			// Parâmetros para Usuários
			{
				displayName: 'Nome do Usuário',
				name: 'nomeUsuario',
				type: 'string',
				default: '',
				description: 'Nome do usuário para filtrar',
				displayOptions: {
					show: {
						resource: [
							'usuario',
						],
						operation: [
							'getUsuario',
						],
					},
				},
			},
			{
				displayName: 'Mês de Nascimento',
				name: 'mesNascimento',
				type: 'number',
				default: 0,
				description: 'Mês de nascimento do usuário (1-12)',
				displayOptions: {
					show: {
						resource: [
							'usuario',
						],
						operation: [
							'getUsuario',
						],
					},
				},
			},
			{
				displayName: 'CPF',
				name: 'cpf',
				type: 'string',
				default: '',
				description: 'CPF do usuário',
				displayOptions: {
					show: {
						resource: [
							'usuario',
						],
						operation: [
							'getUsuario',
						],
					},
				},
			},
			{
				displayName: 'Obter Todos',
				name: 'obterTodos',
				type: 'boolean',
				default: false,
				description: 'Se deve retornar todos os usuários',
				displayOptions: {
					show: {
						resource: [
							'usuario',
						],
						operation: [
							'getUsuario',
						],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('tinyErpApi') as { token: string };

		// Implementação básica das chamadas à API
		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'produto' && operation === 'getProdutos') {
					const numeroPaginas = this.getNodeParameter('numeroPaginas', i) as number;
					// TODO: Implementar chamada à API do Tiny ERP para produtos
					returnData.push({ json: { success: true, message: 'Obtendo produtos', paginas: numeroPaginas } });
				}
				else if (resource === 'pedido' && operation === 'getPedido') {
					const numeroPedido = this.getNodeParameter('numeroPedido', i) as string;
					// TODO: Implementar chamada à API do Tiny ERP para pedidos
					returnData.push({ json: { success: true, message: 'Obtendo pedido', numero: numeroPedido } });
				}
				else if (resource === 'usuario' && operation === 'getUsuario') {
					const nomeUsuario = this.getNodeParameter('nomeUsuario', i) as string;
					const mesNascimento = this.getNodeParameter('mesNascimento', i) as number;
					const cpf = this.getNodeParameter('cpf', i) as string;
					const obterTodos = this.getNodeParameter('obterTodos', i) as boolean;
					// TODO: Implementar chamada à API do Tiny ERP para usuários
					returnData.push({ json: { success: true, message: 'Obtendo usuário', filtros: { nome: nomeUsuario, mes: mesNascimento, cpf, todos: obterTodos } } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 
