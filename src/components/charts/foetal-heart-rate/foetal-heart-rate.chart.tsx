import React, { useEffect, useMemo } from "react";
import { LineChart } from '@carbon/charts-react';
import '@carbon/charts-react/styles.css';
import options from "./options";
import { getHoursLabels } from "../../utils";
import AddObservationAction from "../../action/add-observation-action.component";

interface FoetalHeartRateChartProps {
    hello: string
}

const FoetalHeartRateChart: React.FC<FoetalHeartRateChartProps> = ({ hello }) => {
    const group = "Foetal Heart Rate";
    const workspaceName = "foetal-heart-rate-workspace";

    useEffect(() => {
        console.log(hello);
    }, []);

    const mutated = () => { };

    const data = useMemo(() => {
        const hoursLabels = getHoursLabels();

        const body = hoursLabels.map((hr) => {
            const value = Math.floor(Math.random() * 120);
            return {
                group: group,
                time: hr,
                value: value
            }
        });

        return body;
    }, []);
    return (
        <>
            <AddObservationAction workspaceName={workspaceName} mutated={mutated} />
            <LineChart data={data} options={options} />
        </>
    );
}

export default FoetalHeartRateChart;