// src/api.ts

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
};

type FetchOptions = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
};

type FetchResponse<T> = {
  status: number;
  json: () => Promise<T>;
};

/* ------------------------------------------------------------------ */
/* Mock data */
/* ------------------------------------------------------------------ */

const MOCK_API_KEY = "my-secret-api-key";
const MOCK_TOKEN = "mock-token-123";

const MOCK_BLOGS: Blog[] = Array.from({ length: 15 }).map((_, index) => {
  const id = index + 1;

  return {
    id: String(id),
    title: `Blog Post #${id}`,
    excerpt:
      "This is a short excerpt describing the content of the blog post. It is intentionally concise.",
    author: ["Jane Doe", "John Smith", "Alex Johnson"][id % 3],
    publishedAt: `2024-01-${String(20 - id).padStart(2, "0")}`,
    imageUrl: `https://picsum.photos/seed/blog-${id}/300/300`,
  };
});

/* ------------------------------------------------------------------ */
/* fetchClient */
/* ------------------------------------------------------------------ */

export function fetchClient<T>(
  url: string,
  options: FetchOptions = {},
): Promise<FetchResponse<T>> {
  const { method = "GET", headers = {}, body } = options;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      /* -------------------- TOKEN ENDPOINT -------------------- */
      if (url === "/auth/token" && method === "POST") {
        const apiKey = (body as { apiKey?: string })?.apiKey;

        if (apiKey !== MOCK_API_KEY) {
          resolve({
            status: 401,
            json: async () => ({ message: "Invalid API key" }) as T,
          });
          return;
        }

        resolve({
          status: 200,
          json: async () => ({ token: MOCK_TOKEN }) as T,
        });
        return;
      }

      /* -------------------- BLOGS ENDPOINT -------------------- */
      if (url === "/blogs" && method === "GET") {
        const authHeader = headers["Authorization"];

        if (authHeader !== `Bearer ${MOCK_TOKEN}`) {
          resolve({
            status: 401,
            json: async () => ({ message: "Unauthorized" }) as T,
          });
          return;
        }

        resolve({
          status: 200,
          json: async () => MOCK_BLOGS as T,
        });
        return;
      }

      /* -------------------- UNKNOWN ENDPOINT -------------------- */
      reject(new Error(`No mock implementation for ${method} ${url}`));
    }, 600);
  });
}
