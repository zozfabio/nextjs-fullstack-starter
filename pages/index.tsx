import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import { MainLayout } from 'components/layout'

import { Dashboard } from 'modules'

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  )
}
export default DashboardPage
