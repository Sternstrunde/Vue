import { getAmountListData } from '@/service/main/analysis/analysis'
import {defineStore} from 'pinia'

interface IAnalysisState {
  amountList: any[]
}


const useAnalysisStore = defineStore('analysis',{
  state:():IAnalysisState => ({
    amountList: []
  }),
  actions:{
    async fetchAnalysisDataAction(){
      const amountResult = await getAmountListData()
      this.amountList = amountResult.list
      console.log(amountResult)
    }
  }
})


export default useAnalysisStore
