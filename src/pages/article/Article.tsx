import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { getArticle, getCategory } from "../../api"
import Modal from "../../components/Modal"
import Pagination from "../../components/Pagination"
import SearchForm, { FieldProps } from "../../components/SearchForm"
import Table, { TableDataProps, TableHeaderProps } from "../../components/Table"
import getCategoryInfo from "../../utils/getCategoryInfo"
import { MdAdd } from "react-icons/md"
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
    style: { whiteSpace: "break-spaces" },
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categroyList, setCategoryList] = useState<
    { name: string; value: string }[]
  >([])
  const [searchCondtion, setSearchCondition] = useState<{
    [key: string]: string | number
  }>({ page: 1 })
  const [tableData, setTableData] = useState<TableDataProps[]>([])
  const [totalSize, setTotalSize] = useState(0)

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
      options: categroyList.map(({ name, value }) => ({ name, value })),
    },
    {
      title: "Status",
      value: "status",
      type: "select",
      placeholder: "Search by status",
      options: STATUS.map((name, index) => ({ name, value: index })),
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
    getIntroList()
  }, [categroyList, searchCondtion])

  function getIntroList(order = "desc") {
    getArticle({ order, ...searchCondtion })
      .then(res => {
        setTableData(
          res.data.articles.map((article: any) => {
            const category = getCategoryInfo(categroyList, article.category)
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
    console.log(type, id)
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
            setSearchCondition({ page: searchCondtion.page, ...val })
          }
        />
        <Button
          width="fit-content"
          size="sm"
          variant='outline'
          borderColor={useColorModeValue("gray.700", "gray.200")}
          onClick={onOpen}
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
          page={searchCondtion.page as number}
          totalSize={totalSize}
          onPageChange={chagedPage =>
            setSearchCondition({ ...searchCondtion, page: chagedPage })
          }
        />
      </Flex>
      <ModalTemplate isOpen={isOpen} onClose={onClose}  />
    </Box>
  )
}

export default Article
