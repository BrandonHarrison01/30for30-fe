import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosWithAuth } from "../../axiosAuth";

function NewGoalForm(props) {
  let [categories, setCategories] = useState([]);
  let [toggleInput, setToggleInput] = useState(0);
  let [newCategory, setNewCategory] = useState("");
  let [categoryLength, setCategoryLength] = useState(0);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err, "err"));
  }, [categoryLength]);

  const changeHandler = e => {
    e.preventDefault();
    props.setNewGoal({ ...props.newGoal, [e.target.name]: e.target.value });
  };

  const submitNewCategory = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://thirty-before-thirty-bw.herokuapp.com/api/categories", {
        category_name: newCategory
      })
      .then(res => setCategoryLength(res.data.length))
      .catch(err => console.log(err));
    setToggleInput(0);
  };

  return (
    <Modal isOpen={props.newGoalFormModal} toggle={props.toggleModal}>
      <div className='modalContainer'>
        <ModalHeader toggle={props.toggleModal}>New Goal</ModalHeader>
        <ModalBody>
          {props.error && <p>Missing required field(s)</p>}
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
              type='date'
              name='target_date'
              onChange={changeHandler}
              value={props.newGoal.target_date}
            />
            <div>
              <label>
                <input
                  type='radio'
                  name='privacy'
                  onClick={e =>
                    props.setNewGoal({ ...props.newGoal, [e.target.name]: 0 })
                  }
                />
                Public
              </label>
              <label>
                <input
                  type='radio'
                  name='privacy'
                  onClick={e =>
                    props.setNewGoal({ ...props.newGoal, [e.target.name]: 1 })
                  }
                  defaultChecked
                />
                Private
              </label>
            </div>
            <select
              onChange={e =>
                props.setNewGoal({
                  ...props.newGoal,
                  category_id: parseInt(e.target.value)
                })
              }
            >
              <option defaultValue>Select</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {toggleInput ? (
              <div>
                <input
                  type='text'
                  placeholder='New Category'
                  onChange={e => setNewCategory(e.target.value)}
                />
                <button onClick={submitNewCategory}>Add</button>
                <button onClick={() => setToggleInput(0)}>X</button>
              </div>
            ) : (
              <button onClick={() => setToggleInput(1)}>New Category</button>
            )}
            <br />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={props.toggleModal}>Cancel</Button>
          <Button color='success' onClick={props.submitNewGoal}>Submit New Goal</Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}

export default NewGoalForm;
