export const notFoundTemplate = () => {
    return `
        <div class="not-found-container">
			<div class="not-found-container-inner text-center">
				<h1>Page not found</h1>
				<p><i class="bx bxs-error"></i></p>
                <a href="#">Go back to homepage</a>
			</div>
		</div>
    `
}

const init404Page = () => {
    document.getElementById('app-navbar').classList.add('d-none');
}

export const hydrateNotFoundPage = () => init404Page();