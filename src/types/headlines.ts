export type Headlines =
  | {
      code: string;
      message: string;
      status: "error";
    }
  | {
      articles: Article[];
      status: "ok";
      totalResults: number;
    };

export type Article = {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string | null;
};
