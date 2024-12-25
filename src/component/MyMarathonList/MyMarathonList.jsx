import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaImage, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { format } from "date-fns";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
const MyMarathonList = () => {
  const axiousInterce = useAxiosSecure();
  const { user } = useCustomContex();
  const {
    data: marathons,
    isFetching: ispending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["marathons"],
    queryFn: async () => {
      const response = await axiousInterce.get(
        `/allmarathons/marathons?email=${user.email}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [marathonDate, setMarathonDate] = useState();

  const initializeDates = (marathon) => {
    setStartDate(marathon?.startRegistrationDate || null);
    setEndDate(marathon?.endRegistrationDate || null);
    setMarathonDate(marathon?.marathonStartDate || null);
  };

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
          .delete(
            `https://server-site-ashen.vercel.app/delete/marathonCollection/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
  const successNofity = () => {
    toast.success("Successfully Updated!", {
      position: "top-center",
    });
  };
  const handleSubmit = (e, id, modal) => {
    e.preventDefault();
    console.log(id);
    const formData = new FormData(e.target);
    const ObjectFormData = {
      startRegistrationDate: startDate,
      endRegistrationDate: endDate,
      marathonStartDate: marathonDate,
      ...Object.fromEntries(formData.entries()),
    };
    axios
      .put(
        `https://server-site-ashen.vercel.app/updateCollection/${id}`,
        ObjectFormData
      )
      .then((res) => {
        if (res.data.acknowledged) {
          successNofity();
          modal.close();
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen">
        <h2 className="text-2xl font-bold mb-6">My Marathon List</h2>
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Marathon Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons?.map((marathon, index) => (
                <tr key={marathon?._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={marathon?.marathonImage}
                      alt=""
                      className="w-10 h-10"
                    />
                  </td>
                  <td className="py-3 px-4">{marathon?.title}</td>
                  <td className="py-3 px-4">{marathon?.email}</td>
                  <td className="py-3 px-4 flex justify-end gap-4">
                    <button
                      onClick={() => {
                        initializeDates(marathon);
                        document
                          .getElementById(`modal${marathon._id}`)
                          .showModal();
                      }}
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
                          {/* form field start */}
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
                                defaultValue={marathon.title}
                                name="title"
                                type="text"
                                placeholder="Enter marathon title"
                                className="input input-bordered w-full"
                                required
                              />
                            </div>

                            {/* Location */}
                            <div className="form-control">
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
                            {/* Image URL */}
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Marathon Image URL
                                </span>
                              </label>
                              <div className="relative">
                                <FaImage className="absolute top-3 left-3 text-gray-400" />
                                <input
                                  defaultValue={marathon?.marathonImage}
                                  type="url"
                                  name="marathonImage"
                                  placeholder="Enter marathon image URL"
                                  className="input input-bordered pl-10 w-full"
                                  required
                                />
                              </div>
                            </div>

                            {/* Start Registration Date */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Start Registration Date
                                </span>
                              </label>
                              <DatePicker
                                selected={
                                  startDate
                                    ? new Date(startDate)
                                    : new Date(marathon?.startRegistrationDate)
                                }
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date) =>
                                  setStartDate(format(date, "yyyy-MM-dd"))
                                }
                                className="input input-bordered w-full"
                              />
                            </div>

                            {/* End Registration Date */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  End Registration Date
                                </span>
                              </label>
                              <DatePicker
                                selected={
                                  endDate
                                    ? new Date(endDate)
                                    : new Date(marathon?.endRegistrationDate)
                                }
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date) =>
                                  setEndDate(format(date, "yyyy-MM-dd"))
                                }
                                className="input input-bordered w-full"
                              />
                            </div>

                            {/* Marathon Start Date */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Marathon Start Date
                                </span>
                              </label>
                              <DatePicker
                                selected={
                                  marathonDate
                                    ? new Date(marathonDate)
                                    : new Date(marathon?.marathonStartDate)
                                }
                                dateFormat={"yyyy-MM-dd"}
                                onChange={(date) =>
                                  setMarathonDate(format(date, "yyyy-MM-dd"))
                                }
                                className="input input-bordered w-full"
                              />
                            </div>

                            {/* Running Distance */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Running Distance
                                </span>
                              </label>
                              <select
                                defaultValue={marathon?.runningDistance}
                                name="runningDistance"
                                className="select select-bordered w-full"
                              >
                                <option value="3k">3k</option>
                                <option value="10k">10k</option>
                                <option value="25k">25k</option>
                              </select>
                            </div>

                            {/* Description */}
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Description
                                </span>
                              </label>
                              <textarea
                                name="description"
                                defaultValue={marathon?.description}
                                placeholder="Write a short description of the marathon"
                                className="textarea textarea-bordered w-full"
                              ></textarea>
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

export default MyMarathonList;
