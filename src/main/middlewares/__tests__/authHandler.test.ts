import { authHandler } from '../authHandler';
import http from 'node:http';
import { Request, Response, NextFunction } from 'express';

describe('authHandler', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.restoreAllMocks();
        req = { headers: {}, url: '/', socket: { remoteAddress: '1.2.3.4' } as any, method: 'GET', body: {} };
        res = {};
        next = jest.fn();
    });

    test('skips api-docs', async () => {
        req.url = '/api-docs';
        await authHandler(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    test('unauthorized when no header', async () => {
        await authHandler(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    test('unauthorized when malformed header', async () => {
        req.headers = { authorization: 'BadHeader' } as any;
        await authHandler(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    test('calls external http and sets user on success', async () => {
        req.headers = { authorization: 'Bearer token' } as any;

        const fakeResponse = new (require('stream').Readable)();
        fakeResponse._read = () => {};
        fakeResponse.statusCode = 200;

        jest.spyOn(http, 'get').mockImplementation((url: any, opts: any, cb: any) => {
            cb(fakeResponse);
            // simulate data event
            process.nextTick(() => {
                fakeResponse.emit('data', Buffer.from(JSON.stringify({ userid: 1 })));
            });
            return { on: () => {} } as any;
        });

        await authHandler(req as Request, res as Response, next);
        // allow event handlers to run
        await new Promise((r) => setImmediate(r));
        expect((req.body as any).user).toBeDefined();
        expect(next).toHaveBeenCalled();
    });

    test('handles non-2xx response', async () => {
        req.headers = { authorization: 'Bearer token' } as any;

        const fakeResponse = new (require('stream').Readable)();
        fakeResponse._read = () => {};
        fakeResponse.statusCode = 401;

        jest.spyOn(http, 'get').mockImplementation((url: any, opts: any, cb: any) => {
            cb(fakeResponse);
            process.nextTick(() => {
                fakeResponse.emit('data', Buffer.from('notjson'));
            });
            return { on: () => {} } as any;
        });

        await authHandler(req as Request, res as Response, next);
        await new Promise((r) => setImmediate(r));
        expect(next).toHaveBeenCalled();
    });
});
