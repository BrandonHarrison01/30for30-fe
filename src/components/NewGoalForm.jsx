import React, { useState } from "react";

function NewGoalForm() {
  let [newGoal, setNewGoal] = useState({
    item_name: "",
    description: "",
    category_id: 0,
    privacy: 1,
    target_date: ''
  });

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
          onChange={e => setNewGoal({ ...newGoal, [e.target.name]: e.target.value })}
        />
        <input
          type='text'
          name='description'
          onChange={e => setNewGoal({ ...newGoal, [e.target.name]: e.target.value })}
        />
        <input
          type='text'
          name='target_date'
          onChange={e => setNewGoal({ ...newGoal, [e.target.name]: e.target.value })}
        />
        {/* <input /> */}
        <button onClick={handleSubmit}>click</button>
      </form>
    </div>
  );
}

export default NewGoalForm;
