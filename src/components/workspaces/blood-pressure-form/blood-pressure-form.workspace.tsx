import { Button, ButtonSet, Form, TextInput } from "@carbon/react";
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
    pulseCount: z.string({ required_error: "Pulse count is required" }),
    systolic: z.string({ required_error: "Systolic is required" }),
    diastolic: z.string({ required_error: "Diastolic is required" })
});

type PostFormSchema = z.infer<typeof validationSchema>;

interface BloodPressureFormProps {
    mutated: () => void
}

const BloodPressureForm: React.FC<Workspace2DefinitionProps<BloodPressureFormProps>> = ({ workspaceProps: { mutated }, closeWorkspace }) => {
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
                            name="pulseCount"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="pulseCount"
                                    labelText={t("pulseCount", "Pulse count *")}
                                    placeholder={t('enterPulseCount', 'Enter pulse count')}
                                    invalid={!!errors.pulseCount}
                                    invalidText={errors.pulseCount?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="systolic"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="systolic"
                                    labelText={t("systolic", "Systolic (Upper) *")}
                                    placeholder={t('enterSystolic', 'Enter systolic')}
                                    invalid={!!errors.systolic}
                                    invalidText={errors.systolic?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="diastolic"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="diastolic"
                                    labelText={t("diastolic", "Diastolic (Lower) *")}
                                    placeholder={t('enterDiastolic', 'Enter diastolic')}
                                    invalid={!!errors.diastolic}
                                    invalidText={errors.diastolic?.message}
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

export default BloodPressureForm;