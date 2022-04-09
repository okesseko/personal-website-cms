import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { getArticle, getCategory,deleteArticle } from "../../api"
import Modal from "../../components/Modal"
import Pagination from "../../components/Pagination"
import SearchForm, { FieldProps } from "../../components/SearchForm"
import Table, { TableDataProps, TableHeaderProps } from "../../components/Table"
import getCategoryInfo from "../../utils/getCategoryInfo"
import { MdAdd } from "react-icons/md"
import { FiAlertCircle } from "react-icons/fi"
import ModalTemplate from "./ModalTemplate"


const TABLE_HEADER: TableHeaderProps[] = [
  {
    type: "string",
    title: "title",
    key: "title",
  },
  {
    type: "string",
    title: "category",
    key: "category",
  },
  {
    type: "image",
    title: "preview image",
    key: "previewImg",
  },
  {
    type: "string",
    title: "content",
    key: "content",
    style: { whiteSpace: "break-spaces", maxW: "300px" },
  },
  {
    type: "string",
    title: "emotion icon",
    key: "emotionIcon",
  },
  {
    type: "number",
    title: "emotion number",
    key: "emotionNumber",
  },
  {
    type: "string",
    title: "status",
    key: "status",
  },
  {
    type: "time",
    title: "release time",
    key: "releaseTime",
  },
]

const STATUS = ["Hidden", "Visiable"]

const Article = () => {
  const {
    isOpen: isModalTemplateOpen,
    onOpen: onModalTemplateOpen,
    onClose: onModalTemplateClose
  } = useDisclosure()

   const {
    isOpen: isDeleteComfirmOpen,
    onOpen: onDeleteComfirmOpen,
    onClose: onDeleteComfirmClose
  } = useDisclosure()

  const [categoryList, setCategoryList] = useState<
    { name: string; value: string }[]
  >([])
  const [searchCondition, setSearchCondition] = useState<{
    [key: string]: string | number
  }>({ page: 1 })
  const [tableData, setTableData] = useState<TableDataProps[]>([])
  const [totalSize, setTotalSize] = useState(0)
  const [editInfo, setEditInfo] = useState({})
  const [deleteId, setDeleteId] = useState('')

  const categoryOptions = categoryList.map(({ name, value }) => ({
    name,
    value,
  }))
  const statusOptions = STATUS.map((name, index) => ({ name, value: index }))

  const SearchFields: FieldProps[] = [
    {
      title: "Title",
      value: "title",
      type: "text",
      placeholder: "Search by title",
    },
    {
      title: "Content",
      value: "content",
      type: "text",
      placeholder: "Search by content",
    },
    {
      title: "Category",
      value: "category",
      type: "select",
      placeholder: "Search by category",
      options: categoryOptions,
    },
    {
      title: "Status",
      value: "status",
      type: "select",
      placeholder: "Search by status",
      options: statusOptions,
    },
  ]

  useEffect(() => {
    getCategoryList()
  }, [])

  function getCategoryList() {
    getCategory()
      .then(res => setCategoryList(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    // clear edit info when close modal
    if (!isModalTemplateOpen) setEditInfo({})
  }, [isModalTemplateOpen])

  useEffect(() => {
    getIntroList()
  }, [categoryList, searchCondition])

  function getIntroList(order = "desc") {
    getArticle({ order, ...searchCondition })
      .then(res => {
        setTableData(
          res.data.articles.map((article: any) => {
            const category = getCategoryInfo(categoryList, article.category)
            return {
              ...article,
              category: category?.name,
              status: STATUS[article.status],
            }
          })
        )
        setTotalSize(res.data.totalSize)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function actionClick(type: "edit" | "delete", id: string) {
    if (type === "edit") {
      getArticle({ id }).then(res => {
        setEditInfo(res.data.articles[0])
        onModalTemplateOpen()
      })
    } else {
      setDeleteId(id)
      onDeleteComfirmOpen()
    }
  }

  return (
    <Box h="100%">
      <Flex h="100%" direction="column">
        <SearchForm
          defaultValue={{
            title: "",
            category: "",
            content: "",
          }}
          fields={SearchFields}
          onSubmit={val =>
            setSearchCondition({ page: searchCondition.page, ...val })
          }
        />
        <Button
          width="fit-content"
          size="sm"
          variant="outline"
          borderColor={useColorModeValue("gray.700", "gray.200")}
          onClick={onModalTemplateOpen}
          leftIcon={<MdAdd />}
        >
          Creat Article
        </Button>
        <Table
          tableHeader={TABLE_HEADER}
          tableData={tableData}
          onActionClick={actionClick}
        />
        <Pagination
          page={searchCondition.page as number}
          totalSize={totalSize}
          onPageChange={chagedPage =>
            setSearchCondition({ ...searchCondition, page: chagedPage })
          }
        />
      </Flex>
      <ModalTemplate
        isOpen={isModalTemplateOpen}
        onClose={onModalTemplateClose}
        categoryList={categoryOptions}
        statusList={statusOptions}
        refetchData={getIntroList}
        editData={editInfo}
      />
      <Modal
        size="md"
        title="Comfirm Delete?"
        isOpen={isDeleteComfirmOpen}
        onClose={() => {
          setDeleteId('')
          onDeleteComfirmClose()
        }}
        submitText="Comfirm"
        onSubmit={(e) => {
          e.preventDefault();
          deleteArticle(deleteId).then(() => {
            getIntroList()
          }).finally(() => { 
            setDeleteId('')
          onDeleteComfirmClose()
          })
        }}
      >
        <FiAlertCircle fontSize={64} color="#E53E3E" />
        <Text fontSize={24}>Can't be recovered after deletion</Text> 
      </Modal>
    </Box>
  )
}

export default Article
