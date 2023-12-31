import { useState } from "react";

//Material UI
import { FormControl, Button, IconButton, Divider, Popper, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

//others
import "./style.scss";
import AnimalModal from "../AnimalModal";
import CloseBtn from "@/components/CloseBtn";
import { settings, minGuest, maxGuest } from "./constants";

function GuestInputField({ id, open, anchorEl, onClick, guestNumber, setGuestNumber, onHandleTotalGuest }) {
    const [openAnimalModal, setOpenAnimalModal] = useState(false);

    const renderGuestInputField = () => {
        return settings.map((item, index) => (
            <div key={index}>
                <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                    <div className="group__title">
                        <h4>{item.inputName}</h4>
                        {item.link ? (
                            <Button
                                className="group__sub-text group__sub-text--link"
                                onClick={() => setOpenAnimalModal(true)}
                            >
                                {item.subText}
                            </Button>
                        ) : (
                            <p className="group__sub-text">{item.subText}</p>
                        )}
                    </div>

                    <div className="group__filter">
                        <IconButton
                            className="group__filter-btn"
                            onClick={() => {
                                const totalGuest = onHandleTotalGuest(guestNumber);

                                if (totalGuest >= minGuest) {
                                    return setGuestNumber({
                                        ...guestNumber,
                                        [item.inputName]: guestNumber[item.inputName] - 1,
                                    });
                                } else {
                                    return {
                                        ...guestNumber,
                                    };
                                }
                            }}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>

                        <p className="group__filter-number">{guestNumber[item.inputName]}</p>

                        <IconButton
                            className="group__filter-btn"
                            onClick={() => {
                                const totalGuest = onHandleTotalGuest(guestNumber);

                                if (totalGuest <= maxGuest) {
                                    return setGuestNumber({
                                        ...guestNumber,
                                        [item.inputName]: guestNumber[item.inputName] + 1,
                                    });
                                }
                            }}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                </FormControl>
                {item.divider ? <Divider /> : ""}
            </div>
        ));
    };

    return (
        <Popper
            id={id}
            className="search-item__sub-modal search-item__sub-modal--guest"
            component="form"
            anchorEl={anchorEl}
            open={open}
        >
            <CloseBtn onClick={onClick} sx={{ display: { xs: "flex", sm: "none" } }} />
            <Box sx={{ py: 4 }}>{renderGuestInputField()}</Box>
            <AnimalModal onOpen={openAnimalModal} onClose={() => setOpenAnimalModal(false)} />
        </Popper>
    );
}

export default GuestInputField;
