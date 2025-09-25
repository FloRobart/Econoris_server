import { normalizePort, normalyzeKey, clone } from '../../src/main/utils/utils';
import * as logger from '../../src/main/utils/logger';

describe('utils', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
    });

    test('normalizePort returns null for non-number', () => {
        expect(normalizePort('abc')).toBeNull();
    });

    test('normalizePort clamps values', () => {
        expect(normalizePort('70000')).toBe(65535);
        expect(normalizePort('-1')).toBe(0);
        expect(normalizePort('8080')).toBe(8080);
    });

    test('normalyzeKey returns * unchanged and prefixes keys when needed', () => {
        expect(normalyzeKey('*', 'operations')).toBe('*');
        expect(normalyzeKey('operations_id', 'operations')).toBe('operations_id');
        expect(normalyzeKey('id', 'operations')).toBe('operations_id');
    });

    test('clone returns deep clone and undefined handling', () => {
        const obj = { a: 1, b: { c: 2 } };
        const c = clone(obj);
        expect(c).not.toBe(obj);
        expect(c.b).not.toBe(obj.b);
        expect(clone(undefined)).toBeUndefined();
    });

    test('clone catches circular structure and logs error, returns original', () => {
        const circular: any = { };
        circular.self = circular;

        const spy = jest.spyOn(logger, 'error').mockImplementation(() => { return undefined; });

        const result = clone(circular);
        expect(result).toBe(circular);
        expect(spy).toHaveBeenCalled();
    });
});
