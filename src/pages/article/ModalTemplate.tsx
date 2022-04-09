import {
  Button,
  ComponentWithAs,
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
  TextareaProps,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { useEffect, useMemo, useRef } from "react"
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form"
import FileUpload from "../../components/FileUpload"
import Modal from "../../components/Modal"
import convertImageToBase64 from "../../utils/convertImageToBase64"
import { postArticle, patchArticle } from "../../api"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./modalTemplate.css"
interface ModalTemplateProps {
  isOpen: boolean
  onClose: () => void
  categoryList: { name: string; value: string | number }[]
  statusList: { name: string; value: string | number }[]
  refetchData: () => void
  editData: { [key: string]: string | number }
}

const ModalTemplate = ({
  isOpen,
  onClose,
  categoryList,
  statusList,
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

  const watchPreviewImg = watch("previewImg", [])
  const watchContent = watch("content", [])

  const isPreviewImgObject = typeof watchPreviewImg === "object"
  const isEdit = !!editData.id
  const fields: Omit<FormFieldProps, "errors" | "setValue">[] = useMemo(
    () => [
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
        defaultValue: watchContent,
      },
      {
        title: "Emotion Icon",
        value: "emotionIcon",
        type: "text",
        placeholder: "Input emotion icon",
        detail: register("emotionIcon", {
          required: "Please input emotion ccon",
        }),
      },
      {
        title: "Emotion Number",
        value: "emotionNumber",
        type: "number",
        placeholder: "Input emotion number",
        detail: register("emotionNumber", {
          required: "Please input emotion number",
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
    ],
    [register, watchContent]
  )

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
      title={`${isEdit ? "Edit" : "Create"} Article`}
      submitText={isEdit ? "Edit" : "Create"}
      onSubmit={handleSubmit(async val => {
        if (isEdit) {
          // edit
          const base64Image = isPreviewImgObject
            ? await convertImageToBase64(val.previewImg[0]).then(data => data)
            : val.previewImg

          patchArticle(editData.id, {
            ...val,
            previewImg: base64Image,
          }).then(() => refetchData())
        } else {
          // create
          const base64Image = await convertImageToBase64(
            val.previewImg[0]
          ).then(data => data)

          postArticle({
            ...val,
            previewImg: base64Image,
          }).then(() => refetchData())
        }

        onClose()
        reset({})
      })}
    >
      <FileUpload
        errors={errors}
        register={register("previewImg", { validate: validateFiles })}
        uploadFile={uploadImageUrl()}
        handleClear={() => resetField("previewImg")}
      />
      {fields.map(field => (
        <FormField
          key={field.value}
          errors={errors}
          setValue={setValue}
          {...field}
        />
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
  setValue: UseFormSetValue<FieldValues>
  options?: { name: string; value: string | number }[]
  defaultValue?: string | number
}

const FormField = ({
  errors,
  title,
  value,
  detail,
  type,
  placeholder,
  setValue,
  options = [],
  defaultValue,
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
            required={false}
            {...detail}
          />
        )
      case "textarea":
        let filterTimeout: NodeJS.Timeout
        console.log("123")
        return (
          <div>
            <ReactQuill
              className="quill-wrapper"
              value={defaultValue as string}
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ header: [false, 6, 5, 4, 3, 2, 1] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ color: [] }, { background: [] }],
                  [
                    { align: [] },
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "font",
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "align",
                "color",
                "background",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
              // {...detail}
              onChange={e => {
                clearTimeout(filterTimeout)
                filterTimeout = setTimeout(() => {
                  setValue(value, e)
                }, 500)
              }}
            />
            {/* <input hidden {...detail} /> */}
          </div>
        )
      case "number":
        return (
          <Input
            type={type}
            placeholder={placeholder}
            borderColor={borderColor}
            required={false}
            {...detail}
          />
        )
      case "select":
        return (
          <Select
            placeholder={placeholder}
            borderColor={borderColor}
            required={false}
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
    <FormControl isRequired isInvalid={errors[value]}>
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
