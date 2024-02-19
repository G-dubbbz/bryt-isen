import { Game } from "./Models";

const baseUrl = 'http://localhost:8080';

async function getGames(): Promise<Array<Game>> {
    try {
        const response = await fetch(baseUrl + '/games');
        const data = await response.json();
        var games: Array<Game> = [];
        data.forEach((game: unknown) => {
            console.log(game);
            
            const parsedGame = game as Game;
            games.push(parsedGame);
        });
        return games;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getMyGames(): Promise<any> {
    try {
        const response = await fetch(baseUrl + '/users/myProfile/games');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getGamesFromList(id: string): Promise<any> {
    try {
        const response = await fetch(baseUrl + '/lists/' + id + '/games');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving games:', error);
        throw error;
    }
}

async function getGame(id: string): Promise<any> {
    try {
        const response = await fetch(baseUrl + '/games/' + id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving game:', error);
        throw error;
    }
}

async function createGame(game: Game): Promise<any> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

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

async function updateGame(game: Game): Promise<any> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

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

async function deleteGame(id: string): Promise<any> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

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
