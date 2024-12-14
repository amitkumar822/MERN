import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./EditProduct";
import DeleteAdminProduct from "../../../../../DeleteAdminProduct";

function Row({ row, fetchAllProduct }) {
  const [open, setOpen] = useState(false);

  const [eachProduct, setEachProduct] = useState({});
  const [productId, setProductId] = useState("");

    const onDelete = async (productId) => {
      setProductId(productId);
    };

  const onEdit = (eachProductNew) => {
    setEachProduct(eachProductNew);
    console.log("eachProductNew: ", eachProductNew);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            src={row.productImage[0]?.url}
            alt={row.productName}
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
        </TableCell>
        <TableCell>{row.productName}</TableCell>
        <TableCell align="right">₹{row.sellingPrice}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">
          <IconButton color="primary" aria-label="edit">
            <EditIcon onClick={() => onEdit(row)} />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            style={{ marginLeft: "10px" }}
          >
            <DeleteIcon onClick={() => onDelete(row._id)} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Product Details
              </Typography>
              <Typography>
                <strong>Brand:</strong> {row.brand}
              </Typography>
              <Typography>
                <strong>Category:</strong> {row.category}
              </Typography>
              <Typography>
                <strong>Description:</strong> {row.description}
              </Typography>
              <Typography>
                <strong>In the Box:</strong> {row.inTheBox}
              </Typography>
              <Box
                mt={2}
                display="flex"
                overflow="auto"
                style={{ whiteSpace: "nowrap" }}
              >
                {row.productImage.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product thumbnail ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      marginRight: "10px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Edit Product Modal */}
      {eachProduct?.productName && (
        <EditProduct
          product={eachProduct}
          setEachProduct={setEachProduct}
          fetchAllProduct={fetchAllProduct}
        />
      )}

      {/* Delete Product Modal */}
      {productId && (
        <DeleteAdminProduct
          productId={productId}
          setProductId={setProductId}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    productImage: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    productName: PropTypes.string.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    brand: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    inTheBox: PropTypes.string,
  }).isRequired,
};

export default function ProductTable({ products, fetchAllProduct }) {
  return (
    <>
      <TableContainer component={Paper} className="no-scrollbar">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Row key={product._id} row={product} fetchAllProduct={fetchAllProduct} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productImage: PropTypes.array.isRequired,
      productName: PropTypes.string.isRequired,
      sellingPrice: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      brand: PropTypes.string,
      category: PropTypes.string,
      description: PropTypes.string,
      inTheBox: PropTypes.string,
    })
  ).isRequired,
};
