import type { Facility } from "../../types/domain";

type FacilityCardProps = {
    facility: Facility;
    onEdit: (f: Facility) => void;
    onDelete: (f: Facility) => void;
};

// Display one facility
export default function FacilityCard({
    facility,
    onEdit,
    onDelete
}: FacilityCardProps) {
    return (
        <div className="card">
            <h3>{facility.name}</h3>
            <p>{facility.location}</p>

            <div className="card-actions">
                {/* Edit button */}
                <button onClick={() => onEdit(facility)}>
                    Edit
                </button>

                {/* Delete button */}
                <button onClick={() => onDelete(facility)}>
                    Delete
                </button>
            </div>
        </div>
    );
}