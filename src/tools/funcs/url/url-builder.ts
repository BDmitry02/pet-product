import { WithIndexer } from "@/tools/types/general-types";
import { isNullOrUndefined } from "@/tools/funcs/checkers";

export function addQueryParamsToPath(path: string, queryParams?: WithIndexer<string | string[] | undefined>) {
    if (!queryParams) return path;

    const searchParams = convertObjectParamsToString(queryParams);

    return `${path}?${searchParams}`;
}

function convertObjectParamsToString(queryParams: WithIndexer<string | string[] | undefined>) {
    const searchParams = Object.entries(queryParams)
        .filter(([key, value]) => !isNullOrUndefined(key) && !isNullOrUndefined(value))
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value
                    .map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join("&");
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
            }
        })
        .join("&");

    return searchParams;
}
