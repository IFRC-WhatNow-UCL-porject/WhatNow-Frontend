import React, { useState, Suspense } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkLogStatus, checkUserRole } from "../store/features/auth.slice";

import Alert from "./Alert";

const Waiting = ({ component, access }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logAlertOpen, setLogAlertOpen] = useState(false);
    const [roleAlertOpen, setRoleAlertOpen] = useState(false);

    const handleLogAlertClose = () => {
        setLogAlertOpen(false);
        navigate("/login");
    }

    const handleRoleAlertClose = () => {
        setRoleAlertOpen(false);
        navigate("/");
    }

    React.useEffect(() => {
        try {
            const agree = localStorage.getItem((localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : '') + "_agree");
            if (!agree) {
                localStorage.setItem("fail", "You have to agree to the terms and conditions first.")
                navigate("/terms_and_conditions")
            }
            dispatch(checkLogStatus()).then((response) => {
                if (!response.payload.status) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user");
                    setLogAlertOpen(true);
                } else {
                    dispatch(checkUserRole()).then((response) => {
                        if (response.payload.status) {
                            if (response.payload.data.role_id !== access) {
                                setRoleAlertOpen(true);
                            }
                        } else {
                            setLogAlertOpen(true);
                        }
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <Alert open={logAlertOpen} handleClose={handleLogAlertClose} text="You have been logged out! Please log in first." />
            <Alert open={roleAlertOpen} handleClose={handleRoleAlertClose} text="You do not have access to this page." />
            {(logAlertOpen || roleAlertOpen) ? null : <Suspense fallback={<div>waiting</div>}>{component()}</Suspense>}
        </div>
    );
};

export default Waiting;