const accents = require('remove-accents');
const latinize = require('latinize');

function sanitaze(obj) {
    try {
        if (Array.isArray(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let element = obj[key];
                    console.log(element);
                    
                    element = element.split('ñ').join('%PLACEHOLDER_N%');
                    element = latinize(accents.remove(element));
                    element = element.split('%PLACEHOLDER_N%').join('ñ');
                    obj[key] = element;
                }
            }
            return obj;
        }

        if (typeof obj === 'string'){
            let element = obj.split('ñ').join('%PLACEHOLDER_N%');
            element = latinize(accents.remove(element));
            element = element.split('%PLACEHOLDER_N%').join('ñ');
            return element;
        }
        if (obj instanceof Date)
            return obj;

        if (typeof obj !== 'object')
            return obj;

        let result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                let element = obj[key];
                if (typeof element === 'string'){
                    element = element.split('ñ').join('%PLACEHOLDER_N%');
                    element = latinize(accents.remove(element));
                    element = element.split('%PLACEHOLDER_N%').join('ñ');
                    result[accents.remove(key)] = element;
                } else {
                    result[accents.remove(key)] = sanitaze(element);
                }
            }
        }
        return result;  
    } catch (error) {
        return obj;
    }
}

module.exports = sanitaze;