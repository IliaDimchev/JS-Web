import { request } from "./requester"

const baseUrl = 'http://localhost:3030/jsonstore/games'

export const getAll = async () => {
    const games = await request('GET', baseUrl);

    return games;
}