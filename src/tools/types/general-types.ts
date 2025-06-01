export interface WithIndexer<T> {
    [key: string]: T;
    [key: number]: T;
}
