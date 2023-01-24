export interface StepperRoutes {
  onCancel?: string
  onSubmit?: string
}

export type BreadcrumbsRoutes = string[]

export interface NuvyRoute {
  stepper?: StepperRoutes
  breadcrumbs?: BreadcrumbsRoutes
}

export type Routers = Record<string, NuvyRoute>

export interface NuvyRoutesContext {
  stepper?: StepperRoutes
  breadcrumbs?: BreadcrumbsRoutes
}

export interface RoutesProviderProps {
  routes: Routers
}
