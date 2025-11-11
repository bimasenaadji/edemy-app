import { useEffect, useState } from "react";
import type { EnrolledStudent } from "../../types";
import { fetchEnrolledStudents } from "../../services/educator.service";
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchEnrolledStudents();
        setEnrolledStudents(response);
        setLoading(false);
      } catch (error) {
        throw new Error("Failed to fetch enrolled students");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-3 font-semibold text-center ">
                Student Name
              </th>
              <th className="px-4 py-3 font-semibold text-center ">
                Course Title
              </th>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {index + 1}
                </td>
                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />{" "}
                  <span className="truncate">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;
