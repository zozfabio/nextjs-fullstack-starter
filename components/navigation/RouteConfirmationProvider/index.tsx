import React, { PropsWithChildren, useCallback, useState } from 'react'

import { useModal, Modal } from 'components/modal'

import { Context } from './hooks'
import { NuvyRouteConfirmation, ModalState } from './types'

export { useNavigationConfirmationContext } from './hooks'

const RouteConfirmationProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const [confirmation, setConfirmation] = useState<NuvyRouteConfirmation>()
  const [isModalOpen, openModal, closeModal, modalState] = useModal<ModalState>(
    {
      closeOn: []
    }
  )
  const confirm = useCallback((): Promise<void> => {
    if (confirmation) {
      return new Promise((resolve, reject) => {
        openModal({
          resolve,
          reject
        })
      })
    }
    return Promise.resolve()
  }, [confirmation, openModal])
  const onClickYes = useCallback(() => {
    closeModal()
    modalState?.resolve && modalState?.resolve()
  }, [closeModal, modalState])
  const onClickNo = useCallback(() => {
    closeModal()
    modalState?.reject && modalState?.reject()
  }, [closeModal, modalState])
  return (
    <>
      <Context.Provider value={{ confirmation, setConfirmation, confirm }}>
        {children}
      </Context.Provider>
      {confirmation && (
        <Modal
          id="nuvy-form-navigation-confirm-modal"
          open={isModalOpen}
          maxWidth="sm"
          title={confirmation.title}
          titleSx={{ p: 2 }}
          disableCloseButton
          contentText={confirmation.message}
          contentSx={{ p: 2 }}
          primaryActionLabel={'Sim'}
          secondaryActionLabel={'Não'}
          primaryActionOnClick={onClickYes}
          secondaryActionOnClick={onClickNo}
          actionsSx={{ px: 2, pb: 2 }}
        />
      )}
    </>
  )
}

export default RouteConfirmationProvider
