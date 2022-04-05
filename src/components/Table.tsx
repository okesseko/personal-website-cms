import React from "react";
import {
  Table as TableChakra,
  TableContainer,
  Tbody,
  Td,
  TableCellProps,
  Th,
  Thead,
  Image,
  Tr,
  Text,
  useColorModeValue,
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
          ><Text noOfLines={2} lineHeight='1.2' fontSize='md' >{content}</Text></Td>;
        })}
      </Tr>
    ));
  }

  return (
    <TableContainer
      flexGrow={1}
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
          height:'6px'
        },
        '&::-webkit-scrollbar-thumb': {
          background:useColorModeValue("#A0AEC0", "#e2e8f0"),
          borderRadius: '6px',
        },
      }}
    >
      <TableChakra variant="simple" colorScheme="telegram" >
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
      </TableChakra>
    </TableContainer>
  );
};

export default Table;
export type { TableHeaderProps, TableDataProps };
