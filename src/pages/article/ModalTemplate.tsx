import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"
import FileUpload from "../../components/FileUpload"
import Modal from "../../components/Modal"
import { FiFile } from "react-icons/fi"
import convertImageToBase64 from "../../utils/convertImageToBase64"
import { postArticle } from "../../api"
import ReactQuill from "react-quill"
interface ModalTemplateProps {
  isOpen: boolean
  onClose: () => void
  categoryList: { name: string; value: string | number }[]
  statusList: { name: string; value: string | number }[]
}

const ModalTemplate = ({
  isOpen,
  onClose,
  categoryList,
  statusList,
}: ModalTemplateProps) => {
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm()
  const watchPreviewImg = watch("previewImg", [])

  const fields: Omit<FormFieldProps, "errors">[] = [
    {
      title: "Title",
      value: "title",
      type: "text",
      placeholder: "Input title",
      detail: register("title", { required: "Please input title" }),
    },
    {
      title: "Category",
      value: "category",
      type: "select",
      placeholder: "Select category",
      detail: register("category", { required: "Please select category" }),
      options: categoryList,
    },
    {
      title: "Content",
      value: "content",
      type: "textarea",
      placeholder: "Input content",
      detail: register("content", { required: "Please input content" }),
    },
    {
      title: "Emotion Icon",
      value: "emotionIcon",
      type: "text",
      placeholder: "Input emotion icon",
      detail: register("emotionIcon", {
        required: "Please input emotionIcon",
      }),
    },
    {
      title: "Emotion Number",
      value: "emotionNumber",
      type: "number",
      placeholder: "Input emotion number",
      detail: register("emotionNumber", {
        required: "Please input emotionNumber",
      }),
    },
    {
      title: "Status",
      value: "status",
      type: "select",
      placeholder: "Select status",
      detail: register("status", { required: "Please select status" }),
      options: statusList,
    },
    {
      title: "Release Time",
      value: "releaseTime",
      type: "date",
      placeholder: "Select release time",
      detail: register("releaseTime", {
        required: "Please select releaseTime",
      }),
    },
  ]

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required"
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb"
      }
    }
    return true
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(async val => {
        const base64Image = await convertImageToBase64(val.previewImg[0]).then(
          data => data
        )
        postArticle({
          ...val,
          previewImg: base64Image,
        })
        onClose()
      })}
      onReset={() => reset({})}
    >
      <FileUpload
        errors={errors}
        register={register("previewImg", { validate: validateFiles })}
        uploadFile={watchPreviewImg ? watchPreviewImg[0] : undefined}
        handleClear={() => resetField("previewImg")}
      />
      {fields.map(field => (
        <FormField key={field.value} errors={errors} {...field} />
      ))}
    </Modal>
  )
}

interface FormFieldProps {
  errors: { [x: string]: any }
  title: string
  value: string
  detail: any
  type: "text" | "number" | "date" | "select" | "textarea"
  placeholder: string
  options?: { name: string; value: string | number }[]
}

const FormField = ({
  errors,
  title,
  value,
  detail,
  type,
  placeholder,
  options = [],
}: FormFieldProps) => {
  const borderColor = useColorModeValue("gray.700", "gray.200")

  function Field() {
    switch (type) {
      case "text":
      case "date":
        return (
          <Input
            type={type}
            placeholder={placeholder}
            borderColor={borderColor}
            {...detail}
          />
        )
      case "textarea":
        return (
          <ReactQuill />
          // <Textarea
          //   size="md"
          //   resize="vertical"
          //   placeholder={placeholder}
          //   borderColor={borderColor}
          //   {...detail}
          // />
        )
      case "number":
        return (
          <NumberInput
            min={1}
            max={20}
            placeholder={placeholder}
            borderColor={borderColor}
            {...detail}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )
      case "select":
        return (
          <Select
            placeholder={placeholder}
            borderColor={borderColor}
            {...detail}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
        )
    }
  }

  return (
    <FormControl /*isRequired={isRequired}*/ isInvalid={errors[value]}>
      <FormLabel fontSize="14px" htmlFor={value}>
        {title}
      </FormLabel>
      <Field />
      <FormErrorMessage>
        {errors[value] && errors[value].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default ModalTemplate
