import { useEffect, useState } from "react";
import type { Facility, NewFacility } from "../../types/domain";
import { FacilityList } from "./FacilityList";
import { Spinner } from "../../components/Spinner";
import { FacilityForm } from "./FacilityForm";
import * as facilityApi from "../../api/facilities";

export function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Facility | "new" | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const f = await facilityApi.getFacilities();
                if (!cancelled) {
                    setFacilities(f);
                    setError(null);
                }
            } catch (err: unknown) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();


        return () => { cancelled = true; };
    }, []);

    if (loading) return <Spinner label="Loading sites…" />;
    if (error) return <p> Couldn't load sites: {error} </p>;

    const countries = new Set(
        facilities.map(f => f.location.split(",").pop())
    );

    const handleCreate = async (payload: NewFacility) => {
        const created = await facilityApi.createFacility(payload);
        setFacilities(prev => [...prev, created]);
        setEditing(null);
    };

    const handleUpdate = async (id: number, payload: NewFacility) => {
        const updated = await facilityApi.updateFacility(id, payload);
        setFacilities(prev => prev.map(f => f.id === id ? updated : f));
        setEditing(null);
    }

    const handleDelete = async (facility: Facility) => {
        // Stage 6
    }

    return (
        <section>
            <header className="page-header">
                <h2> Sites </h2>
                {/* new site button */}
                <button onClick={() => setEditing("new")}> + New site </button>

                {/* cancel button */}
                {editing !== null &&
                    <FacilityForm
                        existingNames={facilities.map(f => f.name)}
                        onSubmit={payload => editing === "new" ? handleCreate(payload) : handleUpdate(editing.id, payload)}
                        onCancel={() => setEditing(null)}
                        initial={editing === "new" ? undefined : editing}
                    />}
                <span className="count">
                    {facilities.length} sites across {countries.size} {countries.size === 1 ? "country" : "countries"}
                </span>
            </header>


            <FacilityList
                facilities={facilities}
                onEdit={setEditing}
                onDelete={handleDelete}
            />
        </section>
    )
}