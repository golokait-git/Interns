import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import Footer from "components/common/footer";

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

function Quotessub({ session }) {
  const [reels, setReels] = useState([]);
  const [totalReels, setTotalReels] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });

    const url = `/api/admin/reel?${queryParams}`;

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
      setReels(data.reels);
      console.log(data);
      setTotalReels(data.totalReels);
    } catch (error) {
      toast.error("Error ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

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
    const totalPages = Math.ceil(totalReels / itemsPerPage);
    const visiblePages = 2;

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
        return await fetch(`/api/admin/reel?id=${itemId}`, {
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

      const response = await Promise.all(deletePromises);
      fetchData();

      if (selectedItems.length > 0) {
        toast.success("Success!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error deleting items", error);
      toast.error("Error deleting items", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //edit

  const [editReelDetails, seteditReelDetails] = useState({
    reelName: "",
    url: "",
    _id: "",
  });

  const handleClickOpen = (user) => {
    seteditReelDetails({
      reelName: user.reelName,
      url: user.url,
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
        reelName: editReelDetails.reelName,
        url: editReelDetails.url,
       
      };

      const response = await fetch(
        `/api/admin/reel?id=${editReelDetails._id}`,
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

  

  const [file, setFile] = useState(null);
  
  const reelpath = useRef();
  const reelNameR = useRef();
 
  const [reelpathnewv, setreelpathnewV] = useState();
  const [reelName, setReelName] = useState();
 
  const reelpathInputnew = (event) => {
    setreelpathnewV(event.target.value);
  };
  const reelNameInputnew = (event) => {
    setReelName(event.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const detail = details.current.value;
  //   const detailid = setDetail;
  //   const formData = new FormData();
  //   if (file) {
  //     formData.append("file", file);
  //   }
  //   formData.append("detail", detail);
  //   formData.append("_id", detailid);
  //   formData.append("type", "addnewdata");

  //   try {
  //     // handle success
  //     await fetch("/api/admin/profileupdate", {
  //       method: "PUT",
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then(async (data) => {
  //         const res = data;

  //         if (res.message == "Error Uploading Image") {
  //           toast.error("Error Uploading Image", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         } else if (res.message == "Successfully uploading file") {
  //           fetchData();
  //           setIsModalOpen(false);
  //           toast.success("Successfully uploading file", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         } else {
  //           toast.error("Something went to wrong", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         }
  //       });
  //   } catch (error) {
  //     // handle error
  //   }
  // };

  // Form submite
  const handleSubmitmain = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("reelName", reelName);
    formData.append("reelpath", file);
    formData.append("url", reelpathnewv);
    console.log(file);
    try {
      const response = await fetch("/api/admin/reel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }


      
      if(response.ok){
        toast.success("Successly added REEL!", {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
                    <div>Upload Reels</div>
                  </div>
                </div>
              </div>
            </div>
           
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

                <div className="main-card card">
                <div className="card-body  my-3 mx-3">
                  <h5 className="card-title">Add new Reels</h5>
                  <form onSubmit={handleSubmitmain}>
                    <div className="position-relative form-group">
                      <label htmlFor="exampleFile" className>
                        Reel Name
                      </label>
                      <input
                        type="text"
                        placeholder="Reel Name"
                        ref={reelNameR}
                        value={reelName}
                        onChange={reelNameInputnew}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="position-relative form-group">
                      <label htmlFor="exampleFile" className>
                        Link
                      </label>
                      <input
                        type="text"
                        placeholder="Reel Url"
                        ref={reelpath}
                        value={reelpathnewv}
                        onChange={reelpathInputnew}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="position-relative form-group">
                      <label htmlFor="exampleFile" className>
                        THUMBNAIL IMAGE
                      </label>
                      &nbsp;
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      
                      />
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
                      <h4 className="mb-0">
                        Total Reels {totalReels && totalReels}
                      </h4>
                    </div>
                    <div className="pane-right">
                      <div className="input-group">
                        <button
                          onClick={handleDeleteSelected}
                          className="btn btn-danger m-1"
                        >
                          Delete Selected
                        </button>

                        <button
                          onClick={handleOpenForm}
                          style={{ marginLeft: "1rem", marginRight: "1rem" }}
                          className="btn btn-primary"
                        >
                          Add New Reel
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
                            <th>Name</th>
                            <th>URL</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reels.map((user) => (
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
                                        src={user.reelpath}
                                        alt="no image"
                                        width={52}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="widget-content-left">
                                  <div className="widget-heading">
                                    {user.reelName}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="widget-content-left">
                                  <div className="widget-heading">
                                    {user.url}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="widget-content-right">
                                  <div className="widget-heading">
                                    <Button
                                      variant="outlined"
                                      onClick={() => handleClickOpen(user)}
                                      className="btn btn-info"
                                    >
                                      Edit
                                    </Button>
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
                              <span>«</span>
                              <span className="sr-only">Previous</span>
                            </button>
                          </li>

                          {renderPageNumbers()}
                          <li className="page-item">
                            <button
                              onClick={handleNextPage}
                              disabled={
                                currentPage ===
                                Math.ceil(totalReels / itemsPerPage)
                              }
                              className="page-link"
                              aria-label="Next"
                            >
                              <span>»</span>
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
          <DialogTitle sx={{ m: 0, p: 2  }} id="customized-dialog-title">
            Edit Here
          </DialogTitle>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
            style={{ position: "absolute", top: 2, right: 9  }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <DialogContent dividers>
            <Typography gutterBottom sx={{ m: 3, p: 2 ,width: "400px", height: "200px" }}>
              <form>
                <div className="position-relative form-group">
                  <label htmlFor="reelname" className="ml-2">
                    Reel Name
                  </label>
                  <input
                    type="text"
                    id="reelname"
                    value={editReelDetails.reelName}
                    onChange={(e) =>
                      seteditReelDetails({
                        ...editReelDetails,
                        reelName: e.target.value,
                      })
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="position-relative form-group">
                  <label htmlFor="link" className="ml-2">
                    Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={editReelDetails.url}
                    onChange={(e) =>
                      seteditReelDetails({
                        ...editReelDetails,
                        url: e.target.value,
                      })
                    }
                    className="form-control"
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

        <Footer />
      </div>
    </>
  );
}

export default Quotessub;
