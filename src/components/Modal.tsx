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
  size?:"4xl" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "5xl" | "6xl" | "full"
}

const Modal = ({
  isOpen,
  onClose,
  title,
  submitText = "submit",
  children,
  onSubmit,
  size="4xl"
}: ModalProps) => {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} size={size}>
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
