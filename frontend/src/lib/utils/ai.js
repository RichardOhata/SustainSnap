

export const process_image = async (file) => {
	const response = await fetch('/api/process_image', {
		method: 'POST',
		headers: {
			'Content-Type': 'image/jpeg',
		},
		body: file,
	});

	const data = await response.json();

	return data;
}
