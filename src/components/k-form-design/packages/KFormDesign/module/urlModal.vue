<!--
 * @Description:
 * @Author: kcz
 * @Date: 2019-12-30 00:37:05
 * @LastEditors: kcz
 * @LastEditTime: 2020-03-22 20:56:48
 -->
<template>
  <a-modal :title="modaltitle" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <span>{{ content }}</span>
    <a-button
      @click="handleCopyJson"
      class="copy-btn"
      data-clipboard-action="copy"
      :data-clipboard-text="content"
    >点击复制</a-button
    >
  </a-modal>
</template>
<script>
/* eslint-enable */
import previewCode from '../../PreviewCode/index'
import Clipboard from 'clipboard'

export default {
  name: 'UrlModal',
  data() {
    return {
      visible: false,
      editorVueJson: '',
      editorHtmlJson: '',
      jsonData: {},
      content: '',
      modaltitle: '',
    }
  },
  watch: {
    // visible(val) {
    //   if (val) {
    //     this.editorVueJson = codeVueFront + JSON.stringify(this.jsonData) + codeVueLast

    //     this.editorHtmlJson = codeHtmlFront + JSON.stringify(this.jsonData) + codeHtmlLast
    //   }
    // },
  },
  components: {
    previewCode,
  },
  methods: {
    handleOk(e) {
      setTimeout(() => {
        this.visible = false
      }, 1000)
    },
    handleCancel() {
      this.visible = false
    },
    handleCopyJson() {
      // 复制数据
      const clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', () => {
        this.$message.success('复制成功')
      })
      clipboard.on('error', () => {
        this.$message.error('复制失败')
      })
      setTimeout(() => {
        // 销毁实例
        clipboard.destroy()
      }, 122)
    },
  },
}
</script>
