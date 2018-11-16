export function debounce(func: Function, wait: number, immediate: boolean = false): Function {
    let timeout;

    return function (): void {
        const context = this;
        const args    = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);

        if (immediate && !timeout) {
            func.apply(context, args);
        }
    };
}
