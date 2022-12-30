export const camelToSnake = <T>(obj: T): T => {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item: unknown) => camelToSnake(item)) as T;
    }

    if (typeof obj === 'object') {
        return Object.keys(obj).reduce(
            (acc: Record<string, unknown>, key: string) => {
                const value = (obj as Record<string, unknown>)[key];
                const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

                return {
                    ...acc,
                    [newKey]: camelToSnake(value),
                };
            },
            {}
        ) as T;
    }

    return obj;
};
