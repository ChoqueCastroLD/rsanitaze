const accents = require('remove-accents');

function sanitaze(obj) {
    try {
        if (Array.isArray(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = sanitaze(obj[key]);
                }
            }
            return obj;
        }

        if (typeof obj === 'string')
            return accents.remove(obj);

        if (obj instanceof Date)
            return obj;

        if (typeof obj !== 'object')
            return obj;

        let result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                if (typeof element === 'string')
                    result[accents.remove(key)] = accents.remove(element);
                else
                    result[accents.remove(key)] = sanitaze(element);
            }
        }
        return result;  
    } catch (error) {
        return obj;
    }
}

module.exports = sanitaze;