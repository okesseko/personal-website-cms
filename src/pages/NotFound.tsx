import { Flex, Button, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Text fontSize="72px">Oops!</Text>
      <Text fontSize="50px" marginTop="24px" marginBottom="36px">
        Seems you are missing
      </Text>
      <Button
        height="fit-content"
        fontSize="24px"
        padding="16px 16px"
        colorScheme="blue"
      >
        <Link to="/">Click me go back</Link>
      </Button>
    </Flex>
  )
}

export default NotFound
