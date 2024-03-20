import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
// submodule
import { SmcA } from "../../../store/dashboard/smallcom";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Portfolioperformance from "../common/portfolioperformance";
import Footer from "components/common/footer";
import { loadDatauser } from "store/admin/user";
// toaster

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countries from "countries-list";

//matrial ui
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Booksub({ session }) {
  const dispatch = useDispatch();

  // Pagination state
  const [users, setBooks] = useState([]);
  const [totalUsers, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState("");
  const [countrycodeid, setcountrycodeid] = useState();
  // file update
  const [fileName, setfileName] = useState();
  const [filePath, setfilePath] = useState();
  const [open, setOpen] = useState(false);
  // Get data for table
  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });

    const url = `/api/admin/book?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setBooks(data.Books);
      setTotalBooks(data.totalBooks);
    } catch (error) {
      toast.error("Error ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchData();
    const country_data = Object.entries(countries.countries);
    setcountrycodeid(country_data);
  }, [currentPage, itemsPerPage, searchQuery, shouldFetchData]);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    const visiblePages = 2; // Number of page numbers to be shown

    let startPage = currentPage - Math.floor(visiblePages / 2);
    let endPage = currentPage + Math.floor(visiblePages / 2);

    if (startPage < 1) {
      startPage = 1;
      endPage = visiblePages;
    }

    if (endPage > totalPages) {
      startPage = totalPages - (visiblePages - 1);
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    ).map((page) => (
      <li className="page-item">
        <button onClick={() => handlePageChange(page)} className="page-link">
          {page}
        </button>
      </li>
    ));
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    console.log(selectedItems);
    try {
      const deletePromises = selectedItems.map(async (itemId) => {
        return await fetch(`/api/admin/book?id=${itemId}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            setSelectedItems([]);
          }
          if (!response.ok) {
            throw new Error("Error deleting items");
          }
          return response.json();
        });
      });


      
      await Promise.all(deletePromises);
      fetchData();

      if(selectedItems.length > 0){
        toast.success("Success!", {
          position: toast.POSITION.TOP_CENTER,
        });
      
      }
    
    } catch (error) {
      console.error("Error deleting items", error);
      toast.error("Error deleting items ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBookDetails, setEditBookDetails] = useState({
    bookName: "",
    bookLink: "",
    detail: "",
    prebook: "NO",
    country: "",
    id: "",
  });

 
  const handleClickOpen = (user) => {
    setEditBookDetails({
      bookName: user.bookName,
      bookLink: user.bookLink,
      detail: user.detail,
      country: user.country,
      prebook: user.prebook,
      id: user._id,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("bookName", editBookDetails.bookName);
      formData.append("bookLink", editBookDetails.bookLink);
      formData.append("detail", editBookDetails.detail);
      formData.append("prebook", editBookDetails.prebook);
      formData.append("country", editBookDetails.country);
      formData.append("thumbnail", file);
      console.log(editBookDetails.detail);

      const response = await fetch(`/api/admin/book?id=${editBookDetails.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchData();
      setIsEditModalOpen(false);
      toast.success("Success!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error updating book", error);
      toast.error("Error updating book", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /**********************HERE IS THE CODE WHERE UPDATE PROFILE********************/
  const showModal = (user) => {
    setIsModalOpen(true);
    setShouldFetchData(user);
    setdetailsnewV(user.detail);
    setDetailid(user._id);
    setfileName(user.bookName);
    setTitleid(user.title);
    setfilePath(user.bookLink);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [file, setFile] = useState(null);
  const detail = useRef();

  const [detailsnewv, setdetailsnewV] = useState();
  const [infonewv, setinfonewV] = useState();
  const [setDetail, setDetailid] = useState();

  const title = useRef();
  const info = useRef();

  const [titlenewv, settitlenewV] = useState();
  const [settitle, setTitleid] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOption2, setSelectedOption2] = useState("YES");
  const [inputData, setInputData] = useState({
    bookName: "",
    bookLink: "",
    details: "",
    prebook: "NO",
    country: "",
  });

  //edit

  // Form submite
  const handleSubmitmain = async (e) => {
    e.preventDefault();
    
    if(!inputData.bookName || !inputData.bookLink ||  !inputData.prebook|| !file){
      
     return  toast.error("Fields are required!", {
        position: toast.POSITION.TOP_CENTER,
      });
    
    }
    const formData = new FormData();
    formData.append("bookName", inputData.bookName);
    formData.append("bookLink", inputData.bookLink);
    formData.append("detail", inputData.details);
    formData.append("prebook", inputData.prebook);
    formData.append("country", inputData.country);
    formData.append("thumbnail", file);
    console.log(inputData.details);
    try {
      
      const response = await fetch("/api/admin/book", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if(response.ok){
        toast.success("Successly added BOOk!", {
          position: toast.POSITION.TOP_CENTER,
        });
      
      }


      const responseData = await response.json();

      fetchData();
    } catch (error) {
     
      toast.error("Error ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };





  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    console.log(event.target.value);
    setSelectedOption2(event.target.value);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="app-main__outer">
        <div className="app-main__inner p-0">
          <div className="app-inner-layout">
            <div className="app-inner-layout__header bg-heavy-rain">
              <div className="app-page-title">
                <div className="page-title-wrapper">
                  <div className="page-title-heading">
                    <div className="page-title-icon">
                      <i className="pe-7s-user icon-gradient bg-mixed-hopes" />
                    </div>
                    <div>Upload Books</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
              onClick={handleOpenForm}
              style={{ marginLeft: "82vw" }}
              className="btn btn-primary"
            >
              Add New Book
            </button> */}
            <BootstrapDialog
              onClose={handleCloseForm}
              aria-labelledby="customized-dialog-title"
              open={showForm}
            >
              <div className="col-md-12 p-0" style={{}}>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={handleCloseForm}
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                <div className="main-card mb-3 card">
                  <div className="card-body">
                    <h5 className="card-title">Add New Books</h5>
                    <form onSubmit={handleSubmitmain}>
                      <div className="position-relative form-group">
                        <label htmlFor="exampleEmail" className>
                          Title
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Title"
                          ref={title}
                          
                          value={inputData.bookName}
                          
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              bookName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="position-relative form-group">
                        <label htmlFor="exampleEmail" className>
                          Book Links
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Book Links"
                          ref={detail}
                       
                          value={inputData.bookLink}
                        
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              bookLink: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="position-relative form-group">
                        <label htmlFor="exampleEmail" className>
                          Details
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Details"
                       
                          ref={info}
                          value={inputData.details}
                       
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              details: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          BOOK COUNTRY(LANGUAGE)
                        </label>
                        <input
                          className="form-control"
                          type="text"
                        
                          placeholder="Book Country"
                          ref={info}
                          value={inputData.country}
                   
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                      {
                        <div className="position-relative form-group">
                          <label htmlFor="exampleFile">THUMBNAIL IMAGE</label>
                          &nbsp;
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                      }

                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          Prebook
                        </label>
                        &nbsp;
                        <select
                          id="option"
                          value={inputData.prebook}
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              prebook: e.target.value,
                            })
                          }
                          className="form-control"
                        >
                          <option key="1" value="YES">
                            YES
                          </option>
                          <option key="2" value="NO">
                            NO
                          </option>
                        </select>
                      </div>
                      <button className="mt-1 btn btn-primary" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </BootstrapDialog>
            <div className="app-inner-layout__wrapper">
              <div className="app-inner-layout__content card">
                <div>
                  <div className="app-inner-layout__top-pane">
                    <div className="pane-left">
                      <div className="mobile-app-menu-btn">
                        <button
                          type="button"
                          className="hamburger hamburger--elastic"
                        >
                          <span className="hamburger-box">
                            <span className="hamburger-inner" />
                          </span>
                        </button>
                      </div>
                      <h4 className="mb-0">Total Books {users.length} </h4>
                    </div>
                    <div className="pane-right">
                      <div className="input-group">
                        <button
                          onClick={handleDeleteSelected}
                          className="btn btn-danger"
                        >
                          Delete Selected
                        </button>
                        <button
                          onClick={handleOpenForm}
                          style={{ marginLeft: "1rem", marginRight: "1rem" }}
                          className="btn btn-primary"
                        >
                          Add New Book
                        </button>
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-search fa-w-16" />
                          </div>
                        </div>
                        <input
                          placeholder="Search..."
                          type="text"
                          className="form-control"
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white">
                    <div className="table-responsive">
                      <table className="text-nowrap table-lg mb-0 table table-hover">
                        <thead>
                          <tr>
                            <th>Select</th>
                            <th>Image</th>
                            <th>Title</th>
                            {/* <th>Details</th> */}
                            <th>Country</th>
                            <th>PreBook</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users &&
                            users.map((user) => (
                              <tr key={user._id}>
                                <td
                                  className="text-center"
                                  style={{ width: "78px" }}
                                >
                                  <div className="custom-checkbox custom-control">
                                    <input
                                      type="checkbox"
                                      id={`eCheckbox${user._id}`}
                                      className="custom-control-input"
                                      checked={selectedItems.includes(user._id)}
                                      onChange={() =>
                                        handleCheckboxChange(user._id)
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`eCheckbox${user._id}`}
                                    >
                                      &nbsp;
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left mr-3">
                                        <img
                                          className="rounded-circle"
                                          src={user.thumbnail}
                                          alt="No Image found"
                                          width={42}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left">
                                        <div className="widget-heading">
                                          {user.bookName}
                                        </div>
                                        <div className="widget-subheading">
                                          {user.update_date
                                            ? `Last modified time ${formatDate(
                                                user.updatedAt
                                              )}`
                                            : `Create time ${formatDate(
                                                user.createdAt
                                              )}`}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                {/* <td>
                                  <div className="widget-content-left">
                                    <div className="widget-heading">
                                      {user.detail}
                                    </div>
                                  </div>
                                </td> */}
                                <td>
                                  <div className="widget-content-left mr-4">
                                    <div className="widget-heading">
                                      {user.country}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-left">
                                      <div className="widget-heading">
                                        Prebook: {user.prebook}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-left">
                                  {/* <div className="widget-content-right">
                                    <div className="widget-heading">
                                      <button
                                        onClick={() => openEditModal(user)}
                                        className="btn btn-info"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div> */}
                                  <div>
                                    <Button
                                      variant="outlined"
                                      onClick={() => handleClickOpen(user)}
                                      className="btn btn-info"
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="app-inner-layout__bottom-pane d-block text-center">
                      <nav className aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <button
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                              className="page-link"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">«</span>
                              <span className="sr-only">Previous</span>
                            </button>
                          </li>

                          {renderPageNumbers()}
                          <li key="next" className="page-item">
                            <button
                              onClick={handleNextPage}
                              disabled={
                                currentPage ===
                                Math.ceil(totalUsers / itemsPerPage)
                              }
                              className="page-link"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">»</span>
                              <span className="sr-only">Next</span>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Edit Here
          </DialogTitle>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
            style={{ position: "absolute", top: "8", right: "8" }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <DialogContent dividers>
            <Typography gutterBottom sx={{ m: 4, p: 3 }}>
              <form>
                <div className="position-relative form-group">
                  <label htmlFor="video_name" className="ml-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="bookName"
                    value={editBookDetails.bookName}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        bookName: e.target.value,
                      })
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="position-relative form-group">
                  <label htmlFor=" bookLink" className="ml-2">
                    Book Links
                  </label>
                  <input
                    type="text"
                    id="bookLink"
                    value={editBookDetails.bookLink}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        bookLink: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div>
                  <label htmlFor="details" className="ml-2">
                    Details
                  </label>
                  <input
                    type="text"
                    id="details"
                    value={editBookDetails.detail}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        detail: e.target.value,
                      })
                    }
                    className="form-control "
                  />
                </div>
                {/* <div className="position-relative form-group">
                  <label htmlFor=" country" className="ml-2">
                    Thumbnail
                  </label>
                  <input
                    type="text"
                    id="bookLink"
                    value={editBookDetails.country}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        country: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div> */}
                <div className="position-relative form-group">
                  <label htmlFor="exampleFile">THUMBNAIL IMAGE</label>
                  &nbsp;
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="position-relative form-group">
                  <label htmlFor=" country" className="ml-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="bookLink"
                    value={editBookDetails.country}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        country: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
                <div className="position-relative form-group">
                  <label htmlFor=" prebook" className="ml-2">
                    PreBook
                  </label>
                  <input
                    type="text"
                    id="prebook"
                    value={editBookDetails.prebook}
                    onChange={(e) =>
                      setEditBookDetails({
                        ...editBookDetails,
                        prebook: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>
              </form>
            </Typography>
            {/* <Typography gutterBottom>
          
          </Typography>
          <Typography gutterBottom>
           
          </Typography> */}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleEditSubmit}
              className="btn btn-info"
            >
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
        <Footer />
      </div>
    </>
  );
}

export default Booksub;
