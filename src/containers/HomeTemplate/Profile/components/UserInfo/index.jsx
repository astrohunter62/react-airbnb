import { useState, useCallback, useEffect } from "react";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Cake, Close, Home, Phone } from "@mui/icons-material";
import { Alert, Button, Collapse, IconButton } from "@mui/material";

//others
import "./style.scss";
import moment from "moment";
import ProfileModal from "../ProfileModal";

function UserInfo({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setServerResponse(null);
        }, 6000);

        return () => {
            clearInterval(intervalId);
        };
    }, [serverResponse]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDeleteToastMsg = () => {
        setServerResponse(null);
    };

    const renderBasicInfo = () => {
        const basicInfo = [
            { name: "address", icon: <Home />, content: "Lives in" },
            { name: "phone", icon: <Phone />, content: null },
            { name: "birthday", icon: <Cake />, content: null },
        ];

        return basicInfo?.map((item, index) => {
            if (data[item.name]) {
                const isDate = moment(data[item.name]).isValid();
                if (isDate) {
                    return (
                        <li key={index} className="user-info__basic-info-item">
                            {item.icon}
                            {moment(data[item.name]).format("DD/MM/YYYY")}
                        </li>
                    );
                }

                return (
                    <li key={index} className="user-info__basic-info-item">
                        {item.icon}
                        {item.content ? `${item.content} ${data[item.name]}` : data[item.name]}
                    </li>
                );
            }
        });
    };

    return (
        <>
            <h2 className="user-info__title">Hi, I’m {data?.name}</h2>
            <p className="user-info__join-date">Joined in 2018</p>
            <Button className="user-info__btn user-details__btn—fix-profile" onClick={handleOpenModal}>
                Edit profile
            </Button>

            {serverResponse && (
                <Alert
                    severity={serverResponse.type}
                    action={
                        <IconButton size="small" color="inherit" onClick={handleDeleteToastMsg}>
                            <Close />
                        </IconButton>
                    }
                >
                    {serverResponse.content}
                </Alert>
            )}

            <ul className="user-info__basic-info">
                <h4 className="profile__sub-title">About</h4>
                {data && renderBasicInfo()}
            </ul>
            {/* <ProfileModal
                open={openModal}
                handleClose={handleCloseModal}
                userData={data}
                serverResponse={serverResponse}
                setServerResponse={setServerResponse}
            /> */}
        </>
    );
}

function Loading() {
    return (
        <>
            <WaveSkeleton variant="text" sx={{ fontSize: "32px", width: "200px" }} />
            <WaveSkeleton variant="text" sx={{ fontSize: "32px", width: "200px" }} />
            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "150px" }} />
            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "70px" }} />

            <ul className="user-info__basic-info">
                <h4 className="profile__sub-title">About</h4>
                {Array(3)
                    .fill(0)
                    .map((item, index) => (
                        <WaveSkeleton key={index} variant="text" sx={{ fontSize: "16px", width: "250px" }} />
                    ))}
            </ul>
        </>
    );
}

UserInfo.Loading = Loading;

export default UserInfo;
