import { useRequestContext } from "rakkasjs";
import { useState } from "react";

export function useSSRFriendlyTheme(){
  const ctx = useRequestContext();
  const [theme, setTheme] = useState(
    import.meta.env.SSR
      ? ctx!.cookie.theme === "dark"
        ? "dark"
        : "light"
      : // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
        document.documentElement.getAttribute("data-theme") || "light",
  );
}
