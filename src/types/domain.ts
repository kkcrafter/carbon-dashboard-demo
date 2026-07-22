// Physical Site
export type Facility = {
    id: number;
    name: string;
    location: string;    // e.g. "Munich, DE"
}

export type ActivityCategory =
    "electricity" |
    "fuel" |
    "transport";

// One measurement per site per month
export type ActivityRecord = {
    id: number;
    facilityId: number;
    category: ActivityCategory;
    quantity: number;
    unit: string;
    period: string; // "2026-06"
}

// Emission factor for a given category and region
export type EmissionFactor = {
    id: number;
    category: ActivityCategory;
    region: string;
    factorValue: number;     // kgCO2e per unit
    unit: string;
    source: "DEFRA" | "UBA";
    scope: 1 | 2 | 3;
};

// Stored for audit
export type CalculationResult = {
    id: number;
    activityRecordId: number;
    co2e: number;            // kgCO2e
    scope: 1 | 2 | 3;
    calculatedAt: string;    // ISO
};

// Payload types — what you send when creating. No id (server assigns).
export type NewFacility = Omit<Facility, "id">;
export type NewActivityRecord = Omit<ActivityRecord, "id">;
