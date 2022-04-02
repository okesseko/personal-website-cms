import React, { useEffect, useState } from "react";
import { getArticle } from "../api";
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

  useEffect(() => {
    getIntroList();
  }, []);

  function getIntroList(order = "desc") {
    getArticle({ order })
      .then((res) => {
        setTableData(res.data.articles);
        setTotalSize(res.data.totalSize);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <Table tableHeader={tableHeader} tableData={tableData} />;
};

export default Article;
