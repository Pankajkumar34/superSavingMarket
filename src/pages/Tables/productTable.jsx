import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Avatar,
  Stack,
  Typography,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import {
  EyeIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const ProductTable = ({
  products = [],
  onView,
  onDelete,
  onToggleStatus,
  lastElementRef
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
   <div className="max-w-7xl mx-auto">
    <button onClick={() => navigate("/add-product")} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
      + Add Product
    </button>
     <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Barcode</TableCell>
            {/* {!isMobile && <TableCell>Brand</TableCell>} */}
            {!isMobile && <TableCell>Category</TableCell>}
            {!isMobile && <TableCell>Subcategory</TableCell>}
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p,index) => (
            <TableRow key={p._id} hover ref={lastElementRef}>
              {/* Product */}
              <TableCell>{index+1}</TableCell>
              {/* <TableCell>
                <img src={""} alt="" />
              </TableCell> */}
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    src={p.images?.[0]?.url}
                    sx={{ width: 48, height: 48 }}
                  />
                  <div>
                    <Typography fontWeight={600}>
                      {p.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.slug}
                    </Typography>
                  </div>
                </Stack>
              </TableCell>

              {!isMobile && (
                <TableCell>{p.brand?.name || "-"}</TableCell>
              )}

              {!isMobile && (
                <TableCell>{p.category?.name || "-"}</TableCell>
              )}
               {!isMobile && (
                <TableCell>{p.subcategory?.name || "-"}</TableCell>
              )}

              {/* Status */}
              <TableCell align="center">
                <Switch
                  checked={p.isActive}
                  onChange={() => onToggleStatus(p)}
                  color="success"
                />
              </TableCell>

              {/* Actions */}
               <TableCell align="center">
                <Tooltip title="View">
                  <IconButton onClick={() => onView(p)}>
                    <EyeIcon className="w-5 h-5 text-gray-700" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => onDelete(p)}
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
   </div>
  );
};

export default ProductTable;
