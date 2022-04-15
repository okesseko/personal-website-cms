import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"

import { getUser, patchUser } from "@Api/index"

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm({})

  const [accountList, setAccountList] = useState([])

  const [changePasswordMsg, setChangePasswordMsg] = useState<{
    status: "error" | "success"
    message: string
    visibility: boolean
  }>({
    status: "error",
    message: "",
    visibility: false,
  })
  const clearErrorMsg = () =>
    setChangePasswordMsg({ status: "error", message: "", visibility: false })

  const watchNewPassword = watch("newPassword")

  const changePassword = (value: any) => {
    const { account, oldPassword, newPassword } = value
    patchUser(account, { oldPassword, newPassword })
      .then(() => {
        setChangePasswordMsg({
          status: "success",
          message: "Password change successful",
          visibility: true,
        })
        reset()
      })
      .catch(err =>
        setChangePasswordMsg({
          status: "error",
          message: err.response.data,
          visibility: true,
        })
      )
  }

  useEffect(() => {
    getUser().then(res => {
      setAccountList(res.data.users)
    })
  }, [])

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Stack flexDir="column" justifyContent="center" alignItems="center">
        <Avatar bg={useColorModeValue("teal.500", "teal.700")} />
        <Heading color={useColorModeValue("teal.400", "teal.600")}>
          Change Password
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form
            onSubmit={handleSubmit(changePassword)}
            onChange={clearErrorMsg}
          >
            <Stack spacing={4} p="1rem" boxShadow="md" borderRadius="8px">
              <FormControl isInvalid={errors.account}>
                <FormLabel fontSize="14px">Account</FormLabel>
                <Select
                  placeholder="Please select account"
                  {...register("account", {
                    required: "Please select account",
                  })}
                >
                  {accountList.map(({ account, id }) => (
                    <option key={account} value={id}>
                      {account}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.account && errors.account.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.oldPassword}>
                <FormLabel fontSize="14px">Old Password</FormLabel>
                <Input
                  placeholder="Old Password"
                  {...register("oldPassword", {
                    required: "Please input old password",
                  })}
                />
                <FormErrorMessage>
                  {errors.oldPassword && errors.oldPassword.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.newPassword}>
                <FormLabel fontSize="14px">New Password</FormLabel>
                <Input
                  type="password"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "Please input new password",
                  })}
                />
                <FormErrorMessage>
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.newPasswordConfirm}>
                <FormLabel fontSize="14px">New Password Confirm</FormLabel>
                <Input
                  type="password"
                  placeholder="Please input new password again"
                  {...register("newPasswordConfirm", {
                    validate: {
                      compareWithNewPassword: v =>
                        v === watchNewPassword || "Password is different",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.newPasswordConfirm &&
                    errors.newPasswordConfirm.message}
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
                  Change
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
        <Alert
          status={changePasswordMsg.status}
          visibility={changePasswordMsg.visibility ? "visible" : "hidden"}
        >
          <AlertIcon />
          {changePasswordMsg.message}
        </Alert>
      </Stack>
    </Flex>
  )
}

export default ChangePassword
