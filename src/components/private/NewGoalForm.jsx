import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import { axiosWithAuth } from "../../axiosAuth";
import AdminCategories from "./AdminCategories";

function NewGoalForm(props) {
  let [categories, setCategories] = useState([]);
  let [toggleInput, setToggleInput] = useState(0);
  let [newCategory, setNewCategory] = useState("");
  let [categoryLength, setCategoryLength] = useState(0);
  let [deleteCatModal, setDeleteCatModal] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err, "err"));
  }, [categoryLength]);

  const changeHandler = (e) => {
    e.preventDefault();
    props.setNewGoal({ ...props.newGoal, [e.target.name]: e.target.value });
  };

  const submitNewCategory = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://thirty-before-thirty-bw.herokuapp.com/api/categories", {
        category_name: newCategory,
      })
      .then((res) => setCategoryLength(res.data.length))
      .catch((err) => console.log(err));
    setToggleInput(0);
  };

  const toggleNewCategoryInput = (e) => {
    e.preventDefault();
    setToggleInput(1);
  };

  return (
    <Modal isOpen={props.newGoalFormModal} toggle={props.toggleModal}>
      <div className='modalContainer'>
        <ModalHeader toggle={props.toggleModal}>New Goal</ModalHeader>
        <ModalBody>
          {props.error && <p>Missing required field(s)</p>}
          <Form>
            <FormGroup>
              <Label for='goal'>Goal: </Label>
              <Input
                id='goal'
                type='text'
                name='item_name'
                onChange={changeHandler}
                value={props.newGoal.item_name}
              />
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description: </Label>
              <Input
                id='description'
                type='textarea'
                name='description'
                onChange={changeHandler}
                value={props.newGoal.description}
              />
            </FormGroup>
            <FormGroup>
              <Label for='target_date'>Finish by: </Label>
              <br />
              <input
                id='target_date'
                type='date'
                name='target_date'
                onChange={changeHandler}
                value={props.newGoal.target_date}
              />
            </FormGroup>
            <FormGroup tag='fieldset'>
              <p>Would you like other users to see this goal?</p>
              <FormGroup check>
                <Label check>
                  <Input
                    type='radio'
                    name='privacy'
                    onClick={(e) =>
                      props.setNewGoal({ ...props.newGoal, [e.target.name]: 0 })
                    }
                  />
                  Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type='radio'
                    name='privacy'
                    onClick={(e) =>
                      props.setNewGoal({ ...props.newGoal, [e.target.name]: 1 })
                    }
                    defaultChecked
                  />
                  No
                </Label>
              </FormGroup>
            </FormGroup>
            {toggleInput ? (
              <Row xs='3'>
                <Col xs='8'>
                  <Input
                    type='text'
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder='New category...'
                  />
                </Col>
                <Col xs='2'>
                  <Button color='success' onClick={submitNewCategory}>
                    Add
                  </Button>
                </Col>
                <Col xs='2'>
                  <Button outline color='danger' onClick={() => setToggleInput(0)}>X</Button>
                </Col>
              </Row>
            ) : (
              <div>
                <FormGroup>
                  <Label for='category'>Select a category: </Label>
                  <Row xs='2'>
                    <Col xs='8'>
                      <Input
                        type='select'
                        id='category'
                        onChange={(e) =>
                          props.setNewGoal({
                            ...props.newGoal,
                            category_id: parseInt(e.target.value),
                          })
                        }
                      >
                        <option defaultValue>Select</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category_name}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col xs='4'>
                      <Button color='primary' onClick={toggleNewCategoryInput}>
                        New
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
                {props.currentUser === "brandon" && (
                  <Button
                    outline
                    color='danger'
                    onClick={() => setDeleteCatModal(true)}
                  >
                    Admin Delete Categories
                  </Button>
                )}
              </div>
            )}
            <br />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={props.toggleModal}>
            Cancel
          </Button>
          <Button color='success' onClick={props.submitNewGoal}>
            Submit New Goal
          </Button>
        </ModalFooter>
      </div>
      <AdminCategories
        setDeleteCatModal={setDeleteCatModal}
        deleteCatModal={deleteCatModal}
        categories={categories}
      />
    </Modal>
  );
}

export default NewGoalForm;
