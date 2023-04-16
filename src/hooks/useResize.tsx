import { useState, useEffect } from "react";

type Size = "xl" | "lg" | "md" | "sm" | "xs";

function useResize(): Size {
  const [size, setSize] = useState<Size>(getCurrentSize());

  function getCurrentSize(): Size {
    const width = window.innerWidth;

    return width && width > 1904
      ? "xl"
      : width && width > 1264
      ? "lg"
      : width && width > 960
      ? "md"
      : width && width > 600
      ? "sm"
      : "xs";
  }

  useEffect(() => {
    function handleResize() {
      setSize(getCurrentSize());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

export default useResize;
