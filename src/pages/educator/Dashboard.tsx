import type { DashboardData } from "../../types";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../services/educator.service";
import Loading from "../../components/student/Loading";
import patientsIcon from "../../assets/patients_icon.svg";
import earningsIcon from "../../assets/earning_icon.svg";
import appointmentIcon from "../../assets/appointments_icon.svg";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchDashboardData();
        setDashboardData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-surface p-4 w-56 rounded-md ">
            <img src={patientsIcon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData?.enrolledStudentsData.length}
              </p>
              <p className="text-base text-gray-500  ">Total Enrollments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-surface p-4 w-56 rounded-md ">
            <img src={appointmentIcon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData?.totalCourses}
              </p>
              <p className="text-base text-gray-500  ">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-surface p-4 w-56 rounded-md ">
            <img src={earningsIcon} alt="" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                ${dashboardData?.totalEarnings}
              </p>
              <p className="text-base text-gray-500  ">Total Earnings</p>
            </div>
          </div>
        </div>
        <div className="pb-4 text-lg font-medium">
          <h2 className="pb-4 text-lg font-medium">Lates Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {dashboardData?.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-2 flex items-center space-x-3 ">
                      <img
                        src={item.student.imageUrl}
                        alt=""
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
