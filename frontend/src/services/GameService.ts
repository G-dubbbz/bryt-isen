import { Game } from "./Models";

const baseUrl = 'http://localhost:8080';

const headers: Headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');
const token = sessionStorage.getItem('token');
headers.set('Authorization', 'Bearer ' + token);
console.log("token: " + token);

async function getGames(): Promise<Array<Game>> {
    try {
        const response = await fetch(baseUrl + '/games', {headers: headers});
        const data = await response.json();
        const games: Array<Game> = [];
        data.forEach((game: unknown) => {
            const parsedGame = game as Game;
            games.push(parsedGame);
        });
        return games;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getMyGames(): Promise<Array<Game>> {
    try {
        const response = await fetch(baseUrl + '/users/myProfile/games', {headers: headers});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getGamesFromList(id: string): Promise<Array<Game>> {
    try {
        const response = await fetch(baseUrl + '/lists/' + id + '/games', {headers: headers});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getGame(id: string): Promise<Game> {
    try {
        const response = await fetch(baseUrl + '/games/' + id, {headers: headers});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving game:', error);
        throw error;
    }
}

async function createGame(game: Game): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/games/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(game)
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function updateGame(game: Game): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/games/update', {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(game)
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function deleteGame(id: string): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/games/delete/' + id, {
        method: 'DELETE',
        headers: headers
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

export { getGames, getMyGames, getGamesFromList, getGame, createGame, updateGame, deleteGame};
