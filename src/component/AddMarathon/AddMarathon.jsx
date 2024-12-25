import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { FaImage, FaMapMarkerAlt } from "react-icons/fa";
import useCustomContex from "../../shareComponent/AuthContext/useCustomContex";
import { toast } from "react-toastify";

const AddMarathon = () => {
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [marathonDate, setMarathonDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const { user } = useCustomContex();

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
      startRegistrationDate: startDate,
      endRegistrationDate: endDate,
      marathonStartDate: marathonDate,
      createdAt: format(new Date(), "yyyy-MM-dd"),
      creator: user.email,
      totalRegistationCount: 0,
      ...Object.fromEntries(formData.entries()),
    };

    console.log(objectFormData);
    axios
      .post(`https://server-site-ashen.vercel.app/addmarathons`, objectFormData)
      .then((res) => {
        if (res.data.acknowledged) {
          successNofity();
          e.target.reset();
          setStartDate(format(new Date(), "yyyy-MM-dd"));
          setEndDate(format(new Date(), "yyyy-MM-dd"));
          setMarathonDate(format(new Date(), "yyyy-MM-dd"));
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
          Add New Marathon
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
          {/* Image URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Marathon Image URL</span>
            </label>
            <div className="relative">
              <FaImage className="absolute top-3 left-3 text-gray-400" />
              <input
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
              selected={startDate}
              onChange={(date) => setStartDate(format(date, "yyyy-MM-dd"))}
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
              selected={endDate}
              onChange={(date) => setEndDate(format(date, "yyyy-MM-dd"))}
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
              selected={marathonDate}
              onChange={(date) => setMarathonDate(format(date, "yyyy-MM-dd"))}
              className="input input-bordered w-full"
            />
          </div>

          {/* Running Distance */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Running Distance</span>
            </label>
            <select
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
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Write a short description of the marathon"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button type="submit" className="btn btn-primary w-full md:w-auto">
              Submit Marathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
