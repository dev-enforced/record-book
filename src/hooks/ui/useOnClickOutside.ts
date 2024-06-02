import { RefObject, useCallback, useEffect } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLDivElement>,
  onClose: () => void,
  required: boolean,
  id?: string
) {
  const keyListener = useCallback(
    (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event?.target as Node)) {
        onClose();
      }
    },
    [onClose, id]
  );
  useEffect(() => {
    if (!required) {
      document.removeEventListener("mousedown", keyListener);
      return;
    }
    document.addEventListener("mousedown", keyListener);
    return () => {
      document.removeEventListener("mousedown", keyListener);
    };
  }, [required, onClose, id]);
}
