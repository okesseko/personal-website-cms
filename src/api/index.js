import axios from "axios"

const defaultRequest = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
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
  getArticle,
  postArticle,
  patchArticle,
  deleteArticle,
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory,
}
