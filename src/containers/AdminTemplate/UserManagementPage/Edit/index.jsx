// Components
import Form from "../../components/Form";

// Input validator
import { userSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { userApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { EDIT } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    type: "ADMIN",
};

const Edit = () => {
    return (
        <Form
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={formColumns}
            validator={userSchema.edit}
            getRequest={userApi.getUserDetails}
            putRequest={userApi.editUser}
        />
    );
};

export default Edit;
