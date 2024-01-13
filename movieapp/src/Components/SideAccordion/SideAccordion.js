import React from 'react'
import '../SideAccordion/SideAccordion.scss'
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux"
import { getSortData } from '../../apiReducers/SortReducer'

const SideAccordion = () => {

  const dispatch = useDispatch();
  const { sortData } = useSelector((state) => state.sorting);


  const onChangeSort = (e) => {
    dispatch(getSortData(e.target.value));
  }

    return (
        <>
            <div className="sort-card py-2 ps-3">
              <div className="content py-2">
                <input
                  type="checkbox"
                  id="question1"
                  name="q"
                  className="questions"
                />
                <div className="plus"> + </div>
                <label htmlFor="question1" className="question ">
                  Sort
                </label>
                <div className="answers text-light fw-light">
                  <div className="sort-form">
                    <div className="sort-rating d-flex py-2">
                      <Form>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2 '>
                        <Form.Check.Input type='radio' value='rating' id='a' name='short' isValid  className='me-2 my-radio' onChange={onChangeSort} checked={sortData==='rating'?true:false}/>
                        <label  className="lable" htmlFor='a'>Rating</label>
                      </Form.Check>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2 '>
                        <Form.Check.Input type='radio' value='new' id='b' name='short' isValid  className='me-2  my-radio' onChange={onChangeSort} checked={sortData==='new'?true:false}/>
                        <label className="lable" htmlFor='b'>Newest Movie</label>
                      </Form.Check>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2 '>
                        <Form.Check.Input type='radio' value='old' id='c' name='short' isValid  className='me-2 my-radio' onChange={onChangeSort} checked={sortData==='old'?true:false}/>
                        <label className="lable" htmlFor='c'>Oldest Movie</label>
                      </Form.Check>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2 '>
                        <Form.Check.Input type='radio' value='none' id='c' name='short' isValid  className='me-2 my-radio' onChange={onChangeSort} checked={sortData==='none'?true:false}/>
                        <label className="lable" htmlFor='c'>None</label>
                      </Form.Check>
                      </Form>
                    </div>
                    
                  </div>
                </div>
              </div>
              {/* <div className="content py-2">
                <input
                  type="checkbox"
                  id="question9"
                  name="q"
                  className="questions"
                />
                <div className="plus"> + </div>
                <label htmlFor="question9" className="question ">
                Filter
                </label>
                <div className="answers text-light fw-light">
                  <div className="sort-head">Filter Results By</div>
                  <div className="sort-form">
                    <div className="sort-rating d-flex py-2">
                      <Form>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2'>
                        <Form.Check.Input type='radio' name='short' isValid  className='me-2 my-radio'/>
                        <div className="lable">Everything</div>
                      </Form.Check>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2'>
                        <Form.Check.Input type='radio' name='short' isValid  className='me-2  '/>
                        <div className="lable">I Haven't Seen</div>
                      </Form.Check>
                      <Form.Check type='radio' id={`check-api-radio`} className='d-flex py-2'>
                        <Form.Check.Input type='radio' name='short' isValid  className='me-2'/>
                        <div className="lable">I Have Seen</div>
                      </Form.Check>
                      </Form>
                    </div>
                    
                  </div>
                </div>
              </div> */}

              
              
              
              
            </div>
        </>
    )
}

export default SideAccordion
