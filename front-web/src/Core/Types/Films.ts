export type FilmsResponse = {
    content: Film[];
    totalPages: number;
}

export type ReviewResponse = {
    contentReview: Review[];
}

export type Film = {
    id: number;
    title:string;
    subTitle: string;
    year: number;
    imgUrl: string;
    synopsis:string;
    genreId: number | string;
    reviews: Review[];
}

export type Review = {
    id: number;
    text: string;
    movieId: number;
    userId: number;
    userName: string;
    userEmail: string;
    //user?: object;
}

export type Genre={
    id: number,
    name: string,
    movies?: Film[],
}