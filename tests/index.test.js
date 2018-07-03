import test from 'ava';
import Ringway from '../src';
import * as Joi from 'joi';

test('Test .write and .read methods', t => {
    const ringbuffer = new Ringway(5);
    ringbuffer.write([1, 2, 3]);
    if (t.is(ringbuffer.read(), 1) && t.is(ringbuffer.read(), 2)) {
        t.pass();
    }
});

test('Test if data different from given schema will be written in buffer', t => {
    const ringbuffer = new Ringway(5, {
        debug: true,
        schema: Joi.number().integer()
    });
    ringbuffer.write('foo');
    if (t.is(ringbuffer.read(), 'undefined')) {
        t.pass();
    }
});