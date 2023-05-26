"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataIsValidMiddleware = void 0;
const dataIsValidMiddleware = (schema) => (request, response, next) => {
    const validatedDate = schema.parse(request.body);
    request.body = validatedDate;
    return next();
};
exports.dataIsValidMiddleware = dataIsValidMiddleware;
