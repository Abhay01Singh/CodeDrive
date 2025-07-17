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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">
        📚 Create a New Course
      </h2>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Write a short description..."
            required
          />
        </div>

        {/* Category & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
              required>
              <option value="">Select Category</option>
              {courseCategories.map((cat, idx) => (
                <option key={idx} value={cat.text}>
                  {cat.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="select select-bordered w-full"
              required>
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered w-full"
              placeholder="0"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="input input-bordered w-full"
              placeholder="10"
              min={0}
              max={100}
              required
            />
          </div>
        </div>

        {/* Tags & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. React, Web Dev"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. 4 weeks"
              required
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {previewImage && (
            <div className="mt-4 relative">
              <img
                src={URL.createObjectURL(previewImage)}
                alt="Preview"
                className="h-40 w-full object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                title="Remove image">
                ✖
              </button>
            </div>
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block font-medium mb-1">Video Link (YouTube)</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full flex items-center justify-center gap-2 text-lg py-2 rounded-xl">
          <FaUpload /> Publish Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
