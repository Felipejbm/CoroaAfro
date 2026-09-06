export interface Comment {
    author: string;
    text: string;
    autorId?: number;
    autorPapel?: "empreendedor" | "mentor";
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
    imageUrl?: string;
    uploadedImage?: boolean;
    minha: boolean;
    autorFotoUrl?: string | null;
}
