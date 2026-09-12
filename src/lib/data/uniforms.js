export const CATEGORIES = [
	{ key: 'primary', letter: 'A', name: '小学', description: '小学校服方案' },
	{ key: 'junior', letter: 'B', name: '初中', description: '初中校服方案' },
	{ key: 'senior', letter: 'C', name: '高中（中职）', description: '高中校服方案' }
];

/**
 * @param {{ key: string, letter: string }} category
 */
function buildSchools(category) {
	return Array.from({ length: 15 }, (_, i) => {
		const code = `${category.letter}${i + 1}`;
		return {
			code,
			category: category.key,
			images: [1, 2, 3, 4].map((n) => `/assets/uniform/${category.key}/${code}/${n}.webp`)
		};
	});
}

export const UNIFORMS = CATEGORIES.map((category) => ({
	...category,
	schools: buildSchools(category)
}));