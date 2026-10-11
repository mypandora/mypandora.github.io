import { BarChart3, MonitorPlay, TextCursorInput, MessageSquare, Calculator, LayoutTemplate } from '@lucide/svelte';

/**
 * @typedef {Object} Feature
 * @property {string} title
 * @property {string} description
 * @property {import('svelte').Component} icon
 */

/**
 * 能力特性(占位文案,可替换)
 * @type {Feature[]}
 */
export const features = [
	{
		title: '轻量报表',
		description: '基于 Canvas 的轻量级报表,无需重型依赖即可呈现数据表格。',
		icon: BarChart3
	},
	{
		title: '大屏设计器',
		description: '基于 Vue 与 ECharts 的可视化大屏设计器,拖拽搭建数据看板。',
		icon: MonitorPlay
	},
	{
		title: '表单设计器',
		description: '可视化表单设计,快速生成与收集结构化数据。',
		icon: TextCursorInput
	},
	{
		title: '聊天组件',
		description: '基于原生 JavaScript 的聊天组件,框架无关、易于嵌入。',
		icon: MessageSquare
	},
	{
		title: '计算器组件',
		description: '原生 JavaScript 计算器组件,开箱即用、样式可定制。',
		icon: Calculator
	},
	{
		title: '布局组件',
		description: '基于 Vue2 与 Element UI 的布局组件,快速搭建后台页面。',
		icon: LayoutTemplate
	}
];
