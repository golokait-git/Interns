import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Footer from "components/common/footer";
// toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Reviewsub({ session }) {
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [reviewId, setReviewId] = useState(null);
  const [namenewv, setNamenewv] = useState("");
  const [messagenewv, setMessagenewv] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [editThumbnail, setEditThumbnail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldFetchData, setShouldFetchData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nameRef = useRef();
  const messageRef = useRef();

  const getBooks = async () => {
    const url = `/api/admin/book`;
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
      setBooksData(data.Books);

    } catch (error) {
      if (error) {
        return toast.error("Error da", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  
  // const getReviews = () => {
  //   fetch("/api/admin/review", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReviews(data["reviews"]);
  //     })
  //     .catch((error) => {
  //       console.error("Error :", error);
  //     });
  // };


  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });

    const url = `/api/admin/review?${queryParams}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.Reviews);
        setTotalReviews(data.totalReviews);
      })
      .catch((error) => {
        toast.error("Error", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery, shouldFetchData]);

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
    const totalPages = Math.ceil(totalReviews / itemsPerPage);
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
    try {
      const deletePromises = selectedItems.map(async (itemId) => {
        return await fetch(`/api/admin/review?id=${itemId}`, {
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
      });}
    } catch (error) {
      console.error("Error deleting items", error);
      toast.error("Error deleting items", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const showModal = (review) => {
    setIsModalOpen(true);
    setShouldFetchData(review);
    setReviewId(review._id);
    setNamenewv(review.name);
    setMessagenewv(review.message);
    setSelectedOption(review.bookId);
    setThumbnail(review.fileName);
  };

  const handleNameInput = (e) => {
    setNamenewv(e.target.value);
  };

  const handleMessageInput = (e) => {
    setMessagenewv(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmitmain = async (e) => {
    e.preventDefault();
    const Data = {
      name: namenewv,
      message: messagenewv,
      BookId: selectedOption,
    };
    console.log(Data);
    try {
      const response = await fetch("/api/admin/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      
      if(response.ok){
        toast.success("Successly added REVIEW!", {
          position: toast.POSITION.TOP_CENTER,
        });
      
      }

      const responseData = await response.json();

      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  
  console.log(reviews);
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
                    <div>Upload Review</div>
                  </div>
                </div>
              </div>
            </div>


            <BootstrapDialog
              onClose={handleCloseForm}
              aria-labelledby="customized-dialog-title"
              open={showForm}
            >
              <div className="col-md-12 p-0" style={{marginTop: "16px",width:"600px"}}>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={handleCloseForm}
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                <div className="col-md-12 p-0" style={{ marginTop: "16px" }}>
                  <div className="main-card mb-3 card">
                    <div className="card-body">
                      <h5 className="card-title">Add New Review</h5>
                      <form onSubmit={handleSubmitmain}>
                        <div className="position-relative form-group">
                          <label htmlFor="exampleEmail">Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            ref={nameRef}
                            value={namenewv}
                            onChange={handleNameInput}
                            required
                          />
                        </div>
                        <div className="position-relative form-group">
                          <label htmlFor="exampleEmail">Message</label>
                          <textarea
                            className="form-control"
                            type="text"
                            placeholder="Message"
                            ref={messageRef}
                            value={messagenewv}
                            onChange={handleMessageInput}
                            required
                          />
                        </div>
                        <div className="position-relative form-group">
                          <label htmlFor="exampleFile">Book Title</label>
                          &nbsp;
                          <select
                            id="option"
                            value={selectedOption}
                            onChange={handleOptionChange}
                            className="form-control"
                          >
                            <option value="">Select a book</option>
                            {booksData &&
                              booksData.map((option) => (
                                <option
                                  key={option.bookName}
                                  value={option.bookName}
                                >
                                  {option.bookName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <button className="mt-1 btn btn-primary" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
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
                      <h4 className="mb-0">Inbox {totalReviews}</h4>
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
                            <th>Name</th>
                            <th>Book </th>
                            <th>Message</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews &&
                            reviews.map((review) => (
                              <tr key={review._id}>
                                <td
                                  className="text-center"
                                  style={{ width: "78px" }}
                                >
                                  <div className="custom-checkbox custom-control">
                                    <input
                                      type="checkbox"
                                      id={`eCheckbox${review._id}`}
                                      className="custom-control-input"
                                      checked={selectedItems.includes(
                                        review._id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(review._id)
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`eCheckbox${review._id}`}
                                    >
                                      &nbsp;
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left">
                                        <div className="widget-heading">
                                          {review.name}
                                        </div>
                                        <div className="widget-subheading">
                                          {review.update_date
                                            ? `Last modified time ${formatDate(
                                              review.updatedAt
                                            )}`
                                            : `Create time ${formatDate(
                                              review.createdAt
                                            )}`}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left">
                                        <div className="widget-heading">
                                          {review.BookId}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td >
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left">
                                        <div className="widget-heading" style={{width:"200px" ,overflow:"scroll"}}>
                                          {review.message}
                                        </div>
                                      </div>
                                    </div>
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
                          <li className="page-item">
                            <button
                              onClick={handleNextPage}
                              disabled={
                                currentPage ===
                                Math.ceil(totalReviews / itemsPerPage)
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
        <Footer />
      </div>
    </>
  );
}

export default Reviewsub;
