import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";

function NewGoalForm() {
  let [newGoal, setNewGoal] = useState({
    item_name: "",
    description: "",
    category_id: 0,
    privacy: 1,
    target_date: ""
  });

  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err, "err"));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(newGoal);
  };

  return (
    <div>
      <h1>New Goal</h1>
      <form>
        <input
          type='text'
          name='item_name'
          onChange={e =>
            setNewGoal({ ...newGoal, [e.target.name]: e.target.value })
          }
        />
        <input
          type='text'
          name='description'
          onChange={e =>
            setNewGoal({ ...newGoal, [e.target.name]: e.target.value })
          }
        />
        <input
          type='text'
          name='target_date'
          onChange={e =>
            setNewGoal({ ...newGoal, [e.target.name]: e.target.value })
          }
        />
        <div>
          <input
            type='radio'
            name='privacy'
            onClick={e => setNewGoal({ ...newGoal, [e.target.name]: 0 })}
          />
          <label>Public</label>
          <input
            type='radio'
            name='privacy'
            onClick={e => setNewGoal({ ...newGoal, [e.target.name]: 1 })}
          />
          <label>Private</label>
        </div>
        <select
          //   value={}
          onChange={e =>
            setNewGoal({
              ...newGoal,
              ["category_id"]: parseInt(e.target.value)
            })
          }
        >
          <option>Select</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>click</button>
      </form>
    </div>
  );
}

export default NewGoalForm;
