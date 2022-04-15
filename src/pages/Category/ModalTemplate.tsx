import { useEffect } from "react"
import { useForm } from "react-hook-form"

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react"

import { patchCategory, postCategory } from "@Api/index"

import FileUpload from "@Components/FileUpload"
import Modal from "@Components/Modal"

import convertImageToBase64 from "@Utils/convertImageToBase64"

interface ModalTemplateProps {
  isOpen: boolean
  onClose: () => void
  refetchData: () => void
  editData: { [key: string]: string | number }
}

const ModalTemplate = ({
  isOpen,
  onClose,
  refetchData,
  editData = {},
}: ModalTemplateProps) => {
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    watch,
    formState: { errors },
    setValue,
  } = useForm({})

  const watchPreviewImg = watch("image", [])

  const isPreviewImgObject = typeof watchPreviewImg === "object"
  const isEdit = !!editData.id

  const uploadImageUrl = () => {
    if (isPreviewImgObject) {
      if (watchPreviewImg) return watchPreviewImg[0]
      return undefined
    }
    return watchPreviewImg
  }

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

  useEffect(() => {
    Object.entries(editData).forEach(([key, val]) => {
      setValue(key, val)
    })
  }, [editData])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        reset({})
      }}
      title={`${isEdit ? "Edit" : "Create"} Category`}
      submitText={isEdit ? "Edit" : "Create"}
      onSubmit={handleSubmit(async val => {
        console.log(val)
        if (isEdit) {
          // edit
          const base64Image = isPreviewImgObject
            ? await convertImageToBase64(val.image[0]).then(data => data)
            : val.image

          patchCategory(editData.id, {
            ...val,
            image: base64Image,
          }).then(() => refetchData())
        } else {
          // create
          const base64Image = await convertImageToBase64(val.image[0]).then(
            data => data
          )

          postCategory({
            ...val,
            image: base64Image,
          }).then(() => refetchData())
        }

        onClose()
        reset({})
      })}
    >
      <FileUpload
        errors={errors}
        register={register("image", { validate: validateFiles })}
        uploadFile={uploadImageUrl()}
        handleClear={() => resetField("image")}
      />
      <FormField
        errors={errors}
        title="Name"
        value="name"
        placeholder="Input name"
        detail={register("name", { required: "Please input name" })}
      />
      <FormField
        errors={errors}
        title="Value"
        value="value"
        placeholder="Input value"
        detail={register("value", { required: "Please input value" })}
      />
    </Modal>
  )
}

interface FormFieldProps {
  errors: { [x: string]: any }
  title: string
  value: string
  detail: any
  placeholder: string
}

const FormField = ({
  errors,
  title,
  value,
  detail,
  placeholder,
}: FormFieldProps) => {
  const borderColor = useColorModeValue("gray.700", "gray.200")

  return (
    <FormControl isRequired isInvalid={errors[value]}>
      <FormLabel fontSize="14px" htmlFor={value}>
        {title}
      </FormLabel>
      <Input
        placeholder={placeholder}
        borderColor={borderColor}
        required={false}
        {...detail}
      />
      <FormErrorMessage>
        {errors[value] && errors[value].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default ModalTemplate
