import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import Swal from "sweetalert2";
import axios from "axios";

const MyApplyList = () => {
  const { user } = useCustomContex();
  const queryClient = useQueryClient();

  // Fetch marathons using React Query
  const {
    data: marathons,
    isFetching: ispending,
    error,
  } = useQuery({
    queryKey: ["marathons"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/marathon/marthonApplication?email=${user.email}`
      );
      if (!response.ok) throw new Error("Failed to fetch marathons");
      return response.json();
    },
  });

  // Handle delete action
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/delete/${id}`)
          .then((res) => {
            if (res.data.deleteCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              // Update React Query cache
              queryClient.setQueryData(["marathons"], (oldData) => {
                if (!oldData) return [];
                return oldData.filter((marathon) => marathon._id !== id);
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire(
              "Error",
              "Failed to delete the item. Try again.",
              "error"
            );
          });
      }
    });
  };

  if (ispending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // Render error message if fetching fails
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Apply List</h2>
      <table className="table w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Participant Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {marathons?.map((marathon, index) => (
            <tr key={marathon?._id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{marathon?.title}</td>
              <td className="py-3 px-4">
                {marathon?.firstName} {marathon?.lastName}
              </td>
              <td className="py-3 px-4">{marathon?.email}</td>
              <td className="py-3 px-4 flex justify-end gap-4">
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
