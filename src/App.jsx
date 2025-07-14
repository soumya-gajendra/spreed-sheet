import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiUpload, FiDownload, FiShare2 } from "react-icons/fi";
import { AiOutlineSortAscending, AiOutlineFilter } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import "./index.css";

const sampleData = [
  {
    job: "Launch social media campaign",
    date: "15-11-2024",
    status: "In-process",
    submitter: { name: "Aisha Patel", avatar: "A" },
    url: "www.aishapatel.com",
    assigned: { name: "Sophie Choudhury", avatar: "S" },
    priority: "Medium",
    due: "20-11-2024",
    value: "₹6,200,000",
  },
  {
    job: "Update press kit for company redesign",
    date: "28-10-2024",
    status: "Need to start",
    submitter: { name: "Irfan Khan", avatar: "I" },
    url: "www.irfankhanpage.com",
    assigned: { name: "Tejas Pandey", avatar: "T" },
    priority: "High",
    due: "30-10-2024",
    value: "₹3,500,000",
  },
  {
    job: "Finalize user testing feedback for app",
    date: "05-12-2024",
    status: "In-process",
    submitter: { name: "Mark Johnson", avatar: "M" },
    url: "www.markjohnson.dev",
    assigned: { name: "Rachel Lee", avatar: "R" },
    priority: "Medium",
    due: "10-12-2024",
    value: "₹4,750,000",
  },
  {
    job: "Design new features for the website",
    date: "10-01-2025",
    status: "Complete",
    submitter: { name: "Emily Green", avatar: "E" },
    url: "www.emilygreen.io",
    assigned: { name: "Tom Wright", avatar: "T" },
    priority: "Low",
    due: "15-01-2025",
    value: "₹5,900,000",
  },
  {
    job: "Prepare financial report for Q4",
    date: "25-01-2025",
    status: "Blocked",
    submitter: { name: "Jessica Brown", avatar: "J" },
    url: "www.jessicabrown.org",
    assigned: { name: "Kevin Smith", avatar: "K" },
    priority: "Low",
    due: "30-01-2025",
    value: "₹2,800,000",
  },
];

const headers = [
  "#",
  "Job Request",
  "Submitted",
  "Status",
  "Submitter",
  "URL",
  "Assigned",
  "Priority",
  "Due Date",
  "Est. Value",
];

const App = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [data, setData] = useState(sampleData);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  const handleSort = (colIndex) => {
    const columnKey = ["job", "date", "status", "submitter", "url", "assigned", "priority", "due", "value"][colIndex - 1];
    const sorted = [...data].sort((a, b) => {
      const aVal = typeof a[columnKey] === "object" ? a[columnKey].name : a[columnKey];
      const bVal = typeof b[columnKey] === "object" ? b[columnKey].name : b[columnKey];
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      else return aVal < bVal ? 1 : -1;
    });
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(colIndex);
  };

  const filteredData = data.filter((row) =>
    row.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const imported = JSON.parse(evt.target.result);
      setData(imported);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet_data.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-4 border-4 border-pink-500">
      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center border-b pb-3 mb-4 text-sm">
        <div className="text-gray-500 mb-2 sm:mb-0">
          Workspace &gt; Folder 2 &gt; <span className="font-semibold text-gray-700">Spreadsheet 3</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-black" onClick={() => fileInputRef.current.click()}>
            <FiUpload /> Import
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-black" onClick={handleExport}>
            <FiDownload /> Export
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-black" onClick={() => alert("Share link copied!")}>
            <FiShare2 /> Share
          </button>
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded flex items-center gap-1" onClick={() => setData([...data, {
            job: "",
            date: "",
            status: "",
            submitter: { name: "", avatar: "" },
            url: "",
            assigned: { name: "", avatar: "" },
            priority: "",
            due: "",
            value: "",
          }])}>
            <BsPlus className="text-lg" /> New Action
          </button>
          <div className="flex items-center gap-2 ml-3">
            <FaUserCircle className="text-xl text-gray-700" />
            <div className="text-xs">
              <div className="font-medium text-gray-700">John Doe</div>
              <div className="text-gray-500">john.doe@email.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Title + Controls */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
        <input
          type="text"
          value="Q3 Financial Overview"
          readOnly
          className="px-3 py-2 border rounded w-full sm:w-64 text-sm bg-gray-100"
        />
        <div className="flex gap-3 text-gray-500 items-center">
          <button className="flex items-center gap-1 hover:text-black" onClick={() => handleSort(1)}>
            <AiOutlineSortAscending /> Sort
          </button>
          <button className="flex items-center gap-1 hover:text-black" onClick={() => alert("Filter UI coming soon!")}>
            <AiOutlineFilter /> Filter
          </button>
          <button className="hover:text-black">Cell view</button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 border rounded text-sm"
            />
            <BiSearch className="absolute right-2 top-2 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b pb-2 overflow-x-auto">
        {"All Orders,Pending,Reviewed,Arrived,Sheet1,Sheet2".split(",").map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium pb-1 border-b-2 whitespace-nowrap ${
              activeTab === tab ? "text-green-600 border-green-500" : "text-gray-500 border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b text-left cursor-pointer"
                  onClick={() => index > 0 && handleSort(index)}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-gray-400 text-xs">{i + 1}</td>
                <td className="px-4 py-2 border-b">{row.job}</td>
                <td className="px-4 py-2 border-b">{row.date}</td>
                <td className="px-4 py-2 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === "In-process"
                      ? "bg-yellow-200 text-yellow-800"
                      : row.status === "Need to start"
                      ? "bg-gray-300 text-gray-900"
                      : row.status === "Complete"
                      ? "bg-green-200 text-green-800"
                      : row.status === "Blocked"
                      ? "bg-red-200 text-red-800"
                      : ""
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                      {row.submitter.avatar}
                    </span>
                    {row.submitter.name}
                  </div>
                </td>
                <td className="px-4 py-2 border-b text-blue-600 underline cursor-pointer">
                  {row.url}
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                      {row.assigned.avatar}
                    </span>
                    {row.assigned.name}
                  </div>
                </td>
                <td className={`px-4 py-2 border-b font-semibold text-sm ${
                    row.priority === "High"
                      ? "text-red-600"
                      : row.priority === "Medium"
                      ? "text-orange-500"
                      : "text-blue-500"
                  }`}>
                  {row.priority}
                </td>
                <td className="px-4 py-2 border-b">{row.due}</td>
                <td className="px-4 py-2 border-b">{row.value}</td>
              </tr>
            ))}

            {/* Extra Row for Input */}
            <tr>
              <td className="px-4 py-2 border-b text-gray-400 text-xs">{data.length + 1}</td>
              <td className="px-4 py-2 border-b" colSpan={9}>
                <input type="text" placeholder="Add new job request..." className="w-full outline-none" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
