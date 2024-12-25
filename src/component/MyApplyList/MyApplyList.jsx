import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaMapMarkerAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const MyApplyList = () => {
  const axiosInstance = useAxiosSecure();
  const { user } = useCustomContex();
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const searchInputRef = useRef();

  // Fetch marathons using React Query
  const {
    data: marathons,
    isFetching: ispending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["marathons", searchTitle],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/marathon/marthonApplication?email=${user.email}&title=${searchTitle}`
      );
      console.log(response);
      return response.data;
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
          .delete(`https://server-site-ashen.vercel.app/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              console.log("hello");
              refetch();
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
  const handleSearchChange = (e) => {
    console.log("hi");
    if (e.key === "Enter") {
      setSearchTitle(e.target.value);
      console.log("hello");
    }
  };
  const handleClickSerach = () => {
    setSearchTitle(searchInputRef.current.value);
  };
  const successNofity = () => {
    toast.success("Successfully Updated!", {
      position: "top-center",
    });
  };
  const handleSubmit = (e, id, modal) => {
    e.preventDefault();
    console.log(id);
    const formData = new FormData(e.target);
    const ObjectFormData = Object.fromEntries(formData.entries());
    axios
      .put(
        `https://server-site-ashen.vercel.app/updateApplication/${id}`,
        ObjectFormData
      )
      .then((res) => {
        if (res.data.acknowledged) {
          successNofity();
          modal.close();
          navigate("/dashboard/dashboard/myApplyList");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen">
        <h2 className="text-2xl font-bold mb-6">My Apply List</h2>
        <div className="mb-6 relative">
          <div className="w-full max-w-md relative">
            <FaSearch
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
              onClick={handleClickSerach}
            />
            <input
              type="text"
              name="search"
              ref={searchInputRef}
              placeholder="Search by title..."
              onKeyUp={handleSearchChange}
              className="input input-bordered w-full max-w-md pl-10" // Add padding for the icon
            />
          </div>
        </div>
        <div className="overflow-x-auto">
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
                    <button
                      onClick={() =>
                        document
                          .getElementById(`modal${marathon._id}`)
                          .showModal()
                      }
                      className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      className="btn btn-sm btn-error flex items-center gap-2"
                      onClick={() => handleDelete(marathon?._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                  <dialog
                    id={`modal${marathon?._id}`}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen flex items-center justify-center">
                        <div className="bg-[#f0f7f9] rounded-lg shadow-lg p-8 w-full max-w-4xl">
                          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                            Register In {marathon?.title} Marathon
                          </h2>
                          <form
                            onSubmit={(e) =>
                              handleSubmit(
                                e,
                                marathon?._id,
                                document.getElementById(`modal${marathon?._id}`)
                              )
                            }
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                          >
                            {/* Marathon Title */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Marathon Title
                                </span>
                              </label>
                              <input
                                defaultValue={marathon?.title}
                                name="title"
                                type="text"
                                className="input input-disabled input-bordered w-full"
                                readOnly
                              />
                            </div>
                            {/* First Name */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Enter Your First Name
                                </span>
                              </label>
                              <input
                                defaultValue={marathon.firstName}
                                name="firstName"
                                type="text"
                                placeholder="Enter Your First Name"
                                className="input input-bordered w-full"
                                required
                              />
                            </div>
                            {/* Last Name */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Enter Your Last Name
                                </span>
                              </label>
                              <input
                                defaultValue={marathon.lastName}
                                name="lastName"
                                type="text"
                                placeholder="Enter Your Last Name"
                                className="input input-bordered w-full"
                                required
                              />
                            </div>
                            {/* Email */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  User Email
                                </span>
                              </label>
                              <input
                                defaultValue={user.email}
                                name="email"
                                type="email"
                                placeholder="Enter marathon title"
                                className="input input-disabled input-bordered w-full"
                                readOnly
                              />
                            </div>
                            {/* Conatct Number */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Contact Number
                                </span>
                              </label>
                              <input
                                defaultValue={marathon.number}
                                name="number"
                                type="text"
                                placeholder="Enter Your Contact Number"
                                className="input input-bordered w-full"
                                required
                              />
                            </div>

                            {/* Location */}
                            <div className="form-control col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Location
                                </span>
                              </label>
                              <div className="relative">
                                <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                                <input
                                  defaultValue={marathon?.location}
                                  name="location"
                                  type="text"
                                  placeholder="Enter location"
                                  className="input input-bordered pl-10 w-full"
                                  required
                                />
                              </div>
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2 text-center w-full">
                              <button
                                type="submit"
                                className="btn btn-primary w-full"
                              >
                                Update Registation
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
    </>
  );
};

export default MyApplyList;
