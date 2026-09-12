/** Dispatch event on click outside of node */
/** @param {Element} node */
export function clickOutside(node) {
	/** @param {MouseEvent} event */
	const handleClick = (event) => {
		if (node && event.target instanceof Node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
