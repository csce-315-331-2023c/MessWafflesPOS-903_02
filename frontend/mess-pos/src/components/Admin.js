// File: Admin.js
// Admin interface of the POS system

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab, Table, Button } from "react-bootstrap";

const Admin = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [triggerEmployeeData, setTriggerEmployeeData] = useState(false);

    useEffect(() => {
        setTriggerEmployeeData(!triggerEmployeeData);
    }, []);

    useEffect(() => {
        axios
            .get("https://messwafflespos.onrender.com/api/auth/employees")
            .then((response) => {
                setEmployeeData(response.data);
                setLoadingEmployees(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [triggerEmployeeData]);

    // employee code
    function updateEmployee(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const postdata = Object.fromEntries(formData.entries());
        console.log(postdata);
        axios
            .post("https://messwafflespos.onrender.com/api/auth/employees", {
                id: postdata.ID,
                name: postdata.Name,
                email: postdata.Email,
                role: postdata.Role,
            })
            .then((response) => {
                console.log(response.data);
                setTriggerEmployeeData(!triggerEmployeeData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function deleteEmployee(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const postdata = Object.fromEntries(formData.entries());
        console.log(postdata);
        axios
            .delete("https://messwafflespos.onrender.com/api/auth/employees", {
                data: { id: postdata.ID },
            })
            .then((response) => {
                console.log(response.data);
                setTriggerEmployeeData(!triggerEmployeeData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <main>
            <Tabs defaultActiveKey="employees" id="uncontrolled-tab-example">
                <Tab eventKey="employees" title="Employees">
                    {loadingEmployees ? (
                        <p>Loading Employees...</p>
                    ) : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeData.rows.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val.id}</td>
                                                <td>{val.name}</td>
                                                <td>{val.role}</td>
                                                <td>{val.email}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <center>
                                <form onSubmit={updateEmployee}>
                                    Update/Create Employee:
                                    <input
                                        name="ID"
                                        label="ID"
                                        placeholder="ID"
                                    />
                                    <input
                                        name="Name"
                                        label="Name"
                                        placeholder="Name"
                                    />
                                    <select
                                        name="Role"
                                        label="Role"
                                        style={{
                                            width: "200px",
                                            height: "30px",
                                        }}
                                    >
                                        <option value="Manager">Manager</option>
                                        <option value="Cashier">Cashier</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <input
                                        name="Email"
                                        label="Email"
                                        placeholder="Email"
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                                <br></br>
                                <form onSubmit={deleteEmployee}>
                                    Delete Employee:
                                    <input
                                        name="ID"
                                        label="ID"
                                        placeholder="ID"
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </center>
                        </>
                    )}
                </Tab>
            </Tabs>
        </main>
    );
};

export default Admin;
