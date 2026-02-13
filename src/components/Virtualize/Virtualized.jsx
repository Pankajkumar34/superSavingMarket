// import * as React from "react";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { TextField, Popper } from "@mui/material";

// function VirtualList({ options, onSelect }) {
//   const parentRef = React.useRef(null);

//   const rowVirtualizer = useVirtualizer({
//     count: options?.length>0?options.length:0,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 48,
//     overscan: 5,
//   });

//   return (
//     <div
//       ref={parentRef}
//       style={{
//         height: 300,
//         width: "100%",
//         overflow: "auto",
//       }}
//     >
//       <div
//         style={{
//           height: rowVirtualizer.getTotalSize(),
//           width: "100%",
//           position: "relative",
//         }}
//       >
//         {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//           const item = options[virtualRow.index];
//           return (
//             <div
//               key={virtualRow.key}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: virtualRow.size,
//                 transform: `translateY(${virtualRow.start}px)`,
//               }}
//               className="cursor-pointer px-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800"
//               onClick={() => onSelect(item)}
//             >
//               {item.name}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default function BrandVirtualSelect({ brands, onChange }) {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <>
//       <TextField
//         fullWidth
//         size="small"
//         label="Select Brand"
//         value={value}
//         onFocus={() => setOpen(true)}
//         onChange={(e) => setValue(e.target.value)}
//       />

//       {open && (
//         <Popper open anchorEl={document.activeElement} placement="bottom-start">
//           <VirtualList
//             options={brands}
//             onSelect={(item) => {
//               setValue(item.name);
//               onChange(item);
//               setOpen(false);
//             }}
//           />
//         </Popper>
//       )}
//     </>
//   );
// }

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Popper,
  Paper
} from "@mui/material";

function VirtualList({ options, onSelect }) {
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: options?.length > 0 ? options.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: 300,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((row) => {
          const item = options[row.index];

          return (
            <div
              key={row.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: row.size,
                transform: `translateY(${row.start}px)`,
              }}
              className="px-3 flex items-center cursor-pointer
                         hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => onSelect(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BrandVirtualSelect({
  brands,
  value,
  onChange,
  label = "Select Brand",
}) {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>

        <OutlinedInput
          ref={anchorRef}
          readOnly
          label={label}
          value={value?.name || ""}
          onClick={() => setOpen(true)}
        />
      </FormControl>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{
          zIndex: 1300,
          width: anchorRef.current?.offsetWidth,
        }}
      >
        <Paper elevation={3}>
          {brands?.length > 0 ? (
            <VirtualList
              options={brands}
              onSelect={(item) => {
                onChange(item);
                setOpen(false);
              }}
            />
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No data found
            </div>
          )}
        </Paper>
      </Popper>


    </>
  );
}

