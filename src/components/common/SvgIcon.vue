<template>
  <svg :class="getSvgClass" aria-hidden="true">
    <use :xlink:href="getIconName" />
  </svg>
</template>

<script>
import { computed } from "vue"
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const getIconName = computed(() => {
      return `#icon-${props.iconName}`
    })
    const getSvgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className
      } else {
        return "svg-icon"
      }
    })
    return {
      getIconName,
      getSvgClass,
    }
  },
}
</script>

<style scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  fill: #676767;
}
</style>
