import {
  ModalOverlay,
  Modal as ModalChakra,
  ModalContent,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  VStack,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  submitText?: string
  children: ReactNode
  onSubmit: (val: any) => void
}

const Modal = ({
  isOpen,
  onClose,
  title,
  submitText = "submit",
  children,
  onSubmit,
}: ModalProps) => {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>{children}</VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              {submitText}
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
