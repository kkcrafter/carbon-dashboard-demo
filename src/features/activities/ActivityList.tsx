import { useEffect, useState } from "react";
import type { ActivityRecord } from "../../types/domain";
import { Spinner } from "../../components/Spinner";
import { getActivitiesByFacility } from "../../api/activities";

export function ActivityList() {
    const [activities, setActivities] = useState<ActivityRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await getActivitiesByFacility(1); // temporary hardcoded facility ID
                if (!cancelled) { setActivities(data); setError(null); }
            } catch (err: unknown) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    if (loading) return <Spinner label="Loading readings..." />;
    if (error) return <p className="error">{error}</p>;
    if (activities.length === 0) {
        return <p className="empty">No readings for this site.</p>;
    }
    return (
        <ul className="activity-list">
            {activities.map(a => (
                <li key={a.id}>
                    {a.category}: {a.quantity.toLocaleString()} {a.unit} ({a.period})
                </li>
            ))}
        </ul>
    );
}