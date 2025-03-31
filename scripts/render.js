/**
 *
 * @param {string} target Id of the target element where the video snippet is intended to be rendered at
 * @param {string} url url of the id to be rendered
 * @returns {Boolean} if everything is finished successfully function returns true, otherwise false
 */
export const renderVideoSnippetYT = (target, url) => {
	const elem = document.getElementById(target);

	if (!elem) {
		console.error(`Element with id ${target} not found!`);
		return false;
	}

	const frameElement = document.createElement("iframe");

	try {
		frameElement.setAttribute("src", url);
		frameElement.setAttribute("title", "Movie Video from YT");
		frameElement.classList.add("w-100", "h-100");
		elem.append(frameElement);
		return true;
	} catch (e) {
		console.error(`Failed to render video snipper: ${e.message}`);
		return false;
	}
};