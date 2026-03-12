import { ComboBox, FormLabel, Layer } from "@carbon/react";
import React from "react";
import styles from "../forms.workspace.scss";
import { useTranslation } from "react-i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { OpenmrsDatePicker, ResponsiveWrapper } from "@openmrs/esm-framework";

interface TimeSlotPickerProps {
    control: Control<{
        timeSlot?: string;
        exactTime?: Date;
    }, any, {
        timeSlot?: string;
        exactTime?: Date;
    }>
    errors: FieldErrors<{
        timeSlot?: string;
        exactTime?: Date;
    }>;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ control, errors }) => {
    const { t } = useTranslation();

    return (
        <>
            <ResponsiveWrapper>
                <Controller
                    control={control}
                    name="timeSlot"
                    render={({ field: { onChange } }) => (
                        <ComboBox
                            onChange={({ selectedItem }) => onChange(selectedItem.id)}
                            id="timeSlot"
                            items={[
                                { id: "SUCCESSFUL", text: t("successful", "Successful") },
                                {
                                    id: "PARTIALLY_SUCCESSFUL",
                                    text: t("partiallySuccessful", "Partially success"),
                                },
                                {
                                    id: "NOT_SUCCESSFUL",
                                    text: t("notSuccessfully", "Not successful"),
                                },
                            ]}
                            itemToString={(item) => (item ? item.text : "")}
                            titleText={t("timeSlot", "Time slot")}
                            placeholder={t("selectTimeSlot", "Select time slot")}
                            invalid={!!errors.timeSlot}
                            invalidText={errors.timeSlot?.message}
                        />
                    )}
                />
            </ResponsiveWrapper>
            <ResponsiveWrapper>
                <Controller
                    control={control}
                    name="exactTime"
                    render={({ field: { onChange, value } }) => (
                        <OpenmrsDatePicker
                            value={value}
                            id="exactTime"
                            labelText={t("time", "Time")}
                            onChange={onChange}
                            isInvalid={!!errors.exactTime}
                        />
                    )}
                />
            </ResponsiveWrapper>
        </>
    );
}

export default TimeSlotPicker;