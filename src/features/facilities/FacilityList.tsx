import type { Facility } from "../../types/domain";
import FacilityCard from "./FacilityCard";

type FacilityListProps = {
    facilities: Facility[];
};

// Display a list of facilities
export function FacilityList({ facilities }: FacilityListProps) {
    if (facilities.length === 0) {
        return (
            <div className="empty">
                <p>No sites registered yet.</p>
                <p className="hint"> Add your first site to start tracking emissions. </p>
            </div>
        )
    }
    return (
        <div className="facility-grid">
            {facilities.map(f => (
                <FacilityCard key={f.id} facility={f} />
            ))}
        </div>
    );
}

