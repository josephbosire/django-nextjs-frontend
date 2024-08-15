export class HttpError extends Error {
  status: number | undefined;
  info: string | undefined;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
