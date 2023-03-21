import * as request from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/comments'

export const create = async (gameId, data) => {
    const result = await request.post(baseUrl, data);

    return result;
};