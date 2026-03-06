import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';

const PartographDashboard: React.FC = () => {
    return (
        <>
            <div>Hello from Dashboard</div>
            <ExtensionSlot name='partograph-chart-slot'/>
        </>
    );
}

export default PartographDashboard;