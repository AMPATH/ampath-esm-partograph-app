import { Button, ButtonSet, ComboBox, Form, TextInput } from "@carbon/react";
import { ResponsiveWrapper, showSnackbar, Workspace2, Workspace2DefinitionProps } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../forms.workspace.scss";
import TimeSlotPicker from "../time-slot-picker/time-slot-picker.component";

const validationSchema = z.object({
    timeSlot: z.string({ required_error: "Time slot is required" }),
    exactTime: z.date({ required_error: "End datetime is required" }),
    amnioticFluid: z.string({ required_error: "Amniotic fluid is required" }),
    moulding: z.string({ required_error: "Moulding is required" })
});

type PostFormSchema = z.infer<typeof validationSchema>;

interface MembraneAmnioticFluidAndMouldingFormProps {
    mutated: () => void
}

const MembraneAmnioticFluidAndMouldingForm: React.FC<Workspace2DefinitionProps<MembraneAmnioticFluidAndMouldingFormProps>> = ({ workspaceProps: { mutated }, closeWorkspace }) => {
    const { t } = useTranslation();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<PostFormSchema>({
        defaultValues: {},
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = async (data: PostFormSchema) => {
        if (!data.exactTime) {
            showSnackbar({
                title: t("error", "Error"),
                subtitle: t("invalidDates", "Invalid or missing dates"),
                timeoutInMs: 5000,
                isLowContrast: true,
                kind: "error",
            });
            return;
        }

        try {
            showSnackbar({
                title: t("dataSaved", "Data saved"),
                subtitle: t(
                    "dataSuccessfully",
                    "data saved successfully"
                ),
                timeoutInMs: 5000,
                isLowContrast: true,
                kind: "success",
            });
            mutated();
            closeWorkspace();
        } catch (error) {
            showSnackbar({
                title: t("error", "Error"),
                subtitle: t("errorSavingData", "Error saving data"),
                timeoutInMs: 5000,
                isLowContrast: true,
                kind: "error",
            });
        }
    };

    const onError = (error: any) => {
        console.error(error);
    };

    return (
        <Workspace2 title={t('addData', 'Add data')}>
            <Form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit, onError)}>
                <section className={styles.formGroup}>
                    <TimeSlotPicker control={control} errors={errors} />

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="amnioticFluid"
                            render={({ field: { onChange } }) => (
                                <ComboBox
                                    onChange={({ selectedItem }) => onChange(selectedItem.id)}
                                    id="amnioticFluid"
                                    items={[
                                        { id: "I", text: "I-Intact membranes" },
                                        { id: "C", text: "C-Clear liquor on ruptured membranes" },
                                        { id: "M", text: "M-Meconium stained liquor" },
                                        { id: "B", text: "B-Blood stained liquor" },
                                        { id: "A", text: "A-Absent liquor if membranes are ruptured" },
                                    ]}
                                    itemToString={(item) => (item ? item.text : "")}
                                    titleText={t("amnioticFluid", "Amniotic fluid")}
                                    placeholder={t("selectAmnioticFluid", "Select amniotic fluid")}
                                    invalid={!!errors.amnioticFluid}
                                    invalidText={errors.amnioticFluid?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="moulding"
                            render={({ field: { onChange } }) => (
                                <ComboBox
                                    onChange={({ selectedItem }) => onChange(selectedItem.id)}
                                    id="moulding"
                                    items={[
                                        { id: "0", text: "0" },
                                        { id: "+", text: "+" },
                                        { id: "++", text: "++" },
                                        { id: "+++", text: "+++" },
                                    ]}
                                    itemToString={(item) => (item ? item.text : "")}
                                    titleText={t("moulding", "Moulding")}
                                    placeholder={t("selectMoulding", "Select moulding")}
                                    invalid={!!errors.moulding}
                                    invalidText={errors.moulding?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>
                </section>
                <ButtonSet className={styles.buttonSetContainer}>
                    <Button onClick={() => closeWorkspace()} size="lg" kind="secondary">
                        {t("discard", "Discard")}
                    </Button>
                    <Button type="submit" size="lg" kind="primary">
                        {t("saveAndClose", "Save & Close")}
                    </Button>
                </ButtonSet>
            </Form>
        </Workspace2 >
    );
}

export default MembraneAmnioticFluidAndMouldingForm;