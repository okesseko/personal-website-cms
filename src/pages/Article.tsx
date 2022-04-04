import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getArticle } from "../api";
import Pagination from "../components/Pagination";
import Table, { TableDataProps, TableHeaderProps } from "../components/Table";

const tableHeader: TableHeaderProps[] = [
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
    style:{whiteSpace:'break-spaces'}
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
];

const Article = () => {
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getIntroList();
  }, []);

  function getIntroList(order = "desc") {
    getArticle({ order,page })
      .then((res) => {
        setTableData(res.data.articles);
        setTotalSize(res.data.totalSize);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return <Box>
    <Table tableHeader={tableHeader} tableData={tableData} />
    <Pagination page={page} totalSize={totalSize} onPageChange={(chagedPage)=>setPage(chagedPage)} />
  </Box>
};

export default Article;
