const getCategoryInfo = (categoryList: any, targetValue: string) => {
  return categoryList.find((category:any) => category.value === targetValue)
}

export default getCategoryInfo
