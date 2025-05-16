// import { InferType } from "yup";

// import { poslSchema } from "@/yup";

interface EditRecordPoslPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordPoslPage(props: EditRecordPoslPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;
  console.log("🚀 ~ EditRecordPoslPage ~ id:", id);

  return <></>;
}
