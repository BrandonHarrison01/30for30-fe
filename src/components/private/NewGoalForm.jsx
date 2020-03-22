import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../axiosAuth";

function NewGoalForm(props) {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err, "err"));
  }, []);

  const changeHandler = e => {
    e.preventDefault()
    props.setNewGoal({ ...props.newGoal, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>New Goal</h1>
      <form>
        <input
          type='text'
          name='item_name'
          onChange={changeHandler}
          value={props.newGoal.item_name}
          />
        <input
          type='text'
          name='description'
          onChange={changeHandler}
          value={props.newGoal.description}
          />
        <input
          type='text'
          name='target_date'
          onChange={changeHandler}
          value={props.newGoal.target_date}
        />
        <div>
          <label>
            <input
              type='radio'
              name='privacy'
              onClick={e => props.setNewGoal({ ...props.newGoal, [e.target.name]: 0 })}
              />
            Public
          </label>
          <label>
            <input
              type='radio'
              name='privacy'
              onClick={e => props.setNewGoal({ ...props.newGoal, [e.target.name]: 1 })}
              defaultChecked
            />
            Private
          </label>
        </div>
        <select
          onChange={e =>
            props.setNewGoal({...props.newGoal, category_id: parseInt(e.target.value)})
          }
        >
          <option defaultValue >Select</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <button onClick={props.submitNewGoal}>click</button>
      </form>
    </div>
  );
}

export default NewGoalForm;
