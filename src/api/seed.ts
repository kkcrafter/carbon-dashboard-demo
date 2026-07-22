import type { Facility, ActivityRecord, EmissionFactor } from "../types/domain";

// seed data
export const seedFacilities: Facility[] = [
    { id: 1, name: "Munich Plant", location: "Munich, DE" },
    { id: 2, name: "Hamburg Warehouse", location: "Hamburg, DE" },
    { id: 3, name: "Rotterdam Terminal", location: "Rotterdam, NL" },
];

export const seedFactors: EmissionFactor[] = [
    { id: 1, category: "electricity", region: "DE", factorValue: 0.380, unit: "kWh", source: "UBA", scope: 2 },
    { id: 2, category: "electricity", region: "NL", factorValue: 0.328, unit: "kWh", source: "DEFRA", scope: 2 },
    { id: 3, category: "fuel", region: "DE", factorValue: 2.680, unit: "L", source: "UBA", scope: 1 },
    { id: 4, category: "transport", region: "DE", factorValue: 0.170, unit: "km", source: "DEFRA", scope: 3 },
];

export const seedActivities: ActivityRecord[] = [
    { id: 1, facilityId: 1, category: "electricity", quantity: 120_000, unit: "kWh", period: "2026-04" },
    { id: 2, facilityId: 1, category: "electricity", quantity: 135_000, unit: "kWh", period: "2026-05" },
    { id: 3, facilityId: 1, category: "fuel", quantity: 4_500, unit: "L", period: "2026-05" },
    { id: 4, facilityId: 2, category: "electricity", quantity: 45_000, unit: "kWh", period: "2026-05" },
    { id: 5, facilityId: 3, category: "transport", quantity: 18_000, unit: "km", period: "2026-05" },
];
