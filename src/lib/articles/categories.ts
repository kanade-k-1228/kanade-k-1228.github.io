import { parse } from "yaml";
import indexSource from "../../../article/index.yaml?raw";

/**
 * トップカテゴリ id → 表示名。記述順がそのまま表示順。
 * 実体は article/index.yaml。
 */
export const categories: Record<string, string> = (parse(indexSource) as Record<string, string> | null) ?? {};
