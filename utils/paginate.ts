import { UserType } from "../api-hooks/auth/model";

export function paginate(
  array: UserType[],
  page_size: number,
  page_number: number
) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
