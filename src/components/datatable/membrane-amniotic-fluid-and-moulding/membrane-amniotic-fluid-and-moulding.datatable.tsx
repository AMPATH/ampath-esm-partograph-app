import React, { useState } from "react";
import ObservationDatatable from "../observation-datatable.component";

const MembraneAmnioticFluidAndMouldingDatatable: React.FC = () => {
    const [tableRows, setTableRows] = useState([]);
    const workspaceName = "membrane-amniotic-fluid-and-moulding-workspace";

    const headers = [
        {
            key: "timeSlot",
            header: "Time slot (hr)"
        },
        {
            key: "time",
            header: "Exact time"
        },
        {
            key: "membraneAmnioticFluid",
            header: "Membrane amniotic fluid"
        },
        {
            key: "moulding",
            header: "Moulding"
        }
    ];

    return (
        <>
            <ObservationDatatable rows={tableRows} workspaceName={workspaceName} headers={headers} />
        </>
    );
}

export default MembraneAmnioticFluidAndMouldingDatatable;