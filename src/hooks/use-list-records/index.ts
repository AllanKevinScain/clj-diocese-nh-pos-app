export function useListRecords() {
  async function listRecordsByCourseNumber(courseNumber: string) {
    const req = await fetch(`/api/records/list-by-number/${courseNumber}`, {
      method: 'GET',
    });
    const res = await req.json();

    return res.data;
  }

  return {
    listRecordsByCourseNumber,
  };
}
