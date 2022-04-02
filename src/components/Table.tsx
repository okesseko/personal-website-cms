import React from "react";
import {
  Table as TableChakra,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Image,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface TableHeaderProps {
  type: "string" | "number" | "time" | "image";
  title: string;
  key: string;
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

          switch (type) {
            case "string":
              return <Td key={key}>{value}</Td>;
            case "number":
              return (
                <Td isNumeric key={key}>
                  {new Intl.NumberFormat("en").format(value as number)}
                </Td>
              );
            case "time":
              return <Td key={key}>{dayjs(value).format("YYYY-MM-DD")}</Td>;
            case "image":
              return (
                <Td key={key}>
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={value as string}
                  />
                </Td>
              );
            default:
              <Td key={key}>{value}</Td>;
          }
        })}
      </Tr>
    ));
  }

  return (
    <TableContainer>
      <TableChakra variant="simple" colorScheme="telegram">
        <TableCaption placement="top">
          Imperial to metric conversion factors
        </TableCaption>
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
          {/* <Tr>
            <Td>inches</Td>
            <Td style={{ width: "10px" }}>
              millimetres (mm)asdadasdasdasdasdasdasdas
            </Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
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
