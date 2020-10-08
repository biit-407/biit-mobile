import { useState } from "react";

export default function useConstructor(callback: () => void) {
  const [used, setUsed] = useState(false);
  if (used) {
    return;
  }
  callback();
  setUsed(true);
}
