import { useState } from "react";
import type { Facility, NewFacility } from "../../types/domain";

type FacilityFormProps = {
    initial?: Facility;
    existingNames: string[];
    onSubmit: (payload: NewFacility) => Promise<void>;
    onCancel: () => void,
};

export function FacilityForm({
    initial,
    existingNames,
    onSubmit,
    onCancel,
}: FacilityFormProps) {
    const [name, setName] = useState(initial?.name ?? "");
    const [nameTouched, setNameTouched] = useState(false);
    const [location, setLocation] = useState(initial?.location ?? "");
    const [locationTouched, setLocationTouched] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Validation
    const trimmedName = name.trim();
    const trimmedLoc = location.trim();
    const isDuplicateName =
        trimmedName.toLowerCase() !== initial?.name.toLowerCase()
        && existingNames.some(n => n.toLowerCase() === trimmedName.toLowerCase());

    const nameError = trimmedName === "" ? "Site name is required"
        : isDuplicateName ? "Site name already exists" : null;
    const locationError = trimmedLoc === "" ? "Location is required" :
        !location.includes(",") ? "Include the country code, e.g. \"Munich, DE\"" : null;
    const isValid = nameError === null && locationError === null;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitting(true);
        setFormError(null);
        try {
            await onSubmit({
                name: trimmedName,
                location: trimmedLoc,
            });
        } catch (err: unknown) {
            setFormError(err instanceof Error ? err.message : "Save failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="facility-form">
            {/* Site input */}
            <label>
                Site name
                <input
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                        setNameTouched(true);
                    }}
                    placeholder="Munich Plant"
                />
                {/* site error msg */}
                {nameTouched && nameError && <span className="field-error">{nameError}</span>}
            </label>

            {/* Location input */}
            <label>
                Location
                <input
                    value={location}
                    onChange={e => {
                        setLocation(e.target.value);
                        setLocationTouched(true);
                    }}
                    placeholder="Munich, DE" />

                {/* location error msg */}
                {locationTouched && locationError && <span className="field-error">{locationError}</span>}
            </label>

            {/* Cancel button */}
            <button type="button" onClick={onCancel}>
                Cancel
            </button>

            {/* Submit button */}
            <button type="submit" disabled={!isValid || submitting}>
                {submitting ? "Saving ..."
                    : initial ? "Save changes"
                        : "Create site"}
            </button>
        </form >
    )
}