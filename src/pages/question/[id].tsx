import Head from "next/head";
import QuestionInput from "../components/QuestionComponents/QuestionInput/QuestionInput";
type PropsType = {
  id: string;
};
//pages/question/[id].tsx
//http://localhost:3000/question/1233    //c端H5的url规则
//http://localhost:3000/question/fodisfnkdbsjoabfjs
export default function Question(props: PropsType) {
  return (
    <>
      <Head>
        <title>Question</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main>
        <h1>Questino Page</h1>
        <p>{props.id}</p>
        <QuestionInput
          fe_id="c1"
          props={{ title: "你的问题", placeholder: "请输入" }}
        />
      </main>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  //根据id await 获取问卷数据
  return {
    props: {
      id,
      //其他数据
    },
  };
}
