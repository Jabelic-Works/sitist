<template>
  <div>
    <input
      ref="textInput"
      v-model="inputValue"
      type="text"
      class="input_snipetts"
      :readonly="$attrs.readonly"
      :label="$attrs.label"
      :placeholder="$attrs.placeholder"
      @keyup.enter="search"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance, PropType, Ref, nextTick } from "@nuxtjs/composition-api"

export default defineComponent({
  //   name: "Input",
  props: {
    inputmode: {
      type: String,
      required: true
    },
    search: {
      type: Function
    }
  },
  setup(props) {
    const inputValue = ref("")
    const root = getCurrentInstance()
    watch(
      () => inputValue.value,
      val => {
        root?.emit("setInputText", val)
      }
    )
    return { inputValue }
  }
})
</script>
<style scoped>
/** from  MDN */
.input_snipetts {
  width: 100%; /*親要素いっぱい広げる*/
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  background-color: #111111;
  color: white;
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}

#text2 {
  font-size: 16px;
  width: 100%; /*flexの中で100%広げる*/
  background-color: #ddd;
  border: none; /*枠線非表示*/
  outline: none; /*フォーカス時の枠線非表示*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
</style>
