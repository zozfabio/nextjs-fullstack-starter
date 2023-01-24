import { styled } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'

import { StyledMuiDataGridProps } from './types'

export const StyledDataGrid = styled((props: StyledMuiDataGridProps) => (
  <DataGrid {...props} />
))(({ theme, cellsBorder }) => ({
  border: 0,
  fontFamily: theme.typography.fontFamily,
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  '& .MuiPagination-root': {
    '& .MuiPaginationItem-root': {
      fontWeight: 'normal'
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      fontWeight: 'bold'
    },
    '& .MuiPaginationItem-page': {
      borderWidth: '0 0 0 0',
      borderRadius: 0
    },
    '& .MuiPaginationItem-previousNext': {
      borderRadius: 2 * +theme.shape.borderRadius
    },
    '& .MuiPaginationItem-firstLast': {
      borderRadius: 2 * +theme.shape.borderRadius
    }
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.grey['100']
  },
  '& .MuiDataGrid-columnHeader': {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    border: 0,
    '&:hover': {
      border: 0
    },
    '&:focus': {
      outline: 'none',
      border: 0
    },
    '&:focus-within': {
      outline: 'none',
      border: 0
    }
  },
  '& .MuiDataGrid-columnHeaderDraggableContainer': {
    height: '40px',
    padding: '0 7px 0 7px',
    border: `1px solid ${theme.palette.grey['200']}`,
    borderRadius: '8px'
  },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderDraggableContainer':
    {
      border: '0 !important'
    },
  '& .dg-noHeader .MuiDataGrid-columnHeaderDraggableContainer': {
    border: '0 !important',
    outline: 'none'
  },
  '& .dg-headerAction': {
    display: 'none'
  },
  '& .dg-noActions': {
    cursor: 'default'
  },
  '& .dg-noActions .MuiDataGrid-menuIcon': {
    display: 'none'
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.grey['800'],
    border: 0,
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 'normal',
    '&:focus': {
      outline: 'none !important'
    },
    ...((cellsBorder === undefined || cellsBorder === 'bottom') && {
      borderBottom: `1px solid ${theme.palette.grey['200']}`
    })
  },
  '& .MuiDataGrid-sortIcon': {
    color: theme.palette.grey['800']
  },
  '& .MuiDataGrid-selectedRowCount': {
    fontWeight: 'normal'
  }
}))
