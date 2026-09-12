/**
 * @param {string} path
 */
export const external = (path) => path.startsWith('http');

/** @typedef {{ name: string, description: string, link: string, stack: string }} Project */

/** @type {Project[]} */
export const components = [
	{
		name: '@mypandora/chat',
		description: '一个基于 Vanilla JavaScript 的聊天组件。',
		link: 'https://github.com/mypandora/chat',
		stack: 'JavaScript'
	},
	{
		name: '@mypandora/calculator',
		description: '一个基于 Vanilla JavaScript 的计算器组件。',
		link: 'https://github.com/mypandora/calculator',
		stack: 'JavaScript'
	},
	{
		name: '@mypandora/spreadsheet',
		description: '一个基于 canvas 的轻量级报表。',
		link: 'https://github.com/mypandora/spreadsheet',
		stack: 'JavaScript'
	},
	{
		name: '@mypandora/element-layout',
		description: '一个基于 Vue2, element-ui 的布局组件。',
		link: 'https://github.com/mypandora/element-layout',
		stack: 'Vue.js, ElementUI'
	},
	{
		name: '@mypandora/element-datepicker',
		description: '一个基于 Vue2, element-ui 的季度选择器组件。',
		link: 'https://github.com/mypandora/element-datepicker',
		stack: 'Vue.js, ElementUI'
	},
	{
		name: '@mypandora/element-select',
		description: '一个基于 Vue2, element-ui 的下拉框单选按钮组件。',
		link: 'https://github.com/mypandora/element-select',
		stack: 'Vue.js, ElementUI'
	}
];

/** @type {Project[]} */
export const products = [
	{
		name: '社保选择助手',
		description: '一个方便的社保医院选择助手。',
		link: 'https://myhospital.mypandora.cn/',
		stack: 'Nestjs, Svelte'
	},
	{
		name: '@mypandora/datav',
		description: '一个基于 Vue 的大屏设计器。',
		link: 'https://github.com/mypandora/datav',
		stack: 'Vue.js, ElementUI, Echarts'
	},
	{
		name: '@mypandora/form-designer',
		description: '一个基于 Vue 的表单设计器。',
		link: 'https://github.com/mypandora/form-designer',
		stack: 'JavaScript, Vue.js'
	}
];

/** @type {Project[]} */
export const templates = [
	{
		name: '模板示例',
		description: '支持 PC、移动端，且支持暗黑模式的模板示例。',
		link: '/showcase',
		stack: 'SvelteKit'
	}
];
