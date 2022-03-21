<template>
  <div class="properties-centent kk-checkbox">
    <div class="head-title">
      表单属性设置
    </div>
    <div class="properties-body">
      <a-form>
        <a-form-item
          v-if="typeof config.title !== 'undefined'"
          label="表单标题"
        >
          <a-input v-model="config.title" />
        </a-form-item>
        <a-form-item
          v-if="typeof config.layout !== 'undefined'"
          label="表单布局"
        >
          <a-radio-group buttonStyle="solid" v-model="config.layout">
            <!-- <a-radio-button value="horizontal">水平</a-radio-button> -->
            <a-radio-button value="vertical">垂直</a-radio-button>
            <!-- <a-radio-button value="inline">行内</a-radio-button> -->
          </a-radio-group>
        </a-form-item>
        <a-form-item label="labelCol（水平布局生效）">
          <div class="change-col-box">
            <a-slider
              id="test"
              :max="24"
              :min="0"
              v-model="config.labelCol.span"
              @change="config.wrapperCol.span = 24 - config.labelCol.span"
            />
          </div>
        </a-form-item>
        <a-form-item label="wrapperCol（水平布局生效）">
          <div class="change-col-box">
            <div>
              <label>span:</label>
              <a-input-number v-model="config.wrapperCol.span" />
            </div>
          </div>
        </a-form-item>
        <a-form-item label="表单距顶部距离（px）">
          <div class="change-col-box">
            <div>
              <a-input-number v-model="config.marginTop" />
            </div>
          </div>
        </a-form-item>
        <a-form-item label="预览模态框宽度">
          <a-input-number style="width:100%;" v-model="previewOptions.width" />
        </a-form-item>
        <a-form-item label="表单CSS">
          <a-input v-model="config.customStyle" />
        </a-form-item>
        <a-form-item label="表单属性">
          <kCheckbox
            v-if="typeof config.hideRequiredMark !== 'undefined'"
            v-model="config.hideRequiredMark"
            label="隐藏必选标记"
          />
        </a-form-item>
        <a-form-item label="背景图片">
          <a-upload :before-upload="imgChange" list-type="picture" accept="image/*" :remove="imgRemove">
            <a-button> <a-icon type="upload" /> 上传背景图片 </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="提示">
          实际预览效果请点击预览查看
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 表单属性设置面板组件
 */
import kCheckbox from '../../KCheckbox/index.vue'
import axios from 'axios'
export default {
  name: 'FormProperties',
  components: {
    kCheckbox
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    previewOptions: {
      type: Object,
      required: true
    }
  },
    methods: {
    imgChange(file) {
      const formData = new FormData()
      formData.append('file', file)
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_BASE_URL}/user/upload`,
        data: formData,
      }).then((response) => {
      
        this.config.background = response.data.data.url
      })
      return false
    },
    imgRemove(){
     this.config.background.url=''
    }
  },
}
</script>
<style lang="less" scoped>
.change-col-box {
  > div {
    padding: 5px;
    display: flex;
    > label {
      text-align: right;
      padding-right: 8px;
      display: block;
      font-size: 16px;
      width: 45px;
    }
  }
}
</style>
