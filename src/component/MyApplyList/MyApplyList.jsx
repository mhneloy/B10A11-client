import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";

const MyApplyList = () => {
  const { user } = useCustomContex();
  const {
    data: marathons,
    ispending,
    error,
  } = useQuery({
    queryKey: ["marathons"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/marathon/marthonApplication?email=${user.email}`
      );
      return res.json();
    },
  });
  console.log(user.email);
  console.log(marathons);
  const handleDelete = (e) => {
    console.log(e);
  };
  if (ispending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen">
      <h2>My apply List</h2>
      <table className="table w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Participent Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left flex justify-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {marathons?.map((marathon, index) => (
            <tr key={marathon?._id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{marathon?.title}</td>
              <td className="py-3 px-4">
                {marathon?.firstName}
                {` `}
                {marathon.lastName}
              </td>
              <td className="py-3 px-4">{marathon?.email}</td>
              <td className="py-3 px-4 text-center flex justify-end gap-4">
                <Link
                  to={`/update/${marathon._id}`}
                  className="btn btn-sm btn-primary flex items-center gap-2"
                >
                  <FaEdit /> Update
                </Link>
                <button
                  className="btn btn-sm btn-error flex items-center gap-2"
                  onClick={() => handleDelete(marathon?._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplyList;
