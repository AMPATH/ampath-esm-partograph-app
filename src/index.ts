/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import { patientChartPartographMetaData } from './dashboard-meta';

const moduleName = '@ampath/esm-partograph-app';

const options = {
  featureName: 'partograph',
  moduleName,
};

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

/**
 * This named export tells the app shell that the default export of `root.component.tsx`
 * should be rendered when the route matches `root`. The full route
 * will be `openmrsSpaBase() + 'root'`, which is usually
 * `/openmrs/spa/root`.
 */
export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const patientChartPartographLink = getSyncLifecycle(
  createDashboardLink(patientChartPartographMetaData),
  options,
);

// Charts
export const foetalHeartRateChart = getAsyncLifecycle(() => import('./components/charts/foetal-heart-rate/foetal-heart-rate.chart'), options);
export const cervicalChart = getAsyncLifecycle(() => import('./components/charts/cervical/cervical.chart'), options);
export const bloodPressureChart = getAsyncLifecycle(() => import('./components/charts/blood-pressure/blood-pressure.chart'), options);

// Datatables
export const drugsAndFluidsDatatable = getAsyncLifecycle(() => import('./components/datatable/drugs-and-fluids/drugs-and-fluids.datatable'), options);
export const membraneAmnioticFluidAndMouldingDatatable = getAsyncLifecycle(() => import('./components/datatable/membrane-amniotic-fluid-and-moulding/membrane-amniotic-fluid-and-moulding.datatable'), options);
export const oxytocinDatatable = getAsyncLifecycle(() => import('./components/datatable/oxytocin/oxytocin.datatable'), options);
export const temperatureDatatable = getAsyncLifecycle(() => import('./components/datatable/temperature/temperature.datatable'), options);
export const urineDatatable = getAsyncLifecycle(() => import('./components/datatable/urine/urine.datatable'), options);