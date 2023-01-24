import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MainLayout } from 'components/layout'

import { Dashboard } from 'modules'

const DashboardPage: NextPage = () => {
  const { t } = useTranslation('dashboard')
  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  )
}
export default DashboardPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(`${locale}`, ['dashboard']))
    }
  }
}
