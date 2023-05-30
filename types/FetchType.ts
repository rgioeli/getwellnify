export type FetchOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
};
