// src/lib/http/ApiError.ts

export class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;
  url?: string;

  constructor({
    message,
    status,
    code,
    data,
    url,
  }: {
    message: string;
    status: number;
    code?: string;
    data?: unknown;
    url?: string;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
    this.url = url;
  }
}
