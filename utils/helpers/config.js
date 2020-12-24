const rfr = require('rfr');
const Fs = require('fs-extra');
const _ = require('lodash');
const extendify = require('extendify');
const Cache = require('memory-cache');

class Config {
    constructor() {
        if (_.isNull(Cache.get('config'))) {
            Cache.put('config', this.raw());
        }
    }

    raw() {
        try {
            return rfr('config/config.json');
        } catch (ex) {
            if (ex.code === 'MODULE_NOT_FOUND') {
                console.error('+ ------------------------------------ +');
                console.error('|   No config found! Make a config at  |'); 
                console.error('|   /etc/dukt-api/config/config.json   |'); 
                console.error('+ ------------------------------------ +'); 
                console.trace(ex.message);
                process.exit(1);
            }
            throw ex;
        }
    }

    get(key, defaultResponse) {
        let getObject;
        try {
            getObject = _.reduce(_.split(key, '.'), (o, i) => o[i], Cache.get('config'));
        } catch (ex) { _.noop(); }

        if (!_.isUndefined(getObject)) {
            return getObject;
        }

        return (!_.isUndefined(defaultResponse)) ? defaultResponse : undefined;
    }

    save(json, next) {
        if (!json || !_.isObject(json) || _.isNull(json) || !_.keys(json).length) {
            throw new Error('Invalid JSON was passed to Builder.');
        }

        Fs.writeJson('./config/config.json', json, { spaces: 2 }, err => {
            if (!err) Cache.put('config', json);
            return next(err);
        });
    }

    modify(object, next) {
        if (!_.isObject(object)) return next(new Error('Function expects an object to be passed.'));

        const deepExtend = extendify({
            inPlace: false,
            arrays: 'replace',
        });
        const modifiedJson = deepExtend(Cache.get('config'), object);

        Fs.writeJson('./config/config.json', modifiedJson, { spaces: 2 }, err => {
            if (err) return next(err);

            Cache.put('config', modifiedJson);
            return next();
        });
    }
}

module.exports = Config;