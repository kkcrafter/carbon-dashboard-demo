import { useEffect, useState } from "react";
import type { Facility, NewFacility } from "../../types/domain";
import { FacilityList } from "./FacilityList";
import { Spinner } from "../../components/Spinner";
import { FacilityForm } from "./FacilityForm";
import * as facilityApi from "../../api/facilities";

export function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [sortBy, setSortBy] = useState<"name" | "location">("name");
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

    // sorting
    const sortedFacilities = [...facilities].sort((a, b) =>
        sortBy === "name"
            ? a.name.localeCompare(b.name)
            : a.location.localeCompare(b.location)
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
        // confirm delete window
        if (!confirm(`Delete ${facility.name}?`)) return;

        const before = facilities;
        setFacilities(prev => prev.filter(f => f.id !== facility.id));
        try {
            await facilityApi.deleteFacility(facility.id);
        } catch {
            // restore if delete API fails
            setFacilities(before);
            alert("Delete failed");
        }
    };

    return (
        <section>
            <header className="page-header">
                <h2> Sites </h2>

                {/* Sorting */}
                <label>
                    Sort:
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as "name" | "location")}>
                        <option value="name"> Name </option>
                        <option value="location"> Location </option>
                    </select>
                </label>

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
                facilities={sortedFacilities}
                onEdit={setEditing}
                onDelete={handleDelete}
            />
        </section>
    )
}