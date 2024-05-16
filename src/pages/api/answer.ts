import type {NextApiRequest,NextApiResponse} from 'next'
import {postAnswer} from '@/services/answer'
function getAnswerInfo(reqBody:any){
  const answerList:any[]=[]
  Object.keys(reqBody).forEach(key=>{
    if(key==='questionId') return
    answerList.push({
      componentId:key,
      value:reqBody[key]
    })
  })
  return {
    questionId:reqBody.questionId||'',
    answerList
  }
}
export default async function  handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method!=='POST'){
    //不是post则返回错误
    res.status(200).json({errno:-1,msg:"Method 错误"})
  }
  const answerInfo = getAnswerInfo(req.body)
  try{
    //提交到服务端 Mock
    const resData = await postAnswer(answerInfo)
    if(resData.code==='S001'){
      //如果提交成功
      res.redirect('/success')
    }else{
      //提交失败了
      res.redirect('/fail')
    }
  }catch(err){
    console.log('err',err)
  }
  
}
