import axios from "axios"

const defaultRequest = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

const setAuthHeader = token => {
  defaultRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`
  window.sessionStorage.setItem("token", token)
}

const getAuthHeader = () => {
  return !!(
    defaultRequest.defaults.headers.common["Authorization"] ||
    window.sessionStorage.getItem("token")
  )
}

const clearAuthHeader = () => {
  delete defaultRequest.defaults.headers.common["Authorization"]
  window.sessionStorage.removeItem("token")
}

// login
const loginAccount = body =>
  defaultRequest({
    data: body,
    method: "post",
    url: "/login",
  })

// user
const getUser = params =>
  defaultRequest({
    params,
    method: "get",
    url: "/user",
  })

const patchUser = (id, body) =>
  defaultRequest({
    data: body,
    method: "patch",
    url: `/user/${id}`,
  })

// article
const getArticle = params =>
  defaultRequest({
    params,
    method: "get",
    url: "/article",
  })

const postArticle = body =>
  defaultRequest({
    data: body,
    method: "post",
    url: "/article",
  })

const patchArticle = (id, body) =>
  defaultRequest({
    data: body,
    method: "patch",
    url: `/article/${id}`,
  })

const deleteArticle = id =>
  defaultRequest({
    method: "delete",
    url: `/article/${id}`,
  })

// category
const getCategory = params =>
  defaultRequest({
    params,
    method: "get",
    url: "/category",
  })

const postCategory = body =>
  defaultRequest({
    data: body,
    method: "post",
    url: "/category",
  })

const patchCategory = (id, body) =>
  defaultRequest({
    data: body,
    method: "patch",
    url: `/category/${id}`,
  })

const deleteCategory = id =>
  defaultRequest({
    method: "delete",
    url: `/category/${id}`,
  })

export {
  setAuthHeader,
  getAuthHeader,
  clearAuthHeader,
  loginAccount,
  getUser,
  patchUser,
  getArticle,
  postArticle,
  patchArticle,
  deleteArticle,
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory,
}
