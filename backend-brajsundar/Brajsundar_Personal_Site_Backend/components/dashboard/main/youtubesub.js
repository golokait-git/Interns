import { useEffect, useState, useRef } from "react";
import Footer from "components/common/footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
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

function Youtubesub() {
  const [youtube, setYoutube] = useState([]);
  const [totalYoutube, setTotalYoutube] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState("");

  const [open, setOpen] = useState(false);

  //submit form
  const [addOpen, setAddOpen] = useState(false);

  // console.log(open);
  // Get data for table

  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });

    const url = `/api/admin/youtube?${queryParams}`;

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

      setYoutube(data.youtubeVideo);
      setTotalYoutube(data.totalyoutubeVideo);
    } catch (error) {
      toast.error("Error ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchData();
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
    const totalPages = Math.ceil(totalYoutube / itemsPerPage);
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
        return fetch(`/api/admin/youtube?_id=${itemId}`, {
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





  /**********************HERE IS THE CODE WHERE UPDATE PROFILE********************/
  // const showModal = (user) => {
  //     setIsModalOpen(true);
  //     setShouldFetchData(user);
  //     setdetailsnewV(user.details);
  //     setDetailid(user.id);
  // };
  // const handleOk = () => {
  //     setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //     setIsModalOpen(false);
  // };

  const [file, setFile] = useState(null);
  const details = useRef();
  const reelpath = useRef();
  const category = useRef();

  const [detailsnewv, setdetailsnewV] = useState();
  const [reelpathnewv, setreelpathnewV] = useState();
  const [categorynewv, setCategorynewv] = useState();
  const [setDetail, setDetailid] = useState();
  const [loading, setLoading] = useState(false);

  const detailInputnew = (event) => {
    setdetailsnewV(event.target.value);
  };
  const reelpathInputnew = (event) => {
    setreelpathnewV(event.target.value);
  };
  const categoryInputnew = (event) => {
    setCategorynewv(event.target.value);
  };

  //post

  const handleClickOpenAddVideo = () => {
    setAddOpen(true);
  };
  const handleClickCloseAddVideo = () => {
    setAddOpen(false);
  };

  const [formFields, setFormFields] = useState({
    detailsnewv: "",
    reelpathnewv: "",
    categorynewv: "",
  });

  const [imgFile, setImgFile] = useState(null);
  //   const [file, setFile] = useState(null);

  // Function to handle changes in form fields
  const handleInputChange = (field, value) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [field]: value,
    }));
  };

  const handleSubmitmain = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("video_name", formFields.reelpathnewv);
    formData.append("video_url", formFields.detailsnewv);
    formData.append("category", formFields.categorynewv);
    formData.append("videoPath", file);
    formData.append("thumbnail", imgFile);

    try {
      const response = await fetch("/api/admin/youtube", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      
      if(response.ok){
        toast.success("Successly added YOUTUBE!", {
          position: toast.POSITION.TOP_CENTER,
        });
      
      }

      const responseData = await response.json();
      setFormFields({ detailsnewv: "", reelpathnewv: "", categorynewv: "" });
      setImgFile(null);
      setFile(null);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //edit

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editYoutubeDetails, seteditYoutubeDetails] = useState({
    video_name: "",
    video_url: "",
    category: "",
    _id: "",
  });

  const handleClickOpen = (user) => {
    seteditYoutubeDetails({
      video_name: user.video_name,
      video_url: user.video_url,
      category: user.category,
      _id: user._id,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const data = {
        video_name: editYoutubeDetails.video_name,
        video_url: editYoutubeDetails.video_url,
        category: editYoutubeDetails.category,
      };

      const response = await fetch(
        `/api/admin/youtube?id=${editYoutubeDetails._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchData();

      toast.success("Success!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error updating reel", error);
      toast.error("Error updating reel", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

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
                    <div className="text-3xl font-bold underline">
                      Upload Youtube Video
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BootstrapDialog
              onClose={handleCloseForm}
              aria-labelledby="customized-dialog-title"
              open={showForm}
            >
              <div className="col-md-12 p-0" style={{ width: "600px" }}>
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
                    <h5 className="card-title">Add video </h5>
                    <form onSubmit={handleSubmitmain}>
                      <div className="position-relative form-group">
                        <label htmlFor="exampleEmail" className>
                          URL
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="URL"
                          ref={details}
                          value={formFields.detailsnewv}
                          onChange={(e) =>
                            handleInputChange("detailsnewv", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Title"
                          ref={reelpath}
                          value={formFields.reelpathnewv}
                          onChange={(e) =>
                            handleInputChange("reelpathnewv", e.target.value)
                          }
                          required
                          className="form-control"
                        />
                      </div>

                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          Category
                        </label>
                        <input
                          type="text"
                          placeholder="Category"
                          ref={category}
                          value={formFields.categorynewv}
                          onChange={(e) =>
                            handleInputChange("categorynewv", e.target.value)
                          }
                          required
                          className="form-control"
                        />
                      </div>

                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          Image File
                        </label>
                        <input
                          type="file"
                          accept="Image/*"
                          onChange={(e) => setImgFile(e.target.files[0])}
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>

                      <div className="position-relative form-group">
                        <label htmlFor="exampleFile" className>
                          Video File
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setFile(e.target.files[0])}
                          className="form-control"
                          style={{ border: "none" }}
                        />
                      </div>
                      <button
                        className="mt-1 btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
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
                      <h4 className="mb-0">Total Videos {totalYoutube}</h4>
                    </div>
                    <div className="pane-right">
                      <div className="input-group">
                        <button
                          onClick={handleDeleteSelected}
                          className="btn btn-danger "
                        >
                          Delete Selected
                        </button>

                        <button
                          onClick={handleOpenForm}
                          style={{ marginLeft: "1rem", marginRight: "1rem" }}
                          className="btn btn-primary"
                        >
                          Add Video
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
                            <th>Category</th>
                            <th>Youtube Video</th>
                          </tr>
                        </thead>
                        <tbody>
                          {youtube &&
                            youtube.map((user) => (
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

                                {/* <td className="text-left">
                                                                {user.title ? (
                                                                    <>
                                                                        {" "}
                                                                        {user.title}
                                                                    </>
                                                                ) : (
                                                                    "NO path"
                                                                )}
                                                            </td> */}
                                <td className="text-left">{user.video_name}</td>
                                <td className="text-left">{user.category}</td>

                                <td className="text-left">
                                  <iframe
                                    src={user.video_url}
                                    width="40px"
                                    height="40px"
                                  />
                                </td>
                                <td className="text-left">
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
                          <li className="page-item">
                            <button
                              onClick={handleNextPage}
                              disabled={
                                currentPage ===
                                Math.ceil(totalYoutube / itemsPerPage)
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
              style={{ position: "absolute", top: 2, right: 9 }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <DialogContent dividers>
              <Typography
                gutterBottom
                sx={{ me: 4, p: 2, width: "500px", height: "300px" }}
              >
                <form>
                  <div className="position-relative form-group">
                    <label htmlFor="video_name" className="ml-2">
                      Video Name
                    </label>
                    <input
                      type="text"
                      id="video_name"
                      value={editYoutubeDetails.video_name}
                      onChange={(e) =>
                        seteditYoutubeDetails({
                          ...editYoutubeDetails,
                          video_name: e.target.value,
                        })
                      }
                      className="form-control "
                      required
                    />
                  </div>
                  <div className="position-relative form-group">
                    <label htmlFor=" Category" className="ml-2">
                      Category
                    </label>
                    <input
                      type="text"
                      id="Category"
                      value={editYoutubeDetails.category}
                      onChange={(e) =>
                        seteditYoutubeDetails({
                          ...editYoutubeDetails,
                          category: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label htmlFor="vedio_url" className="ml-2">
                      Video Url
                    </label>
                    <input
                      type="text"
                      id="vedio_url"
                      value={editYoutubeDetails.video_url}
                      onChange={(e) =>
                        seteditYoutubeDetails({
                          ...editYoutubeDetails,
                          video_url: e.target.value,
                        })
                      }
                      className="form-control "
                    />
                  </div>
                </form>
              </Typography>
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
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Youtubesub;
