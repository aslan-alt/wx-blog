// components/slider/slider.js
Component({
  data:{
      startPositionX: 0,
      goalPosition: 0,
      currentDistance: 0,
      maxDistance: 0,
      startMove: false,
      status: false

  },
  lifetimes: {
    ready: function() {
      // this.getRefWidthAndHeight('.canvasWrapper').then(res=>console.log(res))
       this.getImgPosition()
      //  const { xAxis, yAxis } = 
    }
  },
  
  // mounted() {
  

  //   // let imgWidth = 42, notchRadius = 10
  //   // const { canvasCtx, blockCtx } = this.initCanvasAndBlock({ xAxis, yAxis, imgWidth, notchRadius })
  //   // this.makeImg(canvasCtx, 'fill', xAxis, yAxis, imgWidth)
  //   // this.makeImg(blockCtx, 'clip', xAxis, yAxis, imgWidth)
  //   // this.$refs.track.style.height = `${this.getRefWidthAndHeight('slider').width}px`
  // },
  methods: {
    initPosition() {
      this.startMove = false
      this.$refs.slider.style.left = '0px'
      this.$refs.imgBlock.style.left = '0px'
      this.$refs.track.style.width = '0px'
    },
    clearPosition() {
      if (!this.status) {
        this.initPosition()
      }
    },
    clickDown(e) {
      this.startPositionX = e.clientX
      this.startMove = true
    },
    move(e) {
      if (this.startMove) {
        this.currentDistance = e.clientX - this.startPositionX
        if (this.currentDistance > 0 && this.currentDistance < this.maxDistance) {
          this.$refs.slider.style.left = `${this.currentDistance}px`
          this.$refs.imgBlock.style.left = `${this.currentDistance}px`
          this.$refs.track.style.width = `${this.currentDistance}px`
        }
      }
    },
    clickUp() {
      const errorDisdance = this.goalPosition - this.currentDistance
      if ((errorDisdance <= 2 && this.currentDistance <= this.goalPosition) || (errorDisdance >= -2 && this.currentDistance >= this.goalPosition)) {
        this.startMove = false
        this.status = true
      } else {
        this.initPosition()
      }
    },
    setMaxMoveDistance() {
      this.maxDistance = this.getRefWidthAndHeight('canvasWrapper').width - this.getRefWidthAndHeight('slider').width
    },
    makeImg(ctx, operation, x, y, imgWidth) {
      const PI = Math.PI, notchRadius = 10
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + imgWidth / 2, y)
      ctx.arc(x + imgWidth / 2, y - notchRadius + 2, notchRadius, 0, 2 * PI)
      ctx.lineTo(x + imgWidth / 2, y)
      ctx.lineTo(x + imgWidth, y)
      ctx.lineTo(x + imgWidth, y + imgWidth / 2)
      ctx.arc(x + imgWidth + notchRadius - 2, y + imgWidth / 2, notchRadius, 0, 2 * PI)
      ctx.lineTo(x + imgWidth, y + imgWidth / 2)
      ctx.lineTo(x + imgWidth, y + imgWidth)
      ctx.lineTo(x, y + imgWidth)
      ctx.lineTo(x, y)
      ctx.fillStyle = '#fff'
      ctx[operation]()
      ctx.beginPath()
      ctx.arc(x, y + imgWidth / 2, notchRadius, 1.5 * PI, 0.5 * PI) // 只需要画正方形内的半圆就行，方便背景图片的裁剪
      ctx.globalCompositeOperation = "xor"
      ctx.fill()
    },
    getImgPosition() {
      let imgWidth,CanvasHeight
      // imgWidth = await this.getRefWidthAndHeight('.slider')
      // console.log(imgWidth)
      // imgWidth = res.width
      // const  = this.getRefWidthAndHeight('canvasWrapper').height
      // const  maxHeight = CanvasHeight - imgWidth
      // const xAxis = Math.floor(Math.random() * (this.maxDistance - imgWidth)) + imgWidth
      // const yAxis = Math.floor(Math.random() * (maxHeight - imgWidth)) + imgWidth
      // this.goalPosition = xAxis  { xAxis, yAxis }
      return 
    },
    initCanvasAndBlock({ xAxis, yAxis, imgWidth, notchRadius }) {
      let canvas = document.getElementById('myCanvas')
      let block = document.getElementById('myBlock')
      let canvasCtx = canvas.getContext('2d')
      let blockCtx = block.getContext('2d')
      let img = document.createElement('img')
      img.onload = function () {
        canvasCtx.drawImage(img, 0, 0, 310, 155)
        blockCtx.drawImage(img, 0, 0, 310, 155)
        var blockWidth = imgWidth + notchRadius * 2
        var _y = yAxis - notchRadius * 2 + 2 // 滑块实际的y坐标
        var ImageData = blockCtx.getImageData(xAxis, _y, blockWidth, blockWidth)
        block.width = blockWidth
        blockCtx.putImageData(ImageData, 0, _y)
      };
      img.src = require('./assets/images.jpg')
      return { canvasCtx, blockCtx }
    },
    // getRefWidthAndHeight(dom) {
    //   const { width, height } = this.$refs[dom].getBoundingClientRect()
    //   console.log(`${dom}的宽度${width},高度${height}`)
    //   return { width, height }
    // },
    getRefWidthAndHeight(nodeName){
      return new Promise((resolve,reject)=>{
        wx.createSelectorQuery().in(this).select(nodeName).boundingClientRect(function(rect){
          resolve(rect)
        }).exec()
      })
    },
  }
  
})
