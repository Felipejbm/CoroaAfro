export interface Comment {
    author: string;
    text: string;
}

export interface Post {
    id: string;
    company: string;
    segment: string;
    content: string;
    comments: Comment[];
}

export interface PostWithImage extends Post {
    image?: string;
}