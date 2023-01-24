import { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs'
import { GridProps } from '@mui/material/Grid'

export interface BreadcrumbsItem {
  label: string
}

export interface BreadcrumbsProps
  extends Pick<MuiBreadcrumbsProps, 'ref' | 'sx'>,
    Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
  items: (BreadcrumbsItem | string)[]
}
