import type { EmissionFactor } from "../types/domain";
import { seedFactors } from "./seed";

// In memory store. Resets on page reload
let emissionFactors: EmissionFactor[] = [...seedFactors];

// Artificial delay to simulate network latency
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

// Get all emission factors
export async function getEmissionFactors(): Promise<EmissionFactor[]> {
    await delay();
    return [...emissionFactors];
}