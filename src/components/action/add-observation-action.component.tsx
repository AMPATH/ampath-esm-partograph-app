import { Button } from "@carbon/react"
import { Add } from "@carbon/react/icons";
import { launchWorkspace2 } from "@openmrs/esm-framework";
import React from "react"
import { useTranslation } from "react-i18next"
import styles from "./add-observation-action.scss";

interface AddObservationActionProps {
    workspaceName: string;
    mutated: () => void
}

const AddObservationAction: React.FC<AddObservationActionProps> = ({ workspaceName, mutated }) => {
    const { t } = useTranslation();

    const handleLaunchWorkspace = () => {
        launchWorkspace2(workspaceName, {
            mutated
        });
    }

    return (
        <div className={styles.addContainer}>
            <Button
                kind="primary"
                onClick={handleLaunchWorkspace}
                renderIcon={Add}
            >{t("add", "Add")}</Button>
        </div>
    )
}

export default AddObservationAction;