const baseUrl = 'http://localhost:3005/api/users/';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    // if the server returns Object of objects
    // return Object.values(result.users);
    return result.users;
};