import { CourseInferType } from "@/app/(private)/(admin-routes)/register/course/page";

export function useCourses() {
  async function listCourses() {
    const req = await fetch("/api/course/list", {
      method: "GET",
    });
    const res = await req.json();

    return res;
  }

  async function registerCourse(props: CourseInferType) {
    const req = await fetch("/api/course", {
      method: "POST",
      body: JSON.stringify(props),
    });
    const res = await req.json();
    return res;
  }

  async function updateCourse(props: CourseInferType) {
    const { id, ...rest } = props;
    const req = await fetch(`/api/course?courseId=${id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
    });

    const res = await req.json();

    return res;
  }

  async function deleteCourse(courseId: string) {
    const req = await fetch(`/api/course?courseId=${courseId}`, {
      method: "DELETE",
    });
    const res = await req.json();
    return res;
  }

  return {
    listCourses,
    registerCourse,
    deleteCourse,
    updateCourse,
  };
}
