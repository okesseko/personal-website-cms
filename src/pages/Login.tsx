import { useState } from "react"
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  useColorModeValue,
  FormErrorMessage,
  AlertIcon,
  Alert,
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { useForm } from "react-hook-form"

import { loginAccount, setAuthHeader } from "../api"
import { useNavigate } from "react-router-dom"

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({})
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleShowClick = () => setShowPassword(!showPassword)
  const clearErrorMsg = () => setErrorMsg("")

  const login = (value: any) => {
    loginAccount(value)
      .then(res => {
        setAuthHeader(res.data.token)
        navigate('/')
      })
      .catch(err => {
        setErrorMsg(err.response.data)
        reset()
      })
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={useColorModeValue("gray.200", "gray.900")}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg={useColorModeValue("teal.500", "teal.700")} />
        <Heading color={useColorModeValue("teal.400", "teal.600")}>
          Welcome
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(login)} onChange={clearErrorMsg}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor={useColorModeValue("whiteAlpha.900", "gray.700")}
              boxShadow="md"
              borderRadius="8px"
            >
              <FormControl isInvalid={errors.account}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    placeholder="account"
                    {...register("account", {
                      required: "Please input account",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.account && errors.account.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Please input password",
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      color="white"
                      backgroundColor="gray.700"
                      _hover={{ backgroundColor: "gray.700" }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Box marginTop="48px !important">
                <Button
                  borderRadius={8}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
        <Alert status="error" visibility={errorMsg ? "visible" : "hidden"}>
          <AlertIcon />
          {errorMsg}
        </Alert>
      </Stack>
    </Flex>
  )
}

export default Login
