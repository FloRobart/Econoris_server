import * as controller from '../../src/main/controllers/operationController';
import * as OperationsDao from '../../src/main/database/operationsDao';
import { Request, Response, NextFunction } from 'express';

describe('operationController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.restoreAllMocks();
        req = { body: {}, query: {}, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    test('getOperations returns 204 when empty', async () => {
        (OperationsDao as any).selectOperations = jest.fn().mockResolvedValue([]);
        (req.body as any).user = { userid: 1 };

    await controller.getOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(204);
    });

    test('getOperations returns 200 when data', async () => {
        (OperationsDao as any).selectOperations = jest.fn().mockResolvedValue([{ operations_id: 1 }]);
        (req.body as any).user = { userid: 1 };

    await controller.getOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(200);
    });

    test('getOperations handles dao rejection', async () => {
        (OperationsDao as any).selectOperations = jest.fn().mockRejectedValue(new Error('db'));
        (req.body as any).user = { userid: 1 };

    await controller.getOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect(next).toHaveBeenCalled();
    });

    test('postOperations returns 400 when no operation', async () => {
        (req.body as any).user = { userid: 1 };
        (req.body as any).operation = {};

    await controller.postOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(400);
    });

    test('postOperations returns 200 when insert success', async () => {
        (OperationsDao as any).insertOperation = jest.fn().mockResolvedValue({ operations_id: 1 });
        (req.body as any).user = { userid: 1 };
        (req.body as any).operation = { amount: 10 };

    await controller.postOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(200);
    });

    test('postOperations returns 500 when insert fails', async () => {
        (OperationsDao as any).insertOperation = jest.fn().mockResolvedValue(null);
        (req.body as any).user = { userid: 1 };
        (req.body as any).operation = { amount: 10 };

    await controller.postOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
    });

    test('putOperations returns 400 when missing operation or id', async () => {
        (req.body as any).user = { userid: 1 };
        (req.body as any).operation = {};

    await controller.putOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(400);
    });

    test('putOperations returns 200 when update success', async () => {
        (OperationsDao as any).updateOperation = jest.fn().mockResolvedValue({ operations_id: 1 });
        (req.body as any).user = { userid: 1 };
        (req.body as any).operation = { operations_id: 1 };

    await controller.putOperations(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(200);
    });

    test('deleteOperationsById returns 200 when success', async () => {
        (OperationsDao as any).deleteOperationById = jest.fn().mockResolvedValue(true);
        (req.body as any).user = { userid: 1 };
        req.params = { id: '1' };

    await controller.deleteOperationsById(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(200);
    });

    test('deleteOperationsById returns 400 when failed', async () => {
        (OperationsDao as any).deleteOperationById = jest.fn().mockResolvedValue(false);
        (req.body as any).user = { userid: 1 };
        req.params = { id: '1' };

    await controller.deleteOperationsById(req as Request, res as Response, next);
    await new Promise((r) => setImmediate(r));
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(400);
    });
});
