import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { courseCategories } from "../../assets/asset";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const courseData = {
        title,
        description,
        category,
        level,
        price: Number(price),
        discount: Number(discount),
        tags: tags.split(",").map((t) => t.trim()),
        duration,
        videoUrl,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      if (previewImage) {
        formData.append("thumbnail", previewImage);
      }

      const { data } = await axios.post("/api/course/add", formData);

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setCategory("");
        setLevel("");
        setPrice("");
        setDiscount("");
        setTags("");
        setDuration("");
        setPreviewImage(null);
        setVideoUrl("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl ring-1 ring-indigo-100">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
        📚 Create a New Course
      </h2>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2 text-lg text-indigo-700">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
            placeholder="Enter course title"
            required
            autoComplete="off"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2 text-lg text-indigo-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full rounded-lg min-h-[110px] border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition px-4 py-3"
            placeholder="Write a short description..."
            required
          />
        </div>

        {/* Category & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full rounded-lg border-indigo-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-500 transition p-3 text-indigo-900"
              required>
              <option value="" disabled>
                Select Category
              </option>
              {courseCategories.map((cat, idx) => (
                <option key={idx} value={cat.text}>
                  {cat.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="select select-bordered w-full rounded-lg border-indigo-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-500 transition p-3 text-indigo-900"
              required>
              <option value="" disabled>
                Select Level
              </option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="0"
              min={0}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Discount (%)
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="10"
              min={0}
              max={100}
              required
            />
          </div>
        </div>

        {/* Tags & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="e.g. React, Web Dev"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-indigo-700">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
              placeholder="e.g. 4 weeks"
              required
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-semibold mb-2 text-indigo-700">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full rounded-lg border-indigo-300 shadow-sm focus:ring-indigo-300 focus:border-indigo-500 transition"
          />
          {previewImage && (
            <div className="mt-4 relative rounded-lg overflow-hidden shadow-md border border-indigo-200">
              <img
                src={URL.createObjectURL(previewImage)}
                alt="Preview"
                className="h-40 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-red-100 text-red-600 font-bold"
                title="Remove image">
                ✖
              </button>
            </div>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block font-semibold mb-2 text-indigo-700">
            Video Link (YouTube)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="input input-bordered w-full py-3 px-4 rounded-lg border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white w-full flex items-center justify-center gap-3 py-3 rounded-xl text-xl font-semibold shadow-lg transition-transform hover:scale-105">
          <FaUpload className="text-white text-lg" />
          Publish Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
