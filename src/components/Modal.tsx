import {
  ModalOverlay,
  Modal as ModalChakra,
  ModalContent,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  onReset:(val: any) => void
  onSubmit: (val: any) => void
}

const Modal = ({
  isOpen,
  onClose,
  children,
  onReset,
  onSubmit,
}: ModalProps) => {

  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <ModalHeader>Create Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button type="reset" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalChakra>
  )
}

export default Modal
