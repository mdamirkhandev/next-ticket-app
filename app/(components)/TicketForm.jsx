"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const TicketForm = () => {
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }
    router.refresh();
    router.push("/");
    console.log(formData);
  };
  const ticketData = {
    title: "",
    description: "",
    category: "general",
    priority: 1,
    progress: 0,
    status: "not started",
  };
  const [formData, setFormData] = useState(ticketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col w-1/2 gap-3"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label htmlFor="">Title</label>
        <input
          name="title"
          id="title"
          value={formData.title}
          required={true}
          onChange={handleChange}
          type="text"
        />
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          required={true}
          onChange={handleChange}
          rows="5"
        />
        <label htmlFor="">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
        </select>
        <label htmlFor="">Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label htmlFor="">1</label>
          <input
            type="radio"
            name="priority"
            id="priority-2"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label htmlFor="">2</label>
          <input
            type="radio"
            name="priority"
            id="priority-3"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label htmlFor="">3</label>
          <input
            type="radio"
            name="priority"
            id="priority-4"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label htmlFor="">4</label>
          <input
            type="radio"
            name="priority"
            id="priority-5"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label htmlFor="">5</label>
        </div>
        <label htmlFor="">Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min="0"
          max="10"
          onChange={handleChange}
        />
        <label htmlFor="">Status</label>
        <select
          name="status"
          id=""
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn" value="Create Ticket" />
      </form>
    </div>
  );
};

export default TicketForm;
