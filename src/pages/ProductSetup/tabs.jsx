import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const tabs = [
  { label: "Brand", tabPath: "brand-add" },
  { label: "Category", tabPath: "category-add" },
  { label: "Sub Category", tabPath: "subcategory-add" },
  { label: "Product Invantory", tabPath: "product" },
];

export default function TabButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  // current active tab from URL
  const activeTab = location.pathname.split("/").pop();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 1,
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.tabPath}
          variant={activeTab === tab.tabPath ? "contained" : "text"}
          onClick={() => navigate(`/add-product/${tab.tabPath}`)}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
}
