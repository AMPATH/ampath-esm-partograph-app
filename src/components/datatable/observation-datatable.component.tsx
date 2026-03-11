import { DataTable, Layer, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tile } from "@carbon/react";
import React from "react";
import AddObservationAction from "../action/add-observation-action.component";
import styles from './observation-datatable.scss';
import { useTranslation } from "react-i18next";

interface ObservationDatatableProps {
    workspaceName: string;
    headers: Array<{ key: string, header: string }>;
    rows: Array<any>;
}

const ObservationDatatable: React.FC<ObservationDatatableProps> = ({ workspaceName, headers, rows }) => {
    const { t } = useTranslation();
    const mutated = () => { }

    return (
        <>
            <AddObservationAction workspaceName={workspaceName} mutated={mutated} />

            <DataTable rows={rows} headers={headers} isSortable>
                {({
                    rows,
                    headers,
                    getTableProps,
                    getHeaderProps,
                    getRowProps,
                    getCellProps,
                }) => (
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow {...getRowProps({ row })}>
                                    {row.cells.map((cell) => (
                                        <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DataTable>

            {rows?.length === 0 && (
                <div className={styles.filterEmptyState}>
                    <Layer>
                        <Tile className={styles.filterEmptyStateTile}>
                            <p className={styles.filterEmptyStateContent}>
                                {t('noObservationsToDisplay', 'No observations to display')}
                            </p>
                        </Tile>
                    </Layer>
                </div>
            )}
        </>
    )
}

export default ObservationDatatable;