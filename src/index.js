import * as Joi from 'joi';

export default class Ringway {
    constructor(size, config) {
        if (
            typeof size !== 'number' ||
            typeof size === 'number' &&
            size <= 1
        ) {
            throw new Error('Size must be a positive integer greater than 1');
        }
        this.ring = [];
        this.size = size;
        this.config = config || {};
    }
    write(data) {
        if (Array.isArray(data)) {
            if (this.config.schema) {
                data.filter(item => {
                    const valid = Joi.validate(item, this.config.schema);
                    if (valid.error !== null) {
                        this.displayMessage('Incompatible types');
                        return false;
                    } else {
                        return true;
                    }
                });
            }
            if (this.ring.length + data.length > this.size) {
                this.displayMessage('The ring buffer is full');
            }
            const slicedData = data.slice(0, this.size - this.ring.length);
            this.ring = this.ring.concat(slicedData);
            return slicedData.length;
        } else {
            if (this.config.schema) {
                const valid = Joi.validate(data, this.config.schema);
                if (valid.error !== null) {
                    this.displayMessage('Incompatible types');
                    return 0;
                }
            }
            if (this.ring.length < this.size) {
                this.ring.push(data);
                return 1;
            } else {
                this.displayMessage('The ring buffer is full');
                return 0;
            }
        }
    }
    read() {
        if (this.ring.length === 0) {
            this.displayMessage('The ring buffer is empty');
        } else {
            return this.ring.shift();
        }
    }
    empty() {
        this.ring = [];
    }
    displayMessage(msg) {
        if (this.config.debug === true) {
            console.log(msg);
        }
    }
}


