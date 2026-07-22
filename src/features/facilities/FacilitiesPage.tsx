import { useEffect, useState } from "react";
import type { Facility } from "../../types/domain";
import { getFacilities } from "../../api/facilities";
import { FacilityList } from "./FacilityList";
import { Spinner } from "../../components/Spinner";

export function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await getFacilities();
                if (!cancelled) { setFacilities(data); setError(null); }
            } catch (err: unknown) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p> Couldn't load sites: {error} </p>;

    const countries = new Set(
        facilities.map(f => f.location.split(",").pop())
    );

    return (
        <section>
            <header className="page-header">
                <h2> Sites </h2>
                <span className="count"> {facilities.length} registered </span>
            </header>

            <p className="coverage">
                {facilities.length} site{facilities.length !== 1 ? "s" : ""} across {countries.size} countr{countries.size !== 1 ? "ies" : "y"}.
            </p>
            <FacilityList facilities={facilities} />
        </section>
    )
}