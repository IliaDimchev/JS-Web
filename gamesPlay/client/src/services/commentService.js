import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments'

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async (gameId) => {
        const query = encodeURIComponent(`gameId="${gameId}"`);

        const result = await request.get(`${baseUrl}?where=${query}`);
        const comments = Object.values(result);

        return comments;
    };

    const create = async (data) => {
        const result = await request.post(baseUrl, data);

        return result;
    };

    return {
        getAll,
        create,
    }
}