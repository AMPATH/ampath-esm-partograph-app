import React, { useEffect, useMemo } from "react";
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import options from "./options";
import { getHoursLabels } from "../../utils";
import AddObservationAction from "../../action/add-observation-action.component";

interface CervicalChartProps {
    hello: string
}

const CervicalChart: React.FC<CervicalChartProps> = ({ hello }) => {
    const group = "Alert Line";
    const group1 = "Action Line";
    const workspaceName = "cervical-workspace";

    useEffect(() => {
        console.log(hello);
    }, []);

    const mutated = () => { };

    const data = useMemo(() => {
        const hoursLabels = getHoursLabels(1);

        const body = hoursLabels.map((hr) => {
            const value = Math.floor(Math.random() * 10);
            return [{
                group: group,
                time: hr,
                value: value
            }, {
                group: group1,
                time: hr,
                value: value + 2
            }]
        }).flatMap((g) => g);

        return body;
    }, []);
    return (
        <>
            <AddObservationAction workspaceName={workspaceName} mutated={mutated} />
            <LineChart data={data} options={options} />
        </>
    );
}

export default CervicalChart;