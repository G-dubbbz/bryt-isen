import { List } from "./Models";

const baseUrl = 'http://localhost:8080';

const headers: Headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');
const token = sessionStorage.getItem('token');
headers.set('Authorization', 'Bearer ' + token);
console.log("token: " + token);

async function getLists(): Promise<Array<List>> {
    try {
        const response = await fetch(baseUrl + '/lists', {headers: headers});
        const data = await response.json();
        const lists: Array<List> = [];
        data.forEach((list: unknown) => {
            console.log(list);
            
            const parsedList = list as List;
            lists.push(parsedList);
        });
        return lists;
    } catch (error) {
        console.error('Error retrieving lists:', error);
        throw error;
    }
}

async function getMyLists(): Promise<Array<List>> {
    try {
        const response = await fetch(baseUrl + '/users/myProfile/lists', {headers: headers});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving lists:', error);
        throw error;
    }
}

async function getList(id: number): Promise<List> {
    try {
        const response = await fetch(baseUrl + '/lists/' + id, {headers: headers});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving list:', error);
        throw error;
    }
}

async function createList(list: List): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/lists/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(list)
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function updateList(list: List): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/lists/update', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(list)
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function deleteList(id: number): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/lists/' + id, {
        method: 'DELETE',
        headers: headers
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function addGameToList(listId: number, gameId: number): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/lists/' + listId + '/' + gameId, {
        method: 'POST',
        headers: headers
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function removeGameFromList(listId: number, gameId: number): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/lists/' + listId + '/' + gameId, {
        method: 'DELETE',
        headers: headers
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

export { getLists, getMyLists, getList, createList, updateList, deleteList, addGameToList, removeGameFromList};