/**
 * Get the user IP
 */
export async function getUserIP() {
	return await fetch("https://api.ipify.org/?format=json")
		.then((response) => response.json())
		.then((data) => {
			return data.ip;
		});
}
