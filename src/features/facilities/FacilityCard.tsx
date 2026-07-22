import type { Facility } from "../../types/domain";

type FacilityCardProps = {
    facility: Facility;
};

// Display one facility
export default function FacilityCard({ facility }: FacilityCardProps) {
    return (
        <div className="card">
            <h3>{facility.name}</h3>
            <p>{facility.location}</p>
        </div>
    );
}