import { navigate, useLocation } from "rakkasjs";

interface UseCustomSearchParams {
  key: string;
  default_value?: string;
}
export function useCustomSearchParams({
  key,
  default_value = "q",
}: UseCustomSearchParams) {
  const { current } = useLocation();
  const search_param = current.searchParams.get(key) ?? default_value;
  function updateSeachparams(value?: string) {
    const new_url = new URL(current);
    if (!value) {
      new_url.searchParams.delete(key);
    } else {
      new_url.searchParams.set(key, value);
    }

    navigate(new_url.toString(), { replace: true }) ?? default_value;
  }
  return { search_param, updateSeachparams };
}
