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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Create New Course
      </h2>

      <form className="space-y-5" onSubmit={onSubmitHandler}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Course Title"
          className="input w-full"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          className="textarea w-full"
          rows={4}
          required
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="select w-full"
          required>
          <option value="">Select Category</option>
          {courseCategories.map((cat, index) => (
            <option key={index} value={cat.text}>
              {cat.text}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setLevel(e.target.value)}
          value={level}
          className="select w-full"
          required>
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Price"
          type="number"
          className="input w-full"
          required
          min="0"
        />
        <input
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          placeholder="Discount (%)"
          type="number"
          className="input w-full"
          required
          min="0"
          max="200"
        />
        <input
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          placeholder="Tags (comma separated)"
          type="text"
          className="input w-full"
        />
        <input
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          placeholder="Duration (e.g. 4 weeks)"
          type="text"
          className="input w-full"
          required
        />

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            className="input w-full"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="relative mt-3">
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

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2 py-2">
          <FaUpload /> Publish Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
