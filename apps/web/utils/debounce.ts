export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor = 1000) => {
    let timeout: NodeJS.Timeout;
    // let data;
    // this arrau spred may cause type error
    return (...args: Parameters<F>) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };
};
