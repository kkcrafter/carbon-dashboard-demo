export function Spinner({label = "Loading..."}: {label?: string}) {
    return (
        <div className="spinner" role="status" aria-label="Loading">
            <span className="spinner-icon" aria-hidden="true"/>
            <span>{label}</span>
        </div>
    );
};
