import type { ActivityRecord, NewActivityRecord } from "../types/domain";
import { seedActivities } from "./seed";

// In memory store. Resets on page reload
let activities: ActivityRecord[] = [...seedActivities];
let nextActivityId = activities.length + 1;

// Artificial delay to simulate network latency
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

// Get all activities
export async function getActivities(): Promise<ActivityRecord[]> {
    await delay();
    return [...activities];
}

// Get activity by id
export async function getActivity(id: number): Promise<ActivityRecord> {
    await delay();
    const activity = activities.find(a => a.id === id);
    if (!activity) {
        throw new Error(`Activity with id ${id} not found`);
    }
    return { ...activity };
}

// Get activities by facility id
export async function getActivitiesByFacility(facilityId: number): Promise<ActivityRecord[]> {
    await delay();
    const facilityActivities = activities.filter(a => a.facilityId === facilityId);
    return { ...facilityActivities };
}

// Create a new activity record
export async function createActivity(payload: NewActivityRecord): Promise<ActivityRecord> {
    await delay();
    const newActivity: ActivityRecord = {
        id: nextActivityId++,
        ...payload
    };
    activities.push(newActivity);
    return { ...newActivity };
}

// Update an existing activity record
export async function updateActivity(id: number, payload: NewActivityRecord): Promise<ActivityRecord> {
    await delay();
    const updatedAcitvity: ActivityRecord = {
        id,
        ...payload
    };
    activities = activities.map(a => a.id === id ? updatedAcitvity : a);
    return { ...updatedAcitvity };
}

// Delete an activity record
export async function deleteActivity(id: number) {
    await delay();
    activities = activities.filter(a => a.id !== id);
}