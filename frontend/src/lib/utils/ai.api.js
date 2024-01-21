export const process_image = async (image) => {

	const response = await fetch('http://localhost:3000/api/process_image', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ image }),
	});

	const data = await response.json();

	return data;
}
