export interface Game {
    id?: number;
    name?: string;
    description?: string;
    players?: number;
    rating?: number;
    duration?: number;
    category?: number;
    reviewCount?: number;
    reportCount?: number;
}

export interface List {
    name?: string;
}

export interface User {
    name?: string;
    email?: string;
}

export interface Review {
    title?: string;
    description?: string;
    rating?: number;
    gameId?: number;
 }

export interface Category {
    gameId?: number;
    categoryName?: string;
}