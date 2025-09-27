import { defaultRouteHandler } from '../defaultRouteHandler';
import { errorHandler } from '../errorHandler';
import { AppError, internalMessage } from '../../models/ErrorModel';

describe('middlewares', () => {
    test('defaultRouteHandler calls next with AppError', () => {
        const next = jest.fn();
        defaultRouteHandler({} as any, {} as any, next as any);
        expect(next).toHaveBeenCalled();
        const err = (next as jest.Mock).mock.calls[0][0];
        expect(err).toBeInstanceOf(AppError);
        expect(err.httpStatus).toBe(404);
    });

    test('errorHandler logs and returns json with internalMessage', () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const err = new AppError('Boom', 418, 2);
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        errorHandler(err as any, {} as any, res, jest.fn());
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(418);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ internalMessage: internalMessage[2] }));
    });
});
