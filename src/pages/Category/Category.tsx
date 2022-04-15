import { useEffect, useState } from "react"
import { FiAlertCircle } from "react-icons/fi"

import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react"

import { deleteCategory, getCategory } from "@Api/index"

import Modal from "@Components/Modal"
import Pagination from "@Components/Pagination"
import SearchForm, { FieldProps } from "@Components/SearchForm"
import Table, { TableDataProps, TableHeaderProps } from "@Components/Table"

import ModalTemplate from "./ModalTemplate"

const TABLE_HEADER: TableHeaderProps[] = [
  {
    type: "string",
    title: "name",
    key: "name",
  },
  {
    type: "string",
    title: "value",
    key: "value",
  },
  {
    type: "image",
    title: "image",
    key: "image",
  },
]

const Category = () => {
  const {
    isOpen: isModalTemplateOpen,
    onOpen: onModalTemplateOpen,
    onClose: onModalTemplateClose,
  } = useDisclosure()

  const {
    isOpen: isDeleteConfirmOpen,
    onOpen: onDeleteConfirmOpen,
    onClose: onDeleteConfirmClose,
  } = useDisclosure()

  const [searchCondition, setSearchCondition] = useState<{
    [key: string]: string | number
  }>({ page: 1, limit: 10 })
  const [tableData, setTableData] = useState<TableDataProps[]>([])
  const [totalSize, setTotalSize] = useState(0)
  const [editInfo, setEditInfo] = useState({})
  const [deleteId, setDeleteId] = useState("")

  const SearchFields: FieldProps[] = [
    {
      title: "Name",
      value: "name",
      type: "text",
      placeholder: "Search by name",
    },
    {
      title: "Value",
      value: "value",
      type: "text",
      placeholder: "Search by value",
    },
  ]

  useEffect(() => {
    // clear edit info when close modal
    if (!isModalTemplateOpen) setEditInfo({})
  }, [isModalTemplateOpen])

  useEffect(() => {
    getCategoryList()
  }, [searchCondition])

  function getCategoryList(order = "desc") {
    getCategory({ order, ...searchCondition })
      .then(res => {
        setTableData(res.data.categories)
        setTotalSize(res.data.totalSize)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function actionClick(type: "edit" | "delete", id: string) {
    if (type === "edit") {
      getCategory({ id }).then(res => {
        setEditInfo(res.data.categories[0])
        onModalTemplateOpen()
      })
    } else {
      setDeleteId(id)
      onDeleteConfirmOpen()
    }
  }

  return (
    <Box h="100%">
      <Flex h="100%" direction="column">
        <SearchForm
          defaultValue={{
            name: "",
            value: "",
          }}
          fields={SearchFields}
          onSubmit={val =>
            setSearchCondition({ page: searchCondition.page, ...val })
          }
          onCreateClick={onModalTemplateOpen}
          createTitle="Create Category"
        />
        <Table
          tableHeader={TABLE_HEADER}
          tableData={tableData}
          onActionClick={actionClick}
        />
        <Pagination
          page={searchCondition.page as number}
          totalSize={totalSize}
          onPageChange={changedPage => {
            console.log(changedPage)
            setSearchCondition({ ...searchCondition, page: changedPage + 1 })
          }}
        />
      </Flex>
      <ModalTemplate
        isOpen={isModalTemplateOpen}
        onClose={onModalTemplateClose}
        refetchData={getCategoryList}
        editData={editInfo}
      />
      <Modal
        size="md"
        title="Comfirm Delete?"
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setDeleteId("")
          onDeleteConfirmClose()
        }}
        submitText="Comfirm"
        onSubmit={e => {
          e.preventDefault()
          deleteCategory(deleteId)
            .then(() => {
              getCategoryList()
            })
            .finally(() => {
              setDeleteId("")
              onDeleteConfirmClose()
            })
        }}
      >
        <FiAlertCircle fontSize={64} color="#E53E3E" />
        <Text fontSize={24}>Can't be recovered after deletion</Text>
      </Modal>
    </Box>
  )
}

export default Category
