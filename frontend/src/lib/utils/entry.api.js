export const post_entry = async (label, points, image) => {

	const response = await fetch(`${import.meta.env.VITE_SERVER_ADDR}/create_entry`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        credentials: "include",
		body: JSON.stringify({ label, points, image }),
	});

	const data = await response.json();

	return data;
}
