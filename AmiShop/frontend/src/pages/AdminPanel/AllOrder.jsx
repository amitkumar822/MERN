import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";
import API from "../../api/axiosInstance";

const statuses = [
  { label: "Order Received", color: "#42a5f5" },
  { label: "Order Confirmed", color: "#66bb6a" },
  { label: "Order Shipped", color: "#29b6f6" },
  { label: "Order Delivered", color: "#ab47bc" },
  { label: "Order Canceled", color: "#ef5350" },
];

export default function AllOrder() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statuses[0].label);
  const [filteredOrders, setFilteredOrders] = useState([]);

  console.log(allOrders);

  useEffect(() => {
    setSelectedStatus(statuses[0].label);
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchOrderApi = async () => {
    try {
      const { data } = await API.get("/order/get-admin-all-order", {
        headers: { "Content-Type": "application/json" },
      });
      setAllOrders(data?.data || []);
      filterOrdersByStatus(data?.data || [], statuses[0].label);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrderApi();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (event) => setStatus(event.target.value);

  const handleUpdateStatus = async () => {
    console.log(selectedOrder._id, status);
    const newData = {
      orderId: selectedOrder._id,
      status,
    };
    try {
      await API.post("/order/update-status", newData);

      toast.success("Order status updated successfully");
      fetchOrderApi();
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  // Filter orders based on selected status
  const filterOrdersByStatus = (orders, statusLabel) => {
    let filtered = [];
    switch (statusLabel) {
      case "Order Received":
        filtered = orders.filter((order) => order.status === "pending");
        break;
      case "Order Confirmed":
        filtered = orders.filter((order) => order.status === "confirmed");
        break;
      case "Order Shipped":
        filtered = orders.filter((order) => order.status === "shipped");
        break;
      case "Order Delivered":
        filtered = orders.filter((order) => order.status === "delivered");
        break;
      case "Order Canceled":
        filtered = orders.filter((order) => order.status === "canceled");
        break;
      default:
        filtered = orders;
    }
    setFilteredOrders(filtered);
  };

  // Update orders when a status is clicked
  const handleStatusClick = (statusLabel) => {
    setSelectedStatus(statusLabel);
    filterOrdersByStatus(allOrders, statusLabel);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            py: 2,
            borderRadius: 2,
          }}
          className="bg-gradient-to-r from-rose-100 to-teal-100"
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
          >
            {statuses?.map((statusObj, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleStatusClick(statusObj.label)}
                sx={{
                  backgroundColor:
                    selectedStatus === statusObj.label
                      ? statusObj.color
                      : "white",
                  color: selectedStatus === statusObj.label ? "white" : "black",
                  "&:hover": {
                    backgroundColor:
                      selectedStatus === statusObj.label
                        ? statusObj.color
                        : "#bdbdbd",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {statusObj.label}
              </Button>
            ))}
          </Stack>
        </Box>

        <TableContainer sx={{ maxHeight: 570 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((order) => (
                  <TableRow hover key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewOrder(order)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">Order Details</Typography>
            <Typography>
              <strong>Order ID:</strong> {selectedOrder._id}
            </Typography>
            <Typography>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Time:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              }).format(new Date(selectedOrder.createdAt))}
            </Typography>

            <Typography>
              <strong>Name:</strong> {selectedOrder.name}
            </Typography>
            <Typography>
              <strong>Products:</strong>
            </Typography>
            {selectedOrder.productId?.map((product, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, mt: 1 }}>
                <img
                  src={product?.productImage?.[0]?.url}
                  alt={product?.productName}
                  style={{ width: "70px", height: "70px", borderRadius: "8px" }}
                />
                <Box>
                  <Typography>
                    <strong>Name:</strong> {product.productName}
                  </Typography>
                  <Typography>
                    <strong>Price:</strong> ₹{product.sellingPrice}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt: 3 }}>
              <Typography>
                <strong>Status:</strong>
              </Typography>
              <Select
                value={status}
                onChange={handleStatusChange}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="canceled">Canceled</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
              </Select>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateStatus}
              sx={{ mt: 2 }}
            >
              Update Status
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}

const columns = [
  { id: "orderId", label: "Order ID", minWidth: 150 },
  { id: "customerName", label: "Customer Name", minWidth: 150 },
  { id: "orderDate", label: "Order Date", minWidth: 150 },
  { id: "amount", label: "Total Amount", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];
