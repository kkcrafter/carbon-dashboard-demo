import { useState } from "react"
import type { ActivityCategory, NewActivityRecord } from "../../types/domain";

type ActivityFormProps = {
    facilityId: number;
    onSubmit: (payload: NewActivityRecord) => Promise<void>;
}

// unit lookup conversion
const UNIT: Record<ActivityCategory, string> = {
    electricity: "kWh", fuel: "L", transport: "km",
};

export function ActivityForm({
    facilityId,
    onSubmit,
}: ActivityFormProps) {
    const [category, setCategory] = useState<ActivityCategory>("electricity");
    const [quantity, setQuantity] = useState("");
    const [period, setPeriod] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const parsedQuantity = Number(quantity);
    const isValid = quantity !== ""
        && Number.isFinite(parsedQuantity) // not allow Infinity value
        && parsedQuantity > 0
        && period !== "";

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        setSubmitting(true);
        setFormError(null);
        try {
            await onSubmit({
                facilityId: facilityId,
                category: category,
                quantity: parsedQuantity,
                unit: UNIT[category],
                period: period,
            });
            setQuantity("");
            setPeriod("");
        } catch (err: unknown) {
            setFormError(err instanceof Error ? err.message : "Save failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="activity-form">

            {/* Activity Category */}
            <label>
                Category
                <select value={category} onChange={e => setCategory(e.target.value as ActivityCategory)}>
                    <option value="electricity">Electricity</option>
                    <option value="fuel">Fuel</option>
                    <option value="transport">Transport</option>
                </select>
            </label>

            {/* Quantity */}
            <label>
                Quantity ({UNIT[category]})
                <input
                    value={quantity}
                    onChange={e => { setQuantity(e.target.value) }}
                    type="number"
                />
            </label>

            {/* Period */}
            <label>
                Period
                <input
                    value={period}
                    onChange={e => { setPeriod(e.target.value) }}
                    type="month"
                />
            </label>

            {/* form error */}
            {formError && <p className="field-error">{formError}</p>}

            {/* Submit button */}
            <button type="submit" disabled={!isValid || submitting}>
                {submitting ? "Saving ..." : "Save reading"}
            </button>
        </form >
    )
}