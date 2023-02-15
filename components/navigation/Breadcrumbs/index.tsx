import { FunctionComponent, useCallback } from 'react'

import { useRouter } from 'next/router'

import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

import {
  useRoutesContext,
  useNavigationConfirmationContext
} from 'components/navigation'

import { BreadcrumbsProps } from './types'

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({
  items,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  const router = useRouter()
  const routes = useRoutesContext()

  const { confirm } = useNavigationConfirmationContext()

  const onClick = useCallback(
    (link: string) => {
      confirm()
        .then(() => {
          router && router.push(link)
        })
        .catch(() => {
          //
        })
    },
    [confirm, router]
  )

  const breadcrumb = (
    <MuiBreadcrumbs separator=">" aria-label="Nuvy breadcrumbs" {...rest}>
      {items.map((item, i) => {
        const isLastItem = items.length === i + 1
        const label = typeof item === 'string' ? item : item.label
        const link =
          routes && routes.breadcrumbs
            ? i <= routes.breadcrumbs.length - 1
              ? routes.breadcrumbs[i]
              : ''
            : ''
        if (isLastItem) {
          return (
            <Typography
              key={i}
              variant="caption"
              fontWeight={700}
              fontSize={16}
              color="#000000"
            >
              {label}
            </Typography>
          )
        }
        if (link) {
          return (
            <Link
              key={i}
              onClick={() => onClick(link)}
              underline="none"
              component={Typography}
              variant="caption"
              fontWeight={700}
              fontSize={16}
              color="#888888"
              sx={{ cursor: 'pointer' }}
            >
              {label}
            </Link>
          )
        }
        return (
          <Typography
            key={i}
            variant="caption"
            fontWeight={700}
            fontSize={16}
            color="#888888"
          >
            {label}
          </Typography>
        )
      })}
    </MuiBreadcrumbs>
  )
  if (xs || sm || md || lg || xl) {
    return (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {breadcrumb}
      </Grid>
    )
  }
  return breadcrumb
}

export default Breadcrumbs
