export declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOperationol: boolean;
    constructor(message: string, statusCode: number);
}
