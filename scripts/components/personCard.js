import { MAX_NAME_LENGTH } from "../config/enums.js";
import { getImage } from "../utilities/api.js";

export const createPersonCard = (actorData) => {
	let { original_name, profile_path } = actorData;
    if(original_name.trim().length > MAX_NAME_LENGTH) original_name = original_name.slice(0, MAX_NAME_LENGTH) + '...';

	const actorImage = profile_path ? getImage(profile_path, 185) : './assets/user-placeholder.jpg';
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('movie-details-person-card');
	cardContainer.innerHTML = `                           
        <div class="actor-card-image">
            <img src=${actorImage} alt="Actor image">
        </div>
        <span>${original_name}</span>
    `;
    return cardContainer;
};

export default createPersonCard;