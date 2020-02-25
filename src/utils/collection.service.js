/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic card collections (tools and platforms) service.
 */

/**
 * Returns a flattened list of all child anchor elements of the specified class name.
 *
 * @param className
 * @returns {*}
 */
export function findCardCollectionAnchorElements(className) {

    const secondaryEls = Array.from(document.getElementsByClassName(className));

    if ( secondaryEls ) {

        return secondaryEls.reduce((acc, val) => {

            const anchorEls = Array.from(val.querySelectorAll("a"));

            if (anchorEls.length) {

                return acc.concat(anchorEls)
            }

            return acc;

        }, []);
    }
}

/**
 * Returns the collection for the corresponding collection type and collection status.
 *
 * @param type
 * @param collections
 * @returns {*}
 */
export function getCollection(type, collections) {

    if ( !collections ) {

        return;
    }

    const collection = collections[type.collection];
    const collectionType = type.collection;
    const collectionStatus = type.status;

    if ( collection ) {

        if ( collectionType === "tools" && collection[collectionStatus] ) {

            return collection[collectionStatus];
        }

        if ( collectionType === "platforms" ) {

            return collection;
        }
    }
}
