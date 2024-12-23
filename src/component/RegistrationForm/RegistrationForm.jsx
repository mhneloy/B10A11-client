import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const RegistrationForm = () => {
  const { user } = useCustomContex();

  const marathon = useLoaderData();
  const { _id, title, marathonStartDate } = marathon;

  const navigate = useNavigate();
  const successNofity = () => {
    toast.success("Successfully Added", {
      position: "top-center",
    });
  };

  const errorNofity = (error) => {
    toast.error(error, {
      position: "top-left",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectFormData = {
      marathonId: _id,
      ...Object.fromEntries(formData.entries()),
    };

    console.log(objectFormData);
    axios
      .post(`http://localhost:5000/marathonApplication`, objectFormData)
      .then((res) => {
        if (res.data.acknowledged) {
          successNofity();
          navigate("/marathons");
        }
      })
      .catch((err) => {
        errorNofity(err);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#e8f1f3] via-[#f2f7f9] to-[#e8f1f3] min-h-screen flex items-center justify-center">
      <div className="bg-[#f0f7f9] rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Register In {title} Marathon
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Marathon Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Marathon Title</span>
            </label>
            <input
              defaultValue={title}
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
              <span className="label-text font-medium">User Email</span>
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
              <span className="label-text font-medium">Contact Number</span>
            </label>
            <input
              name="number"
              type="text"
              placeholder="Enter Your Contact Number"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* marathonStartDate */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                marathon Start Date
              </span>
            </label>
            <DatePicker
              selected={marathonStartDate}
              className="input input-disabled input-bordered w-full"
              readOnly
            />
          </div>

          {/* Location */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
              <input
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
            <button type="submit" className="btn btn-primary w-full">
              Submit Registation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
