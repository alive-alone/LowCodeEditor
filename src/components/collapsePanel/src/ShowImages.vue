<template>
  <div class="show-image">
    <ul class="show-image_ul">
      <li class="show-image_li">
        <div class="image-box" v-for="(item, index) in images" :key="index">
          <img class="image-box_img" :src="item" @click="selectIndex($event, item)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "ShowModule",
  components: {},
  emits: ["selectImg"],
  props: {
    images: {
      type: Array,
    },
  },
  setup(props, ctx) {
    const selectIndex = (event: any, src: string) => {
      let element = event.target
      let scale = element.naturalWidth / element.naturalHeight
      ctx.emit("selectImg", { src, scale })
    }
    return {
      selectIndex,
    }
  },
})
</script>
<style lang="less" scoped>
.show-image {
  .show-image_ul {
    height: 91.9871px;
    margin: 0;
    padding: 0;
    .show-image_li {
      list-style: none;
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;
      .image-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .image-box_img {
          height: 91.9871px;
          background-color: #f8fafc;
        }
      }
    }
  }
}
</style>
