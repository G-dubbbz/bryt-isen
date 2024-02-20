import { Review } from "./Models";

const baseUrl = 'http://localhost:8080';

async function getReviews(): Promise<Array<Review>> {
    try {
        const response = await fetch(baseUrl + '/reviews');
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
        const response = await fetch(baseUrl + '/users/myProfile/reviews');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        throw error;
    }
}

async function getReview(id: number): Promise<Review> {
    try {
        const response = await fetch(baseUrl + '/reviews/' + id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving review:', error);
        throw error;
    }
}

async function createReview(review: Review): Promise<void> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request(baseUrl + '/reviews/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(review)
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

async function deleteReview(gameID: number): Promise<void> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request(baseUrl + '/reviews/' + gameID, {
        method: 'DELETE',
        headers: headers,
    });

    return fetch(request)
    .then(res => {
      console.log("got response:", res)
    });
}

export { getReviews, getMyReviews, getReview, createReview, deleteReview };