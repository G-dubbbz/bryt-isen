import { Review } from "./Models";

const baseUrl = 'http://localhost:8080';

function getHeaders() {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    const token = sessionStorage.getItem('token');
    headers.set('Authorization', 'Bearer ' + token);
    return headers;
}

async function getReviews(): Promise<Array<Review>> {
    try {
        const response = await fetch(baseUrl + '/reviews', {headers: getHeaders()});
        const data = await response.json();
        const reviews: Array<Review> = [];
        data.forEach((review: unknown) => {
            console.log(review);

            const parsedReview = review as Review;
            reviews.push(parsedReview);
        });
        return reviews;
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        throw error;
    }
}

async function getMyReviews(): Promise<Array<Review>> {
    try {
        const response = await fetch(baseUrl + '/users/myProfile/reviews', {headers: getHeaders()});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        throw error;
    }
}

async function getGamesReviews(id: number): Promise<Array<Review>> {
    try {
        const response = await fetch(baseUrl + '/games/' + id + "/reviews", {headers : getHeaders()});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error retrieving review:', error);
        throw error;
    }
}

async function createReview(id: string, review: Review): Promise<Response> {
    try {
            const request: RequestInfo = new Request(baseUrl + '/games/' + id + '/reviews', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(review)
            });

            const response = await fetch(request);


            console.log("Review submitted successfully");
            return response;
    } catch (error) {
        console.error("Error creating review:", error);
        throw error;
    }
}
async function deleteReview(gameID: number): Promise<void> {
    const request: RequestInfo = new Request(baseUrl + '/reviews/' + gameID, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

export { getReviews, getMyReviews, getGamesReviews, createReview, deleteReview };