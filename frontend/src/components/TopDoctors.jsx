import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 12).map((item, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
          >
            <img className="bg-primary-light" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-primary" : "text-gray-500"
                }`}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-primary" : "bg-gray-500"
                  } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              {item.reviewCount > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <p className="text-xs text-gray-500">
                    {item.rating.toFixed(1)} ({item.reviewCount})
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-primary-light text-primary-dark font-medium px-12 py-3 rounded-full mt-10 hover:bg-primary hover:text-white transition-colors duration-300"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
