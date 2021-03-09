import { useState, useEffect } from "react";

function Debauncing(value, delay) {
  const [debauncedValue, setDebauncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debauncedValue;
}

export default Debauncing;
