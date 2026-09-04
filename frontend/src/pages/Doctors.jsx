import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const Doctors = () => {
  const { speciality } = useParams();
  const [fillerDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    let result = speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : [...doctors];

    if (searchTerm.trim()) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    if (sortBy === "rating-high") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "fee-low") {
      result = [...result].sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "fee-high") {
      result = [...result].sort((a, b) => b.fee - a.fee);
    }

    setFilterDoc(result);
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors, searchTerm, sortBy]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 sm:w-72">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-sm w-full"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 sm:w-56"
        >
          <option value="default">Sort by</option>
          <option value="rating-high">Highest Rated</option>
          <option value="fee-low">Fee: Low to High</option>
          <option value="fee-high">Fee: High to Low</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 p-3 border rounded text-md transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-primary-light text-primary-dark font-medium border-primary"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-primary-light text-primary-dark font-medium border-primary" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-primary-light text-primary-dark font-medium border-primary" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-primary-light text-primary-dark font-medium border-primary" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-primary-light text-primary-dark font-medium border-primary" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-primary-light text-primary-dark font-medium border-primary"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {fillerDoc.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-full">
              No doctors match your search.
            </p>
          ) : (
            fillerDoc.map((item, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                onClick={() => navigate(`/appointment/${item._id}`)}
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
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                  {item.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star
                        size={13}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <p className="text-xs text-gray-500">
                        {item.rating.toFixed(1)} ({item.reviewCount})
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
