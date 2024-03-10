export interface Game {
    categories: string[];
    id?: number;
    name?: string;
    description?: string;
    rules?: string;
    emoji?: string;
    players_min: number; 
    players_max: number; 
    rating?: number;
    duration_min: number; 
    duration_max: number; 
    reviewCount: number; 
    reportCount: number; 
}

export interface List {
    name?: string;
    id: number;
}

export interface User {
    userName?: string;
    email?: string;
}

export interface Review {
    title?: string;
    description?: string;
    stars?: number;
    gameId?: number;
    text?: string;
    creator?: string;
 }

export interface Category {
    gameId?: number;
    categoryName?: string;
}