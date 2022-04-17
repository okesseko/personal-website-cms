import { useEffect, useMemo, useRef } from "react";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./modalTemplate.css";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { patchArticle, postArticle } from "@Api/index";

import FileUpload from "@Components/FileUpload";
import Modal from "@Components/Modal";

import convertImageToBase64 from "@Utils/convertImageToBase64";

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

  const quillRef = useRef<ReactQuill>(null)
  
  const watchPreviewImg = watch("previewImg", [])
  const watchContent = watch("content", [])

  const isPreviewImgObject = typeof watchPreviewImg === "object"
  const isEdit = !!editData.id
  const fields: Omit<FormFieldProps, "errors" | "quillRef">[] = useMemo(
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
      {
        title: "Content",
        value: "content",
        type: "textarea",
        placeholder: "Input content",
        detail: register("content", { required: "Please input content" }),
        defaultValue: watchContent,
      },
    ],
    [register, watchContent, categoryList]
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
      if (key === "releaseTime") setValue(key, dayjs(val).format("YYYY-MM-DD"))
      else setValue(key, val)
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
      handleSubmitButtonClick={ ()=> setValue('content', quillRef.current)}
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
          quillRef={quillRef}
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
  quillRef: React.LegacyRef<ReactQuill>
  options?: { name: string; value: string | number }[]
  defaultValue?: string
}

const FormField = ({
  errors,
  title,
  value,
  detail,
  type,
  placeholder,
  quillRef,
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
        return (
          <div>
            <ReactQuill
              ref={quillRef}
              className="quill-wrapper"
              defaultValue={defaultValue}
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
            />
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
