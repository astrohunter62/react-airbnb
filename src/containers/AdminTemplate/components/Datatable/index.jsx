import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Material UI
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";

// Style
import "./style.scss";

const Datatable = ({ rootPage, columns, getRequest, deleteRequest }) => {
    /*
     *  Fetch users
     */
    const { data, isLoading } = useQuery(rootPage, getRequest, {
        refetchOnWindowFocus: false,
    });
    let rows = data?.data || [];

    /*
     *  Handle search users
     */
    const [searchedUsers, setSearchedUsers] = useState(null);
    const searchKey = useRef("");
    const handleSearch = (event) => {
        // If search input is empty
        //   return all users
        const { value } = event.target;
        searchKey.current = value;
        if (!value) {
            setSearchedUsers(rows);
            return;
        }

        const searchedUsers = rows.filter((row) => {
            if (typeof row.name !== "string") {
                return false;
            }

            const found = row.name.toLowerCase().includes(value.toLowerCase());

            return found;
        });

        setSearchedUsers(searchedUsers);
    };

    /*
     *  Handle delete user
     */
    const queryClient = useQueryClient();
    const { mutate, isError } = useMutation(deleteRequest, {
        mutationKey: `${rootPage}/delete`,
        onSuccess: () => {
            setOpen(true);
            (async () => {
                await queryClient.invalidateQueries(rootPage);
                rows = queryClient.getQueryData(rootPage).data;
                handleSearch({ target: { value: searchKey.current } });
            })();
        },
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    /*
     *  Handle open/close notification popup
     */
    const [open, setOpen] = useState(false);
    const handleClose = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    /*
     *  Handle change page size
     */
    const [pageSize, setPageSize] = useState(4);
    const handleChangePageSize = (pageSize) => {
        setPageSize(pageSize);
    };

    const actionColumn = [
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.7,
            renderCell: (params) => (
                <div className="cell-actions">
                    <Tooltip title="Edit" placement="top" arrow>
                        <Link to={`/${rootPage}/edit`} style={{ textDecoration: "none" }}>
                            <IconButton className="cell-action btn-edit">
                                <Edit />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                        <IconButton className="cell-action btn-delete" onClick={() => handleDelete(params.row._id)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="datatable-wrapper">
                <div className="datatable">
                    <div className="top">
                        <div className="search">
                            <input type="text" placeholder="Enter name ..." onChange={handleSearch} />
                            <Search />
                        </div>
                        <Link to="new" className="link">
                            <strong>+</strong> Add New
                        </Link>
                    </div>
                    <DataGrid
                        className="data-grid"
                        rows={searchedUsers || rows}
                        columns={columns.concat(actionColumn)}
                        pageSize={pageSize}
                        rowsPerPageOptions={[4, 6, 8]}
                        onPageSizeChange={handleChangePageSize}
                        getRowId={(row) => row._id}
                        autoHeight
                        loading={isLoading}
                        headerHeight={45}
                        rowHeight={40}
                    />
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity={isError ? "error" : "success"} sx={{ width: "100%" }}>
                    {isError ? "Cannot delete user!" : "Delete user successfully!"}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Datatable;