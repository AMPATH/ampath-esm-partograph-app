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
    cervicalDilation: z.string({ required_error: "Cervical dilation is required" }),
    descent: z.string({ required_error: "Descent is required" })
});

type PostFormSchema = z.infer<typeof validationSchema>;

interface CervicalFormProps {
    mutated: () => void
}

const CervicalForm: React.FC<Workspace2DefinitionProps<CervicalFormProps>> = ({ workspaceProps: { mutated }, closeWorkspace }) => {
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
                            name="cervicalDilation"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="cervicalDilation"
                                    labelText={t("cervicalDilation", "Cervical dilation (cm) *")}
                                    placeholder={t('enterCervicalDilation', 'Enter cervical dilation (0-10 cm)')}
                                    invalid={!!errors.cervicalDilation}
                                    invalidText={errors.cervicalDilation?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="descent"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="descent"
                                    labelText={t("descent", "Descent *")}
                                    placeholder={t('enterDescent', 'Enter the descent (0-5)')}
                                    invalid={!!errors.descent}
                                    invalidText={errors.descent?.message}
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

export default CervicalForm;