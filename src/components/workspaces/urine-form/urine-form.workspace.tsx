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
    protein: z.string({ required_error: "Protein is required" }),
    ketones: z.string({ required_error: "Ketones is required" }),
    volume: z.string({ required_error: "Volume is required" })
});

type PostFormSchema = z.infer<typeof validationSchema>;

interface UrineFormProps {
    mutated: () => void
}

const UrineForm: React.FC<Workspace2DefinitionProps<UrineFormProps>> = ({ workspaceProps: { mutated }, closeWorkspace }) => {
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
                            name="protein"
                            render={({ field: { onChange } }) => (
                                <ComboBox
                                    onChange={({ selectedItem }) => onChange(selectedItem.id)}
                                    id="protein"
                                    items={[
                                        { id: "+", text: t("positive", "Positive") },
                                        { id: "-", text: t("negative", "Negative") }
                                    ]}
                                    itemToString={(item) => (item ? item.text : "")}
                                    titleText={t("protein", "Protein")}
                                    placeholder={t("selectValue", "Select value")}
                                    invalid={!!errors.protein}
                                    invalidText={errors.protein?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="ketones"
                            render={({ field: { onChange } }) => (
                                <ComboBox
                                    onChange={({ selectedItem }) => onChange(selectedItem.id)}
                                    id="ketones"
                                    items={[
                                        { id: "+", text: t("positive", "Positive") },
                                        { id: "-", text: t("negative", "Negative") }
                                    ]}
                                    itemToString={(item) => (item ? item.text : "")}
                                    titleText={t("Ketones", "Ketones")}
                                    placeholder={t("selectValue", "Select value")}
                                    invalid={!!errors.protein}
                                    invalidText={errors.protein?.message}
                                />
                            )}
                        />
                    </ResponsiveWrapper>

                    <ResponsiveWrapper>
                        <Controller
                            control={control}
                            name="volume"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id="volume"
                                    labelText={t("volume", "Volume (ml) *")}
                                    placeholder={t('enterVolume', 'Enter volume')}
                                    invalid={!!errors.volume}
                                    invalidText={errors.volume?.message}
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

export default UrineForm;