export interface IResponsePayload<T> {
    statusCode: number;
    message: string;
    data?: T;
}