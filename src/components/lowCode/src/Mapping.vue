<template>
  <template v-if="typeKey === 'text'">
    <!-- <textarea
      :style="styleValue"
      :value="attbutes.text ? attbutes.text : '双击修改文字'"
      class="textarea"
    ></textarea> -->
    <span :style="styleValue">{{ attbutes.text }}</span>
    <!-- <div class="text-edit">
      <input class="text-edit-input" :style="styleValue" placeholder="please" />
    </div> -->
    <!-- <input class="text-edit-input" :style="styleValue" placeholder="please" /> -->
  </template>
  <template v-else-if="typeKey === 'img'">
    <img
      :src="attbutes.src ? attbutes.src : '@/assets/images/monster.svg'"
      :alt="attbutes.alt"
      :style="styleValue"
    />
  </template>
  <template v-else-if="typeKey === 'input'">
    <input
      :placeholder="attbutes.placeholder ? attbutes.placeholder : ''"
      :value="attbutes.text ? attbutes.text : ''"
      :type="attbutes.type"
      :style="styleValue"
    />
  </template>
  <template v-else-if="typeKey === 'button'">
    <button :style="styleValue">{{ attbutes.text ? attbutes.text : "按钮" }}</button>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Home",
  components: {},
  props: {
    typeKey: {
      type: String,
    },
    styleValue: {
      type: Object,
    },
    attbutes: {
      type: Object,
    },
  },
})
</script>
<style lang="less" scoped>
.textarea {
  border: none;
  outline: none;
  resize: none;
}
.text-edit {
  padding: 0 5px;
}
.text-edit-input {
  border: none;
  background-color: transparent;
}
.text-edit-input:focus {
  outline: none;
}
</style>
