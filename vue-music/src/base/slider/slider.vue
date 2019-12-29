<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    // 获取slider宽度方法
    _getSliderWidth() {
      // 获取屏幕宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // 轮播图外框宽度
      let width = 0
      // 获取每个轮播图元素
      let childrenSlider = this.$refs.sliderGroup.children
      for (let index = 0; index < childrenSlider.length; index++) {
        let child = childrenSlider[index]
        // 给每个轮播图赋值宽度和添加class值
        child.style.width = sliderWidth + 'px'
        addClass(child, 'slider-item')
        // 给轮播图外层设置宽度
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      // 最终把width赋值给轮播图外狂sliderGroup
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化scroll
    _initBetterScroll() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
    }
  },
  mounted() {
    // 调用获取宽度方法和初始化
    setTimeout(() => {
      this._getSliderWidth()
      this._initBetterScroll()
    }, 20)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>