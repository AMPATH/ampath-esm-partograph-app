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
    oxytocin: z.string({ required_error: "Oxytocin is required" }),
    drops: z.string({ required_error: "Drops are required" })
});

type PostFormSchema = z.infer<typeof validationSchema>;

interface OxytocinFormProps {
    mutated: () => void
}

const OxytocinForm: React.FC<Workspace2DefinitionProps<OxytocinFormProps>> = ({ workspaceProps: { mutated }, closeWorkspace }) => {
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
                            name="oxytocin"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="oxytocin"
                                    labelText={t("oxytocin", "Oxytocin U/L *")}
                                    placeholder={t('enterOxytocin', 'Enter oxytocin e.g., 10/1')}
                                    invalid={!!errors.oxytocin}
                                    invalidText={errors.oxytocin?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="drops"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="drops"
                                    labelText={t("drops", "Drops /min *")}
                                    placeholder={t('enterDrops', 'Enter drops')}
                                    invalid={!!errors.oxytocin}
                                    invalidText={errors.oxytocin?.message}
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

export default OxytocinForm;