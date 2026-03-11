import React, { useState } from "react";
import ObservationDatatable from "../observation-datatable.component";

const DrugsAndFluidsDatatable: React.FC = () => {
    const [tableRows, setTableRows] = useState([]);
    const workspaceName = "drugs-and-fluids-workspace";

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
            key: "drugs",
            header: "Drugs/IV fluids"
        }
    ];

    return (
        <>
            <ObservationDatatable rows={tableRows} workspaceName={workspaceName} headers={headers} />
        </>
    );
}

export default DrugsAndFluidsDatatable;