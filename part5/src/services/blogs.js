import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1});
  return response.data;
}

export default { getAll, create, setToken, addLike };