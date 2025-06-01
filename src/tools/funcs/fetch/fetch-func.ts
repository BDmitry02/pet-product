import { addQueryParamsToPath } from "@/tools/funcs/url/url-builder";
import { WithIndexer } from "@/tools/types/general-types";

export async function fetchGet<T>(
    url: string,
    queryParams?: WithIndexer<string | string[] | undefined>,
    params?: WithIndexer<string | number | string[]>,
) {
    const completedUrl = addQueryParamsToPath(url, queryParams);

    try {
        const response = await fetch(completedUrl, {
            method: "GET",
            next: { ...params },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = (await response.json()) as T;

        const totalCount = parseInt(response.headers.get("X-Total-Count") || "0", 10);

        return { data, totalCount };
    } catch (error) {
        console.error("Error in fetchGet:", error);
        throw error;
    }
}
