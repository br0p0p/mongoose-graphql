/* eslint-disable no-use-before-define */
import { forOwn } from 'lodash';

const setDescendant = (tree, key, value) => {
    let parentTree = tree;

    // Make sure there is an object for each of the ancestors
    // Ex. 'location.address.street1'' -> { location: { address: {} } }
    const splitPath = key.split('.');
    for (let i = 0; i < splitPath.length - 1; i += 1) {
        const ancestor = splitPath[i];
        parentTree[ancestor] = parentTree[ancestor] || {};
        parentTree = parentTree[ancestor];
    }

    const property = splitPath[splitPath.length - 1];
    parentTree[property] = value;
};

const instanceToType = instance => {
    switch (instance) {
        case 'Boolean':
            return 'Boolean';
        case 'ObjectID':
        case 'String':
            return 'String';
        case 'Date':
        case 'Number':
            return 'Float';
        default:
            throw new Error(`${instance} not implemented yet in instanceToType`);
    }
};

const refToType = instance => {
    return instance;
};

const arrayToTree = path => {
    if (path.caster && path.caster.instance) {
        // If a "ref" is specified (model utilizes Mongoose population), use the ref name
        if (path.caster.options && path.caster.options.ref) {
            return [refToType(path.caster.options.ref)];
        }
        return [instanceToType(path.caster.instance)];
    } else if (path.casterConstructor) {
        return [getTypeTree(path.casterConstructor.schema.paths)];
    }

    throw new Error(`${path} is not a supported path`);
};

const getTypeTree = schemaPaths => {
    const typeTree = {};

    forOwn(schemaPaths, (path, key) => {
        if (key === '__v') {
            return;
        }

        let value;

        if (path.instance === 'Array') {
            value = arrayToTree(path);
        } else if (path.instance === 'Embedded') {
            value = getTypeTree(path.caster.schema.paths);
        } else {
            value = path.options && path.options.ref ? refToType(path.options.ref) : instanceToType(path.instance);
        }

        setDescendant(typeTree, key, value);
    });

    return typeTree;
};

export default getTypeTree;
