export interface InstagramProfile {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count: number;
  media_count: number;
}

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface InstagramMediaResponse {
  data: InstagramMedia[];
}

export interface InstagramInsightValue {
  value: number | Record<string, number>;
  end_time?: string;
}

export interface InstagramInsight {
  name: string;
  period: string;
  values: InstagramInsightValue[];
  title?: string;
  description?: string;
}

export interface InstagramInsightsResponse {
  data: InstagramInsight[];
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
}
