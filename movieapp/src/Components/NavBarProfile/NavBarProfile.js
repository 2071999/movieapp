import React from "react";
import "../NavBarProfile/NavBarProfile.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import userIcon from '../../Assets/user.svg';
import { setIsLoggin } from '../../Pages/Login/ReducerLogin';
import { useDispatch, useSelector } from "react-redux";

const NavBarProfile = () => {

  const dispatch = useDispatch();

  const { registerData } = useSelector((state) => state.register);

  const onClickLogout = () => {
        dispatch(setIsLoggin(false));
  }

  return (
    <div className="mainNavBarProfile">
      <OverlayTrigger
        trigger="click"
        key='bottom'
        placement='bottom'
        overlay={
          <Popover id={`popover-positioned-bottom`} className='minProWidth'>
            <Popover.Header as="h3">
                <div>{registerData[0]?.name}</div>
              <div className="email fw-light text-secondary">{registerData[0]?.email}</div>
                
            </Popover.Header>
            <Popover.Body>

              <div className='d-flex flex-column'>
                <button className='edite-profile pb-1 btn-transfer m-0 p-0 text-start'> Edite Profile </button>
                <button className='logout pb-1 btn-transfer p-0 text-start' onClick={onClickLogout}> Logout </button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="light" className='rounded-circle my-nav-user-btn me-3'>
            <img src={userIcon} alt="" height='32px' width='28px'/>
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default NavBarProfile;
