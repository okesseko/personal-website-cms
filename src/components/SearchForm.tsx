/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"

import React from "react"
import { useForm } from "react-hook-form"

interface FieldProps {
  title: string
  value: string
  type: "text" | "number" | "select"
  placeholder: string
  options?: { name: string; value: string | number }[]
}

interface SearchFormProps {
  defaultValue: { [key: string]: string | number }
  fields: FieldProps[]
  onSubmit: (val: any) => void
}

const SearchForm = ({ defaultValue, fields, onSubmit }: SearchFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm(defaultValue)

  return (
    <form
      noValidate
      onSubmit={handleSubmit(obj =>
        // filter empty value
        onSubmit(Object.fromEntries(Object.entries(obj).filter(([_, v]) => v)))
      )}
      onReset={() => reset(defaultValue)}
    >
      <Stack direction={["column", "row"]} spacing="16px" textAlign="start">
        {fields.map(({ title, value, type, placeholder, options = [] }) => (
          <FormControl key={value}>
            <FormLabel fontSize="14px" htmlFor={value}>
              {title}
            </FormLabel>
            {type === "select" ? (
              <Select
                borderColor={useColorModeValue("gray.700", "gray.200")}
                defaultValue=""
                {...register(value)}
              >
                <option value="">All</option>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                borderColor={useColorModeValue("gray.700", "gray.200")}
                {...register(value)}
              />
            )}
          </FormControl>
        ))}
      </Stack>
      <HStack margin="10px 0" justify="flex-end">
        <Button type="submit" disabled={isSubmitting} colorScheme="blue">
          Search
        </Button>
        <Button type="reset" colorScheme="blue" variant="outline">
          Clear
        </Button>
      </HStack>
    </form>
  )
}

export default SearchForm
export type { FieldProps }
