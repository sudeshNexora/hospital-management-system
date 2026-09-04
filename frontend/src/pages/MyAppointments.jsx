import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [reviewFormId, setReviewFormId] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const navigate = useNavigate();
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const openReviewForm = (appointmentId) => {
    setReviewFormId(appointmentId);
    setReviewRating(0);
    setReviewComment("");
  };

  const submitReview = async (appointmentId) => {
    if (!reviewRating) {
      toast.warn("Please select a star rating");
      return;
    }
    try {
      setIsSubmittingReview(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/submit-review",
        { appointmentId, rating: reviewRating, comment: reviewComment },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setReviewFormId(null);
        getUsersAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUsersAppointments();
            toast.success(data.message);
            navigate("/my-appointments");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
      getDoctorsData();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zin-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.length !== 0 ? (
          appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-md text-zinc-600">
                <p className="font-medium text-neutral-800">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="font-semibold text-zinc-700 mt-1">Address:</p>
                <p className="text-sm">{item.docData.address.line1}</p>
                <p className="text-sm">{item.docData.address.line2}</p>
                <p className="text-sm mt-1">
                  <span className="text-md text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 cursor-auto">
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-md text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className={`text-md text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 ${
                      item.payment ? "cursor-not-allowed" : ""
                    }`}
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500  rounded text-red-500 cursor-not-allowed">
                    Appointment Cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500  rounded text-green-500 cursor-not-allowed">
                    Appointment Completed
                  </button>
                )}
                {item.isCompleted && !item.reviewed && (
                  <button
                    onClick={() => openReviewForm(item._id)}
                    className="text-md text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Leave a Review
                  </button>
                )}
                {item.isCompleted && item.reviewed && (
                  <button className="sm:min-w-48 py-2 border border-indigo-300 rounded text-indigo-500 cursor-not-allowed">
                    Review Submitted
                  </button>
                )}
              </div>

              {/* Inline Review Form */}
              {reviewFormId === item._id && (
                <div className="col-span-2 sm:w-full border rounded-lg p-4 mt-2 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Rate your experience with {item.docData.name}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={22}
                        className={`cursor-pointer ${
                          star <= reviewRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => setReviewRating(star)}
                      />
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share a few words about your visit (optional)"
                    className="w-full border rounded p-2 text-sm mb-3"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => submitReview(item._id)}
                      disabled={isSubmittingReview}
                      className="bg-primary text-white text-sm px-6 py-2 rounded-full disabled:opacity-70"
                    >
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                      onClick={() => setReviewFormId(null)}
                      className="text-sm px-6 py-2 rounded-full border text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <div className="text-center text-2xl text-zinc-600 mt-4">
              No appointments found.
            </div>
            <div className="flex text-center sm:flex-col flex-row">
              <p className="mt-4 text-indigo-600 text-xl">
                Please Book an Appointment
              </p>
              <div>
                <button
                  className="mt-4 border py-4 px-6 rounded bg-primary text-white"
                  onClick={() => navigate("/doctors")}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
