export function AutoUnsubscribe(blackList = []) {

    return function (constructor) {
        // 1. Save a reference to the original ngOnDestroy function.
        const original = constructor.prototype.ngOnDestroy;

        // 2. Create our version of ngOnDestroy, loop over the class properties and invoke
        // the unsubscribe() function if it exists.
        constructor.prototype.ngOnDestroy = function () {
            for (let prop in this) {
                const property = this[prop];
                if (!blackList.includes(prop)) { //Only unsubscribe functions that do not exist in blacklist.
                    if (property && (typeof property.unsubscribe === 'function')) {
                        property.unsubscribe();
                    }
                }

            }
            // 3. Invoke the original ngOnDestroy functuon if it exists.
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    }

}