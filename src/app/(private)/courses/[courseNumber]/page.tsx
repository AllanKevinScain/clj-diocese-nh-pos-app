import { CourseClientPage } from "./client-page";

export default async function Course({
  params,
}: {
  params: Promise<{ courseNumber: string }>;
}) {
  const { courseNumber } = await params;
  console.log("🚀 ~ courseNumber:", courseNumber);

  return <CourseClientPage />;
}
