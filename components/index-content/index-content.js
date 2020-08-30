// components/content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogData:{
      type:Object,
      value:{}
    }
  },
  methods:{
    toDetail(e){
      const blogid = e.target.dataset && e.target.dataset.blogid && e.target.dataset.blogid.id
      wx.navigateTo({
        url: `/pages/detail/index?blogId=${blogid}`,
      })
    }
  },



})
