import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react"
import { FiFile } from "react-icons/fi"
import { useController } from "react-hook-form"
import { useRef } from "react"

const FileUpload = ({
  errors,
  name,
  placeholder,
  acceptedFileTypes,
  control,
  children,
  isRequired = false,
}: any) => {
  const inputRef = useRef<any>(null)
  const {
    field: { ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  })

  return (
    <FormControl isInvalid={errors[name]}>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        {/* <input
          type="file"
          accept={acceptedFileTypes}
          ref={inputRef}
          {...inputProps}
          name={name}
        
          style={{ display: "none" }}
        /> */}
        <Input
          name={name}
          type="file"
          accept={acceptedFileTypes}
          placeholder={placeholder}
          // onClick={() => inputRef.current.click()}
          value={value}
        />
      </InputGroup>
      <FormErrorMessage>
        {" "}
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default FileUpload
