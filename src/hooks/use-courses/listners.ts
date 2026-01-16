export async function listCourses() {
  const req = await fetch('/api/course/list', {
    method: 'GET',
  });
  const res = await req.json();

  return res;
}
