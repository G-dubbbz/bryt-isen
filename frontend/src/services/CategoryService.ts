import { Category } from "./Models";

const baseUrl = 'http://localhost:8080';

async function getCategoriesFromGame(id: string): Promise<Array<Category>> {
    try {
        const response = await fetch(baseUrl + '/games/' + id + '/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving categories:', error);
        throw error;
    }
}

async function addCategoryToGame(gameId: string, categoryName: string): Promise<any> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request(baseUrl + '/games/' + gameId + '/categories/' + categoryName, {
        method: 'POST',
        headers: headers
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

export { getCategoriesFromGame, addCategoryToGame };
