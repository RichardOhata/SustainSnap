export const logout = async () => {
    const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }, 
        credentials: 'include',
    });

    const data = await response.json();

    return {data, response};
}   