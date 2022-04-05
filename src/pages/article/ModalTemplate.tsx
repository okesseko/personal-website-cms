import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"
import FileUpload from "../../components/FileUpload"
import Modal from "../../components/Modal"

interface ModalTemplateProps {
  isOpen: boolean
  onClose: () => void
}

const ModalTemplate = ({ isOpen, onClose }: ModalTemplateProps) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm()

  const fields: Omit<FormFieldProps, "errors">[] = [
    {
      title: "Title",
      value: "title",
      isRequired: true,
      type: "text",
      placeholder: "Input title",
      detail: register("title", { required: "Please input title" }),
    },
    {
      title: "Category",
      value: "category",
      isRequired: true,
      type: "text",
      placeholder: "Select category",
      detail: register("category", { required: "Please select category" }),
    },
    {
      title: "Preview Image",
      value: "previewImg",
      isRequired: true,
      type: "image",
      placeholder: "Upload image",
      detail: register("Image", { required: "Please upload image" }),
    },
    {
      title: "Content",
      value: "content",
      isRequired: true,
      type: "text",
      placeholder: "Input content",
      detail: register("content", { required: "Please input content" }),
    },
    {
      title: "Emotion Icon",
      value: "emotionIcon",
      isRequired: true,
      type: "text",
      placeholder: "Input emotion icon",
      detail: register("emotionIcon", {
        required: "Please input emotionIcon",
        maxLength: 3,
      }),
    },
    {
      title: "Emotion Number",
      value: "emotionNumber",
      isRequired: true,
      type: "number",
      placeholder: "Input emotion number",
      detail: register("emotionNumber", {
        required: "Please input emotionNumber",
      }),
    },
    {
      title: "Status",
      value: "status",
      isRequired: true,
      type: "number",
      placeholder: "Select status",
      detail: register("status", { required: "Please select status" }),
    },
    {
      title: "Release Time",
      value: "releaseTime",
      isRequired: true,
      type: "date",
      placeholder: "Select release time",
      detail: register("releaseTime", {
        required: "Please select releaseTime",
      }),
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(val => console.log(val, errors))}
      onReset={() => reset({})}
    >
      <FileUpload
        name="avatar"
        acceptedFileTypes="image/*"
        isRequired={true}
        placeholder="Your avatar"
        errors={errors}
        control={control}
      >
        New avatar
      </FileUpload>
      {/* {fields.map(field => (
        <FormField key={field.value} errors={errors} {...field} />
      ))} */}
    </Modal>
  )
}

interface FormFieldProps {
  errors: { [x: string]: any }
  title: string
  value: string
  isRequired: boolean
  detail: any
  type: React.HTMLInputTypeAttribute
  placeholder: string
}

const FormField = ({
  errors,
  title,
  value,
  isRequired,
  detail,
  type,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormControl /*isRequired={isRequired}*/ isInvalid={errors[value]}>
      <FormLabel fontSize="14px" htmlFor={value}>
        {title}
      </FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        borderColor={useColorModeValue("gray.700", "gray.200")}
        {...detail}
      />
      <FormErrorMessage>
        {errors[value] && errors[value].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default ModalTemplate
