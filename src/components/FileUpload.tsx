import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Text,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { ReactNode, useRef } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { FiFile } from "react-icons/fi"
import { MdOutlineDeleteOutline } from "react-icons/md"

interface FileUploadProps {
  register: UseFormRegisterReturn
  errors: {
    [x: string]: any
  }
  uploadFile?: File
  handleClear: () => void
}

const FileUpload = ({
  register,
  errors,
  uploadFile,
  handleClear,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void
  }

  const handleClick = () => inputRef.current?.click()
  return (
    <FormControl isInvalid={errors.previewImg} isRequired>
      <FormLabel>{"File input"}</FormLabel>
      <InputGroup onClick={handleClick}>
        <input
          hidden
          type={"file"}
          accept={"image/*"}
          {...rest}
          ref={e => {
            ref(e)
            inputRef.current = e
          }}
        />

        <Button leftIcon={<FiFile />}>Upload</Button>
      </InputGroup>
      {uploadFile && (
        <VStack spacing={4}>
          <Text>{uploadFile.name}</Text>
          <Image
            width="200"
            height="200"
            objectFit="contain"
            src={URL.createObjectURL(uploadFile)}
          />
          <Button leftIcon={<MdOutlineDeleteOutline />} onClick={handleClear}>
            Clear
          </Button>
        </VStack>
      )}
      <FormErrorMessage>
        {errors.previewImg && errors.previewImg.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default FileUpload