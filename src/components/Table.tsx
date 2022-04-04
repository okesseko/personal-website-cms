import React from "react";
import {
  Table as TableChakra,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  TableCellProps,
  Tfoot,
  Th,
  Thead,
  Image,
  Tr,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface TableHeaderProps {
  type: "string" | "number" | "time" | "image";
  title: string;
  key: string;
  style?: TableCellProps;
}

interface TableDataProps {
  [key: string]: string | number;
}

interface TableProps {
  tableData: TableDataProps[];
  tableHeader: TableHeaderProps[];
}

const Table = ({ tableData, tableHeader }: TableProps) => {
  function mappingTableData() {
    return tableData.map((data) => (
      <Tr key={data.id}>
        {tableHeader.map((headerData) => {
          const type = headerData.type;
          const key = headerData.key;
          const value = data[key];
          let content;
          switch (type) {
            case "string":
              content = value;
              break
            case "number":
              content = new Intl.NumberFormat("en").format(value as number);
              break
            case "time":
              content = dayjs(value).format("YYYY-MM-DD")
              break
            case "image":
              content =
                <Image
                  boxSize="60px"
                  objectFit="cover"
                  m="auto"
                  borderRadius="8px"
                  src={value as string}
                />
              break
            default:
              content = '';
          }
          return <Td
            key={key}
            isNumeric={type === "number"}
            {...(headerData.style||{})}
          ><Text noOfLines={2}>{content}</Text></Td>;
        })}
      </Tr>
    ));
  }

  return (
    <TableContainer>
      <TableChakra variant="simple" colorScheme="telegram">
        <Thead>
          <Tr>
            {tableHeader.map(({ type, key, title }) => (
              <Th key={key} isNumeric={type === "number"}>
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {mappingTableData()}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </TableChakra>
    </TableContainer>
  );
};

export default Table;
export type { TableHeaderProps, TableDataProps };
