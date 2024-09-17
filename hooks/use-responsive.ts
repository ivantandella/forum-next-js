import { useMediaQuery } from "@mantine/hooks";

export function useResponsive() {
  const isMobile = useMediaQuery(`(max-width: 400px)`);
  const elemWidth = isMobile ? 300 : 400;

  return { isMobile, elemWidth };
}
