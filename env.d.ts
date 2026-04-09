/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_KEY?: string;
  readonly VITE_API_LOGIN_ID?: string;
  readonly VITE_LOGIN_ID?: string;
  readonly VITE_ACCEPT_JS_URL?: string;
  readonly VITE_AUTHORIZE_NET_ENV?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
