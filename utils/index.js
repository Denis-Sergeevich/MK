const randomDamage = (num) => Math.ceil(Math.random() * num);

const createElement = (tag, className) => {
	
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
		
	return $tag;

}


const showTime = () => {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
}

export { randomDamage,
		showTime,
		createElement,
        };