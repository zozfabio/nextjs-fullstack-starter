import {
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridFilterMenuItem,
  SortGridMenuItems,
  HideGridColMenuItem,
  GridColumnsMenuItem
} from '@mui/x-data-grid'

const CustomColumnMenu = (props: GridColumnMenuProps) => {
  const { hideMenu, currentColumn, ...other } = props
  if (currentColumn.field === 'actions') {
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        {...other}
      >
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn!} />
        <GridColumnsMenuItem onClick={hideMenu} column={currentColumn!} />
      </GridColumnMenuContainer>
    )
  }
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      {...other}
    >
      <SortGridMenuItems onClick={hideMenu} column={currentColumn!} />
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn!} />
    </GridColumnMenuContainer>
  )
}

export default CustomColumnMenu
