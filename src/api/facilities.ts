import type { Facility, NewFacility } from "../types/domain";
import { seedFacilities } from "./seed";

// In memory store. Resets on page reload
let facilities: Facility[] = [...seedFacilities];
let nextId = facilities.length + 1

// Artificial delay to simulate network latency
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

// Get all facilities
export async function getFacilities(): Promise<Facility[]> {
    await delay();
    return [...facilities];
}

// detail page
export async function getFacility(id: number): Promise<Facility> {
    await delay();
    const facility = facilities.find(f => f.id === id);
    if (!facility) {
        throw new Error(`Facility with id ${id} not found`);
    }
    return { ...facility };
}

// site registration
export async function createFacility(payload: NewFacility): Promise<Facility> {
    await delay();
    const newFacility: Facility = { id: nextId++, ...payload };
    facilities.push(newFacility);
    return { ...newFacility };
}

// site rename, location change ...
export async function updateFacility(id: number, payload: NewFacility): Promise<Facility> {
    await delay();
    const updatedFacility: Facility = { id, ...payload };
    facilities = facilities.map(f => f.id === id ? updatedFacility : f);
    return { ...updatedFacility };
}

// site closed, entered by mistake ...
export async function deleteFacility(id: number): Promise<void> {
    await delay();
    facilities = facilities.filter(f => f.id !== id);
}