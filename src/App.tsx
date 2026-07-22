import { useEffect, useState } from "react";
import { getFacilities } from "./api/facilities";
import type { Facility } from "./types/domain";

export default function App() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  useEffect(() => {
    getFacilities().then(setFacilities);
  }, []);

  return <pre>{JSON.stringify(facilities, null, 2)}</pre>;
}
