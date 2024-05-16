import {get} from './ajax'
export async function getQuestionById(id:string)
{
  const url =`/api/question/${id}`
  const res = await get(url)
  return res
}