import { Box,Flex, Text } from '@chakra-ui/react'
import {
  MdKeyboardArrowLeft,
 MdKeyboardArrowRight,
} from "react-icons/md";
import ReactPaginate from 'react-paginate';
import './pagination.css';

interface PaginationProps{
    page: number,
    totalSize: number;
    onPageChange: (chagedPage: number) => void;
}

const Pagination = ({page,totalSize,onPageChange}:PaginationProps) => {
   

    return (
        <Box>
            <Flex alignItems='center' justifyContent='space-between'>
                <Text fontSize='md' lineHeight='1' >{`Showing ${Math.max((page -1 * 10)+1,1) } to ${Math.min(page * 10,totalSize)} of ${totalSize}`}</Text>
        <ReactPaginate
            breakLabel="..."
            containerClassName='pagination-container'
            previousClassName='pagination-page'
            nextClassName='pagination-page'
            pageLinkClassName='pagination-page'
            activeLinkClassName='pagination-page--selected'
            disabledClassName='pagination-page--disabled'
            disabledLinkClassName='pagination-page--disabled'
            previousLabel={<MdKeyboardArrowLeft  fontSize={16}/>}
            onPageChange={(e) => onPageChange(e.selected)}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(totalSize/10)}
            nextLabel={<MdKeyboardArrowRight fontSize={16} />}
                />
                </Flex>
    </Box>
  )
}



export default Pagination