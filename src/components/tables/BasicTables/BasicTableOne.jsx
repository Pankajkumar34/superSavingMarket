// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";

// import Badge from "../../ui/badge/Badge";

// // Table data
// const tableData = [
//   {
//     id: 1,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Lindsey Curtis",
//       role: "Web Designer",
//     },
//     projectName: "Agency Website",
//     team: {
//       images: [
//         "/images/user/user-22.jpg",
//         "/images/user/user-23.jpg",
//         "/images/user/user-24.jpg",
//       ],
//     },
//     budget: "3.9K",
//     status: "Active",
//   },
//   {
//     id: 2,
//     user: {
//       image: "/images/user/user-18.jpg",
//       name: "Kaiya George",
//       role: "Project Manager",
//     },
//     projectName: "Technology",
//     team: {
//       images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
//     },
//     budget: "24.9K",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Zain Geidt",
//       role: "Content Writing",
//     },
//     projectName: "Blog Writing",
//     team: {
//       images: ["/images/user/user-27.jpg"],
//     },
//     budget: "12.7K",
//     status: "Active",
//   },
//   {
//     id: 4,
//     user: {
//       image: "/images/user/user-20.jpg",
//       name: "Abram Schleifer",
//       role: "Digital Marketer",
//     },
//     projectName: "Social Media",
//     team: {
//       images: [
//         "/images/user/user-28.jpg",
//         "/images/user/user-29.jpg",
//         "/images/user/user-30.jpg",
//       ],
//     },
//     budget: "2.8K",
//     status: "Cancel",
//   },
//   {
//     id: 5,
//     user: {
//       image: "/images/user/user-21.jpg",
//       name: "Carla George",
//       role: "Front-end Developer",
//     },
//     projectName: "Website",
//     team: {
//       images: [
//         "/images/user/user-31.jpg",
//         "/images/user/user-32.jpg",
//         "/images/user/user-33.jpg",
//       ],
//     },
//     budget: "4.5K",
//     status: "Active",
//   },
// ];

// export default function BasicTableOne() {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <Table>
//           {/* Table Header */}
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 User
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Project Name
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Team
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Status
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Budget
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           {/* Table Body */}
//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {tableData.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell className="px-5 py-4 sm:px-6 text-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 overflow-hidden rounded-full">
//                       <img
//                         width={40}
//                         height={40}
//                         src={order.user.image}
//                         alt={order.user.name}
//                       />
//                     </div>
//                     <div>
//                       <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                         {order.user.name}
//                       </span>
//                       <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
//                         {order.user.role}
//                       </span>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   {order.projectName}
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   <div className="flex -space-x-2">
//                     {order.team.images.map((teamImage, index) => (
//                       <div
//                         key={index}
//                         className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
//                       >
//                         <img
//                           width={24}
//                           height={24}
//                           src={teamImage}
//                           alt={`Team member ${index + 1}`}
//                           className="w-full size-6"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                   <Badge
//                     size="sm"
//                     color={
//                       order.status === "Active"
//                         ? "success"
//                         : order.status === "Pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   >
//                     {order.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                   {order.budget}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }


import { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { useNavigate } from "react-router";

/* ================== TABLE DATA ================== */
// const tableData = [
//   {
//     id: 1,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Lindsey Curtis",
//       email: "lindsey@gmail.com",
//       role: "Web Designer",
//     },
//     projectName: "Agency Website",
//     budget: "3.9K",
//     status: "Active",
//     isActive:true
//   },
//   {
//     id: 2,
//     user: {
//       image: "/images/user/user-18.jpg",
//       name: "Kaiya George",
//       email: "kaiya@gmail.com",
//       role: "Project Manager",
//     },
//     projectName: "Technology",
//     budget: "24.9K",
//     status: "Pending",
//     isActive:true
//   },
//   {
//     id: 3,
//     user: {
//       image: "/images/user/user-19.jpg",
//       name: "Zain Geidt",
//       email: "zain@gmail.com",
//       role: "Content Writer",
//     },
//     projectName: "Blog Writing",
//     budget: "12.7K",
//     status: "Active",
//     isActive:true
//   },
//   {
//     id: 4,
//     user: {
//       image: "/images/user/user-20.jpg",
//       name: "Abram Schleifer",
//       email: "abram@gmail.com",
//       role: "Digital Marketer",
//     },
//     projectName: "Social Media",
//     budget: "2.8K",
//     status: "Cancel",
//     isActive:false
//   },
//   {
//     id: 5,
//     user: {
//       image: "/images/user/user-21.jpg",
//       name: "Carla George",
//       email: "carla@gmail.com",
//       role: "Frontend Developer",
//     },
//     isActive:true,
//     projectName: "Website",
//     budget: "4.5K",
//     status: "Active",
//   },
// ];

/* ================== CONSTANT ================== */
const ITEMS_PER_PAGE = 10;

/* ================== COMPONENT ================== */
export default function BasicTableOne({tableData}) {
  const navigate = useNavigate()
 const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const [sortOrder, setSortOrder] = useState("asc");

const ITEMS_PER_PAGE = 10;

/* ================== SEARCH + SORT ================== */
const filteredData = useMemo(() => {
  if (!tableData?.length) return [];

  let filtered = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  filtered.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return filtered;
}, [tableData, search, sortOrder]);

/* ================== PAGINATION ================== */
const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

const paginatedData = useMemo(() => {
  return filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
}, [filteredData, page]);

/* ================== PAGE SAFETY ================== */
useEffect(() => {
  if (page > totalPages && totalPages > 0) {
    setPage(1);
  }
}, [page, totalPages]);

/* ================== TOGGLE ACTIVE ================== */
const toggleActive = (id) => {
  // ❗ ye change parent/tableData source me hona chahiye
  // example:
 
};


  /* ================== EXCEL DOWNLOAD ================== */
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Name: item.name,
        Email: item.email,
        Role: item.role,
        Status: item.status,
        Active: item.isActive ? "Yes" : "No",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users-table.xlsx");
  };

  return (
    <div className="rounded-xl border bg-white dark:bg-white/[0.03]">

      {/* 🔍 Search + Excel */}
      <div className="flex flex-wrap gap-3 justify-between p-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="flex gap-2">
          <button
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            className="border px-4 py-2 rounded"
          >
            Sort {sortOrder === "asc" ? "↑" : "↓"}
          </button>

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>
        </div>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>User</TableCell>
              <TableCell isHeader>Status</TableCell>
               <TableCell isHeader>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData?.map((User) => (
              <TableRow key={User._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={User.profileImage}
                        alt={User.profileImage}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {User.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {User.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell> */}
                

                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.user.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      User.status === "Active"
                        ? "success"
                        : User.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {User.status}
                  </Badge>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell> */}

                <TableCell>
                  <button
                    onClick={() => toggleActive(User._id)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      User.status ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`bg-white w-4 h-4 rounded-full transform transition ${
                        User.status ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button onClick={()=>navigate(`/details-view/${User._id}`)}
                      
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                    >
                      View
                    </button>

                    <button
                      
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.user.image}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div>
                      <div className="font-medium">{item.user.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{item.projectName}</TableCell>

                <TableCell>
                  <Badge
                    size="sm"
                    color={
                      item.status === "Active"
                        ? "success"
                        : item.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell>{item.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </div>

      {/* ⏭ Pagination */}
      <div className="flex justify-end items-center gap-3 p-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
