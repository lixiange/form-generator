<template>
  <a-modal
    title="预览"
    :visible="visible"
    @ok="handleGetData"
    @cancel="handleCancel"
    okText="获取数据"
    cancelText="关闭"
    style="top: 20px"
    :destroyOnClose="true"
    :width="1200"
    wrapClassName="spc-modal"
    :bodyStyle="{ padding: 0}"
  >
   
    <k-form-build :value="jsonData" @submit="handleSubmit" ref="KFormBuild" />
    <jsonModel ref="jsonModel" />
  </a-modal>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
import jsonModel from '../KFormDesign/module/jsonModal'
import dayjs from 'dayjs'
export default {
  name: 'KFormPreview',
  data() {
    return {
      visible: false,
      previewWidth: 850,
      jsonData: {},
      newDate: dayjs().format('HH:mm:ss'),
      timer: null,
    }
  },
  components: {
    jsonModel,
  },
  watch:{
  jsonData:'handleMessage'
  },
  updated(){

  },
  mounted() {
    this.timer = setInterval(() => {
      this.newDate = dayjs().format('HH:mm:ss')
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    handleSubmit(p) {
      p.then((res) => {
        console.log(res, '获取数据成功')
        this.$refs.jsonModel.jsonData = res
        this.$refs.jsonModel.visible = true
      }).catch((err) => {
        console.log(err, '获取数据失败')
      })
    },
    handleGetData() {
      this.$refs.KFormBuild.getData()
        .then((res) => {
          console.log(res, '获取数据成功')
          this.$refs.jsonModel.jsonData = res
          this.$refs.jsonModel.visible = true
        })
        .catch((err) => {
          console.log(err, '获取数据失败')
        })
    },
    handleCancel() {
      this.visible = false
    },
    handleMessage(){
      console.log('数据改变了')
    }
  },
}
</script>
<style lang="less" scoped>
.spc-modal {
  background: red !important;
}
.spc-modal {
  .ant-modal-body {
    padding: 0px;
  }
}
.preview_wrapper {
  width: 474px;
  height: 890px;
  padding: 10px 20px 50px 50px;
  background-image: url('../../../../assets/phone.png');
  background-size: cover;
  margin: 10px auto;
  position: relative;
}
.preview_time{
    position: absolute;
  top: 58px;
  left: 90px;
  font-size: 16px;
  font-weight: 500;
color:#000
}
.preview_url {
  position: absolute;
  top: 96px;
  left: 80px;
  font-size: 16px;
  width: 300px;
  height: 30px;
  cursor: pointer;
  line-height: 30px;
  text-align: center;
  color: #000;
  font-weight: 500;
}
.preview_content {
  width: 360px;
  height: 606px;
  position: absolute;
  top: 136px;
  left: 68px;
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-image: linear-gradient(135deg, #09f, #3c9);
}
</style>
