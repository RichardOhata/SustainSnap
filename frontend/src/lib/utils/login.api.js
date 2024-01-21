export const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        // credentials: 'include',
        body: JSON.stringify({email, password}),
    });

    const data = await response.json();

    return {data, response};
}