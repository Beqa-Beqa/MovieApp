import { getImage } from "../utilities/utilities.js";

export const createActorCard = (actorData) => {
	const { original_name, profile_path } = actorData;
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