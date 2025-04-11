import { getImage } from "../utilities/api.js";

export const createActorCard = (actorData) => {
	let { original_name, profile_path } = actorData;
    if(original_name.length > 10) original_name = original_name.slice(0, 11) + '...';

	const actorImage = profile_path ? getImage(profile_path, 185) : './assets/user-placeholder.jpg';
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('movie-details-actor-card');
	cardContainer.innerHTML = `                           
        <div class="movie-details-actor-card">
            <div class="actor-card-image">
                <img src=${actorImage} alt="Actor image">
            </div>
            <span>${original_name}</span>
        </div>
    `;
    return cardContainer;
};

export default createActorCard;