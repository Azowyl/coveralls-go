export const camelToSnake = (
    obj: Record<string, unknown> | Array<Record<string, unknown>>
): Record<string, unknown> | Array<Record<string, unknown>> => {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => camelToSnake(item) as Record<string, unknown>);
    }

    if (typeof obj === 'object') {
        return Object.keys(obj).reduce(
            (acc: Record<string, unknown>, key: string) => {
                const value = obj[key] as Record<string, unknown>;
                const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

                return {
                    ...acc,
                    [newKey]: camelToSnake(value),
                };
            },
            {}
        );
    }

    return obj;
};
