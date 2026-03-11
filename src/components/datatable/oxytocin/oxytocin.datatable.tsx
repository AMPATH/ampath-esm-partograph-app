import React, { useState } from "react";
import ObservationDatatable from "../observation-datatable.component";

const OxytocinDatatable: React.FC = () => {
    const [tableRows, setTableRows] = useState([]);
    const workspaceName = "oxytocin-workspace";

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
            key: "oxytocin",
            header: "Oxytocin U/L"
        },
        {
            key: "drops",
            header: "Drops /min"
        },
    ];

    return (
        <>
            <ObservationDatatable rows={tableRows} workspaceName={workspaceName} headers={headers} />
        </>
    );
}

export default OxytocinDatatable;