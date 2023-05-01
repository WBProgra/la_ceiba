import React, { useEffect, useRef, useState } from "react";
import {
  getCategories,
  deleteCategories,
  createCategory,
  getCategoryById,
  putCategory,
} from "../../conection/category";
import TableComponent from "../../components/Tables/Table";
import useListAPI from "../../hooks/useListAPI";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

import { DownloadTableExcel } from "react-export-table-to-excel";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  category: yup.string().required("Name category is required please !"),
});

const Category = () => {
  const { data, getData } = useListAPI({ getFunction: getCategories });
  const [isEdit, setIsEdit] = useState(false);
  const [dataByID, setDataByID] = useState({});

  const tableRef = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIsEdit(false);
    setShow(true);
  };

  const edit = async (id) => {
    const response = await getCategoryById(id);
    setDataByID(response);
    setIsEdit(true);
    setShow(true);
  };


  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {}, resolver: yupResolver(schema) });

  if (isEdit) {
  }

  const swalDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategories(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getData();
      }
    });
  };

  useEffect(() => {
    let defaultValues = {};
    if (isEdit) {
      defaultValues.category = dataByID.category;
      defaultValues.description = dataByID.description;
    } else {
      defaultValues.category = "";
      defaultValues.description = "";
    }
    reset({ ...defaultValues });
  }, [dataByID, isEdit]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Category",
        columns: [
          {
            Header: "Name",
            accessor: "category",
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Actions",
            accessor: (d) => {
              return (
                <>
                  <a href>
                    <i
                      onClick={() => swalDelete(d.CategoryID)}
                      className="fa fa-trash"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a href style={{ marginLeft: "15px" }}>
                    <i
                      onClick={() => edit(d.CategoryID)}
                      className="fa fa-pencil"
                      aria-hidden="true"
                    ></i>
                  </a>
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );

  const onSubmit = async (data) => {
    if (isEdit) {
      await putCategory(dataByID.CategoryID, data);
    } else {
      await createCategory(data);
    }
    getData();
    setShow(false);
  };

  const form_input = [
    {
      name: "category",
      type: "text",
      placeholder: "Category name",
      label: "Name",
      errors: errors.category?.message,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Product description",
      label: "Description",
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {form_input.map((input) => {
                return (
                  <div key={input.name}>
                    <Form.Label style={{ marginLeft: "10px" }}>
                      {input.label}
                    </Form.Label>

                    <Form.Control
                      style={{ marginBottom: "10px" }}
                      type={input.type}
                      placeholder={input.placeholder}
                      name={input.name}
                      {...register(input.name)}
                    />

                    <p style={{ color: "red", marginLeft: "10px" }}>
                      {input.errors}
                    </p>
                  </div>
                );
              })}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Button
        style={{ marginBottom: "2px", marginRight: "10px" }}
        onClick={() => handleShow()}
        variant="primary"
      >
        Add Category
      </Button>
      <DownloadTableExcel
        filename="category_report"
        sheet="Category Report"
        currentTableRef={tableRef.current}
      >
        <Button variant={"success"}>
          {" "}
          <i
            style={{ marginRight: "5px" }}
            class="fa fa-file-excel-o"
            aria-hidden="true"
          ></i>{" "}
          Export excel
        </Button>
      </DownloadTableExcel>
      <TableComponent columns={columns} data={data} ref_={tableRef} />
    </div>
  );
};

export default Category;
