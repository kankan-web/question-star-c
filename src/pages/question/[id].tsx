import Head from "next/head";
import QuestionInput from "../components/QuestionComponents/QuestionInput/QuestionInput";
import QuestinoRadio from "../components/QuestionComponents/QuestionRadio/QuestionRadio";
import styles from "@/styles/Question.module.scss";
import PageWrapper from "../components/PageWrapper";
import { getQuestionById } from "@/services/question";
import { getComponent } from "../components/QuestionComponents";

type PropsType = {
  code: string;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};
//pages/question/[id].tsx
//http://localhost:3000/question/1233    //c端H5的url规则
//http://localhost:3000/question/fodisfnkdbsjoabfjs
export default function Question(props: PropsType) {
  const { code, data, msg = "" } = props;

  if (code !== "S001") {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }
  const { id, title = "", desc = "", isDeleted, isPublished, componentList } =
    data || {};
  //已经被删除的，提示错误
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }

  //已经被删除的，提示错误
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  //遍历组件
  const ComponentListElem = (
    <>
      {componentList?.map((c) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );
  return (
    <PageWrapper title={title}>
      <h1>Questino Page</h1>
      <p>{id}</p>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" defaultValue={id} />
        {ComponentListElem}

        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  //根据id await 获取问卷数据
  const data = await getQuestionById(id);
  return {
    props: data,
  };
}
