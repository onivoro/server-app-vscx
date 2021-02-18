import { ParsedPath } from "path";

export interface IFileSearchResult extends ParsedPath{
    path: string;
    lines: string[],
}