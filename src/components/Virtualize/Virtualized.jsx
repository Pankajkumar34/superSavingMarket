import * as React from "react";
import {
  TextField,
  MenuItem,
  Box
} from "@mui/material";

import {FixedSizeList} from "react-window";
const ITEM_HEIGHT = 48;

function VirtualizedMenuList(props) {
  const { children } = props;
  const itemData = React.Children.toArray(children);

  return (
    <FixedSizeList
      height={Math.min(8, itemData.length) * ITEM_HEIGHT}
      itemCount={itemData.length}
      itemSize={ITEM_HEIGHT}
      width="100%"
      itemData={itemData}
    >
      {({ index, style, data }) => (
        <div style={style}>
          {data[index]}
        </div>
      )}
    </FixedSizeList>
  );
}

export default function BrandSelect({ brands, value, onChange }) {
  return (
    <TextField
      select
      label="Select Brand"
      fullWidth
      value={value}
      onChange={onChange}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: { maxHeight: 400 }
          }
        },
        MenuListProps: {
          component: VirtualizedMenuList
        }
      }}
    >
      {brands.map((brand) => (
        <MenuItem key={brand._id} value={brand._id}>
          {brand.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
