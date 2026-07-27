// src/App.tsx
import { FacilitiesPage } from "./features/facilities/FacilitiesPage";
import { ActivityForm } from "./features/activities/ActivityForm";
import { createActivity } from "./api/activities";

export default function App() {
  return (
    <>
      <FacilitiesPage />

      {/* temporary — ticket 03 ex 3. Remove once ActivitiesPage exists in ticket 04. */}
      <section>
        <h2>Add a reading — Munich Plant</h2>
        <ActivityForm
          facilityId={1}
          onSubmit={async payload => {
            const saved = await createActivity(payload);
            console.log("saved", saved);
          }}
        />
      </section>
    </>
  );
}