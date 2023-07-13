import { z } from 'zod'
import { FunctionComponent } from 'react'
import { Box, Grid, Button } from '@mui/material'

import { Form, InputText, useForm } from 'components/form'

export const Watching: FunctionComponent = () => {
  const [watch] = useForm((form) => form.watch)
  const firstname = watch('firstName')
  const lastname = watch('lastName')
  return (
    <>
      {firstname} {lastname}
    </>
  )
}

const FirstName: FunctionComponent = () => (
  <InputText name="firstName" label="First Name" variant="outlined" />
)

const LastName: FunctionComponent = () => (
  <InputText name="lastName" label="Last Name" variant="outlined" />
)

let renderCount = 0
const Dashboard: FunctionComponent = () => {
  console.warn('render', ++renderCount)
  return (
    <Box m={2}>
      <Form
        schema={z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional()
        })}
        onSubmit={(values) => {
          // eslint-disable-next-line no-console
          console.log('TODO submit', values)
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FirstName />
          </Grid>
          <Grid item xs={6}>
            <LastName />
          </Grid>
          <Grid item xs={12}>
            <Watching />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Box>
  )
}

export default Dashboard
