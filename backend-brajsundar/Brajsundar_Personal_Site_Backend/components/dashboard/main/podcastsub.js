import { useEffect, useState } from "react";
import Footer from "components/common/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Podcastsub() {
  // Pagination state
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [podcastData, setPodcastData] = useState([])

  // Get data for table

  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });

    const url = `/api/admin/podcast?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setUsers(data.podcast);
      setTotalUsers(data.totalPodcast);
    } catch (error) {
      toast.error("Error ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  const getPodcastData = async () => {
    await fetch(`/api/admin/podcast?type=main`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPodcastData(data["podcast"])
      })
  }
  useEffect(() => {
    getPodcastData();
  }, [])

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 2);
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
    if (selectedItems.includes(itemId)) {
      // If item ID is already in the selected items array, remove it
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      // If item ID is not in the selected items array, add it
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedItems.map((itemId) => {
        return fetch(`/api/admin/podcast?podcast_id=${itemId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting items");
            }
            return response.json();
          });
      });

      await Promise.all(deletePromises);
      fetchData();
      toast.success("Success!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error deleting items", error);
      toast.error("Error deleting items", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getPodcastTitle = (id) => {
    const podcast = podcastData.find(data => data.id === id)
    return podcast?.title || "";
  }

  const handleSubmitmain = async (e) => {
    e.preventDefault();

    const requestBody = JSON.stringify({
      podcast_id: selectedOption,
      category: category
    });

    fetch("/api/admin/podcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => {
        toast.error("Error ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
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
                    <div>
                      Upload Podcast
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 p-0" style={{ marginTop: "16px" }}>
              <div className="main-card mb-3 card">
                <div className="card-body">
                  <form onSubmit={handleSubmitmain}>
                    <div className="position-relative form-group">
                      <label htmlFor="exampleFile" className>
                        Podcast Title
                      </label>
                      &nbsp;
                      <select
                        id="option"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="form-control"
                      >
                        <option value="">select Title</option>
                        {podcastData &&
                          podcastData.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.title}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="position-relative form-group">
                      <label htmlFor="exampleEmail" className>
                        Category
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={handleCategory}
                        required
                      />
                    </div>
                    <button className="mt-1 btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
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
                      <h4 className="mb-0">Inbox</h4>
                    </div>
                    <div className="pane-right">
                      <div className="input-group">
                        <button
                          onClick={handleDeleteSelected}
                          className="btn btn-danger"
                        >
                          Delete Selected
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
                        <tbody>
                          {users?.map((user, index) => (
                            <tr key={index}>
                              <td
                                className="text-center"
                                style={{ width: "78px" }}
                              >
                                <div className="custom-checkbox custom-control">
                                  <input
                                    type="checkbox"
                                    id={`eCheckbox${user.podcast_id}`}
                                    className="custom-control-input"
                                    checked={selectedItems.includes(user.podcast_id)}
                                    onChange={() =>
                                      handleCheckboxChange(user.podcast_id)
                                    }
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={`eCheckbox${user.podcast_id}`}
                                  >
                                    &nbsp;
                                  </label>
                                </div>
                              </td>
                              <td className="text-left">
                                {user.podcast_id ? (
                                  <>
                                    {" "}
                                    {getPodcastTitle(user.podcast_id)}
                                  </>
                                ) : (
                                  "NO title"
                                )}
                              </td>
                              <td className="text-left">
                                {user.category ? (
                                  <>
                                    {" "}
                                    {user.category}
                                  </>
                                ) : (
                                  "NO category"
                                )}
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
                              <span >«</span>
                              <span className="sr-only">Previous</span>
                            </button>
                          </li>

                          {renderPageNumbers()}
                          <li className="page-item">
                            <button
                              onClick={handleNextPage}
                              disabled={
                                currentPage ===
                                Math.ceil(totalUsers / itemsPerPage)
                              }
                              className="page-link"
                              aria-label="Next"
                            >
                              <span >»</span>
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
      </div >
    </>
  );
}

export default Podcastsub;
