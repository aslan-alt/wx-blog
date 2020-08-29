import request from './request'

const URL = {
  GET_LIST: '/blog:page',
  GET_DETAIL:"/blog/:blogId",
  CREATE:"/blog",
  UPDATE:"/blog/:blogId",
  DELETE:"/blog/:blogId"
}
export default {
  getBlogs({ page=1, userId, atIndex=false } = { page: 1,atIndex:false }) {
    let url
    if(userId){
      url = URL.GET_LIST.replace(":page",`?page=${page}&userId=${userId}&atIndex=${atIndex}`)
    }else{
      url = URL.GET_LIST.replace(":page",`?page=${page}`)
    }
    return request(url, 'GET', { page, userId, atIndex })
  },
 
  getIndexBlogs({ page=1 } = { page: 1}) {
    return this.getBlogs({ page, atIndex: true })
  },
  getBlogsByUserId(userId, { page=1, atIndex } = { page: 1}) {
    return this.getBlogs({ userId, page, atIndex })
  },
  getDetail({blogId}){
    return request(URL.GET_DETAIL.replace(":blogId",blogId))
  },
  updateBlog({blogId},{title,content,description,atIndex}){
    return request(URL.UPDATE.replace(":blogId",blogId),"PATCH",{title,content,description,atIndex})
  },
  deleteBlog({blogId}){
    return request(URL.DELETE.replace(":blogId",blogId),"DELETE")
  }
}