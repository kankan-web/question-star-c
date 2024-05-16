import { post } from './ajax'

// 提交答卷
export async function postAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)
  console.log('想要的数据还是',data)
  return data
}