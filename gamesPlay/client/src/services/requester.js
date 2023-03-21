export const request = async (method, url) => {
    const response = await fetch(url, {
        method,
    });
    
    try {
        const result = await response.json();

        return result;
    } catch (error) {
        return {};
    }

};