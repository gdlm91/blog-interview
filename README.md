# Blog interview

This exercise evaluates your skills in **React**, **JavaScript**, and **CSS**.

You will build a simple blog application that:

- Authenticates by fetching an access token
- Uses that token to retrieve a list of blog posts
- Displays the posts in a clean, responsive card layout

The scope is intentionally focused — we expect you to complete the **core task** in 60–90 minutes.
Additional scale-up tasks may be discussed during the interview if time allows.

Good luck!

## Getting started

1. Make sure you have **git** and **Node.js 24 or higher** installed.
2. Clone the repository: `git clone <repository-url>`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`

The app should open automatically at http://localhost:3000

You’re all set — happy coding!

## Tasks

- **Core task** — Create a blog page that authenticates and fetches a list of articles from the mock API (see [screenshot](./screenshots/core-task.png))
- **Scale-up 1** — Add responsive images to each blog post card (see [screenshot](./screenshots/scale-up-1.png))
- **Scale-up 2** — Add pagination (or "load more") functionality

Refer to the `fetchClient` documentation below for details on how to use the mocked API client.

## API client documentation (`fetchClient`)

This project uses a mocked HTTP client called `fetchClient`.
It behaves similarly to the native `fetch` API, but all data is mocked and runs locally.

**You do not need to implement `fetchClient`** — only use it.

### Function signature

```ts
fetchClient<T>(url, options?)
```

#### Arguments

##### `url`

The first argument is a string with the endpoint to call.

##### `options`

The second argument is an optional configuration object.

| Field   | Type                     | Description                           |
| ------- | ------------------------ | ------------------------------------- |
| method  | `"GET"` / `"POST"`       | HTTP method (default: `"GET"`)        |
| headers | `Record<string, string>` | Request headers                       |
| body    | `unknown`                | Request body (used for POST requests) |

#### Return value

`fetchClient` returns a Promise that resolves to a response object with the following shape:

| Field    | Type              | Description                      |
| -------- | ----------------- | -------------------------------- |
| `status` | `number`          | HTTP-like status code            |
| `json`   | `() => Promise<T> | Resolves to the response payload |

This mirrors the behavior of the native fetch API.

### Error handling

- Unauthorized requests return a `401` status
- Unsupported URLs or HTTP methods will result in an error
- You are encouraged to handle loading and error states in the UI

### Notes

- All API responses are mocked
- No real network requests are made
- Artificial delays are included to simulate real API latency

### Supported endpoints

#### `POST /auth/token`

Retrieves an authentication token.

##### Requirements

- Must be called using the `POST` method
- Requires a request body containing an API key

##### Request body

The request body must include the following field:

| Field    | Type     | Description                             |
| -------- | -------- | --------------------------------------- |
| `apiKey` | `string` | API key used to authenticate the client |

The expected API key value is:

```
my-secret-api-key
```

If the API key is missing or incorrect, the request will return `401`.

#### `GET /blogs`

Retrieves a list of blog posts.

##### Requirements

- Must be called using the `GET` method
- Requires an authorization header

##### Authorization header

The request must include an Authorization header with the following format:

```
Authorization: Bearer <token>
```

If the token is missing or invalid, the request will return `401`.

##### Blog data shape

Each blog returned from `/blogs` has the following structure:

| Field         | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `id`          | `string` | Unique blog identifier        |
| `title`       | `string` | Blog title                    |
| `excerpt`     | `string` | Short description of the blog |
| `author       | `string` | Author name                   |
| `publishedAt` | `string` | Publication date              |
| `imageUrl`    | `string` | URL to a square blog image    |

All images are square to make layout implementation easier.
