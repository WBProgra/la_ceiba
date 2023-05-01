import React, { useEffect, useState, useRef } from "react";
import {
  getProducts,
  deleteProduct,
  createProduct,
  getProductById,
  putProduct,
} from "../../conection/product";
import useListAPI from "../../hooks/useListAPI";
import TableComponent from "../../components/Tables/Table";
import Swal from "sweetalert2";
import moment from "moment";


import Select from "react-select";


import { DownloadTableExcel } from "react-export-table-to-excel";

import { useForm } from "react-hook-form";


import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { getAsyncCategories } from "../../conection/category";


const schema = yup.object().shape({
  name: yup.string().required("Name product is required please !"),
  description: yup.string().required("Description is required please !"),
  existence: yup.string().required("Existence is required please !"),
  expiration_date: yup
    .string()
    .required("Expiration date is required please !"),
  price_cost: yup.string().required("Price cost is required please !"),
  price_sale: yup.string().required("Price sale is required please !"),
  quantity: yup.string().required("Quantity is required please !"),
});

const Product = () => {
  const [show, setShow] = useState(false);
  const { data, getData } = useListAPI({ getFunction: getProducts });

  const [isEdit, setIsEdit] = useState(false);
  const [dataByID, setDataByID] = useState({});

  const tableRef = useRef(null);


  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {}, resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (isEdit) {
      await putProduct(dataByID.ProductID, data);
    } else {
      await createProduct(data);
    }
    getData();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setDataByID({});
    setIsEdit(false);
    setShow(true);
  };

  const edit = async (id) => {
    const response = await getProductById(id);
    setDataByID(response);
    setIsEdit(true);
    setShow(true);
  };

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
        deleteProduct(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getData();
      }
    });
  };

  useEffect(() => {
    let defaultValues = {};
    if (isEdit) {
      defaultValues.name = dataByID.name;
      defaultValues.description = dataByID.description;
      defaultValues.existence = dataByID.existence;
      defaultValues.expiration_date = moment(dataByID.expiration_date).format(
        "DD/MM/YYYY"
      );
      defaultValues.price_cost = dataByID.price_cost;
      defaultValues.price_sale = dataByID.price_sale;
      defaultValues.supplier = dataByID.supplier;
      defaultValues.nit_supplier = dataByID.nit_supplier;
      defaultValues.quantity = dataByID.quantity;
    } else {
      defaultValues.name = "";
      defaultValues.description = "";
      defaultValues.existence = "";
      defaultValues.expiration_date = "";
      defaultValues.price_cost = "";
      defaultValues.price_sale = "";
      defaultValues.supplier = "";
      defaultValues.nit_supplier = "";
      defaultValues.quantity = "";
    }
    reset({ ...defaultValues });
  }, [dataByID, isEdit]);

  const columns = React.useMemo(() => [
    {
      Header: "Products",
      columns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Existence",
          accessor: "existence",
        },
        {
          Header: "Date expiration",
          accessor: (d) => {
            return moment(d.expiration_date).format("DD/MM/YYYY");
          },
        },
        {
          Header: "PriceCost",
          accessor: "price_cost",
        },
        {
          Header: "PriceSale",
          accessor: "price_sale",
        },
        {
          Header: "Actions",
          accessor: (d) => {
            return (
              <>
                <a href>
                  <i
                    onClick={() => swalDelete(d.ProductID)}
                    className="fa fa-trash"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href style={{ marginLeft: "15px" }}>
                  <i
                    onClick={() => edit(d.ProductID)}
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
  ]);

  const form_input = [
    {
      name: "name",
      type: "text",
      placeholder: "Product name",
      label: "Name",
      errors: errors.name?.message,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Product description",
      label: "Description",
      errors: errors.description?.message,
    },
    {
      name: "existence",
      type: "number",
      placeholder: "Product existence",
      label: "Existence",
      errors: errors.existence?.message,
    },
    {
      name: "expiration_date",
      type: "date",
      placeholder: "Product expiration date",
      label: "Expiration date",
      errors: errors.expiration_date?.message,
    },
    {
      name: "supplier",
      type: "text",
      placeholder: "Product supplier",
      label: "Supplier",
    },
    {
      name: "nit_supplier",
      type: "text",
      placeholder: "Product nit supplier",
      label: "Nit supplier",
    },
    {
      name: "quantity",
      type: "number",
      placeholder: "Product quantity",
      label: "Quantity",
      errors: errors.quantity?.message,
    },
    {
      name: "price_cost",
      type: "number",
      placeholder: "Product price cost",
      label: "Price cost",
      errors: errors.price_cost?.message,
    },
    {
      name: "price_sale",
      type: "number",
      placeholder: "Product price sale",
      label: "Price sale",
      errors: errors.price_sale?.message,
    },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAsyncCategories();
      setCategories(response);
    };
    getCategories();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
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

              <Form.Label style={{ marginLeft: "10px" }}>Category</Form.Label>
              <Select
                name="category"
                defaultValue={dataByID.category}
                options={categories}
                isMulti={true}
                {...register("category")}
              />
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
        Add Product
      </Button>
      <DownloadTableExcel
        filename="product_table"
        sheet="Product Report"
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

export default Product;
