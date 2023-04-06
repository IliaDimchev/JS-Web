import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';
const request = requestFactory();

export const commentServiceFactory = (token) => {

    const getAll = async (gameId) => {
        const searchQuery = encodeURIComponent(`gameId="${gameId}"`);
        const relationQuery = encodeURIComponent(`author=_ownerId:users`)

        const result = await request.get(`${baseUrl}?where=${query}&load=${relationQuery}`);
        const comments = Object.values(result);

        return comments;
    };

    const create = async (gameId, comment) => {
        const result = await request.post(baseUrl, { gameId, comment });

        return result;
    };

    return {
        getAll,
        create,
    }
}