import React, { useState } from "react";
import ObservationDatatable from "../observation-datatable.component";

const TemperatureDatatable: React.FC = () => {
    const [tableRows, setTableRows] = useState([]);
    const workspaceName = "temperature-workspace";

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
            key: "temperature",
            header: "Temperature (°C)"
        }
    ];

    return (
        <>
            <ObservationDatatable rows={tableRows} workspaceName={workspaceName} headers={headers} />
        </>
    );
}

export default TemperatureDatatable;