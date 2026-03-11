import React, { useState } from "react";
import ObservationDatatable from "../observation-datatable.component";

const UrineDatatable: React.FC = () => {
    const [tableRows, setTableRows] = useState([]);
    const workspaceName = "urine-workspace";

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
            key: "protein",
            header: "Protein"
        },
        {
            key: "ketones",
            header: "Ketones"
        },
        {
            key: "volume",
            header: "Volume (ml)"
        },
    ];

    return (
        <>
            <ObservationDatatable rows={tableRows} workspaceName={workspaceName} headers={headers} />
        </>
    );
}

export default UrineDatatable;