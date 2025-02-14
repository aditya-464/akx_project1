import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./MediaData.css";
import Modal from "./Modal.jsx"; // Import the modal component
import ApproveMediaModal from "../ApproveMediaModal/ApproveMediaModal.jsx";
import DeleteMediaModal from "../DeleteMediaModal/DeleteMediaModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import RejectMediaModal from "../RejectMediaModal/RejectMediaModal.jsx";
import FilePreviewModal from "../FilePreviewModal/FilePreviewModal.jsx";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import PaginationDropdown from "../PaginationDropdown/PaginationDropdown";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MediaData = ({ mediaFilterApi }) => {
  const { currentUser, tenant, refreshMediaCount, mediaFilterAppliedCount } =
    useSelector((state) => state.page);

  const [actualData, setActualData] = useState(null);
  const [visibleMediaMenuId, setVisibleMediaMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approveMediaModalVisible, setApproveMediaModalVisible] =
    useState(false);
  const [rejectMediaModalVisible, setRejectMediaModalVisible] = useState(false);
  const [deleteMediaModalVisible, setdeleteMediaModalVisible] = useState(false);
  const [filePreviewModalVisible, setFilePreviewModalVisible] = useState(false);
  const [deleteMediaDetails, setDeleteMediaDetails] = useState("");
  const [approveMediaDetails, setApproveMediaDetails] = useState("");
  const [rejectMediaDetails, setRejectMediaDetails] = useState("");
  const [doc, setDoc] = useState(null);
  const [rowsPerPageLocal, setRowsPerPageLocal] = useState(5);
  const [pageNumberLocal, setPageNumberLocal] = useState(0);
  const [totalRows, setTotalRows] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [options, setOptions] = useState([
    {
      id: 1,
      name: 5,
    },
    {
      id: 2,
      name: 10,
    },
    {
      id: 3,
      name: 20,
    },
  ]);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const dispatch = useDispatch();

  // Toggle the visibility of the media menu
  const toggleMediaMenu = (id, e) => {
    e.stopPropagation(); // Stop event propagation to prevent menu from closing when clicking the options
    setVisibleMediaMenuId(visibleMediaMenuId === id ? null : id); // If menu is open, close it; otherwise, open it.
  };

  // Close the media menu when clicked outside
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".popup-menu-media") &&
      !e.target.closest(".media-item")
    ) {
      setVisibleMediaMenuId(null); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle the "View" action for media
  const handleView = (media) => {
    setSelectedMedia(media); // Set the selected media to be viewed
    setModalVisible(true); // Show the modal
    setVisibleMediaMenuId(null); // Close the menu after viewing
  };

  // Handle the "Delete" action for media
  const handleDelete = (item) => {
    // console.log("Deleting media item:", mediaId);
    // Add logic for deleting media item
    setDeleteMediaDetails(item);
    setdeleteMediaModalVisible(true);
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  const handleApprove = (item) => {
    // console.log("Approving media item:", mediaId);
    // Add logic for deleting media item
    setApproveMediaDetails(item);
    setApproveMediaModalVisible(true);
    setVisibleMediaMenuId(null); // Close the menu after deleting
  };

  const handleReject = (item) => {
    // console.log("Rejecting media item:", mediaId);
    // Add logic for deleting media item
    // setApproveMediaModalVisible(true);
    setRejectMediaDetails(item);
    setRejectMediaModalVisible(true);
    setVisibleMediaMenuId(null);
  };

  const getMediaLink = (val) => {
    const link = "http://84.247.171.46" + val;
    return link;
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "bottom-center",
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
    });
  };

  const handleFilePreview = (item) => {
    const link = getMediaLink(item.filePath);
    setDoc(link);
    if (navigator.onLine) {
      setFilePreviewModalVisible(true);
    } else {
      showErrorToast("You are offline!");
    }
  };

  const getClearData = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].uploadedBy.id == currentUser.id) {
        newArr.push(arr[i]);
      }
    }
    setActualData(newArr);
  };

  // const getActualData = async () => {
  //   try {
  //     const headers = {
  //       "X-TenantID": tenant,
  //     };

  //     if (mediaFilterApi == null) {
  //       const response = await axios.get("/media/all", { headers });
  //       if (response.status === 200) {
  //         if (currentUser.userType === "USER") {
  //           getClearData(response.data.data);
  //         } else {
  //           setActualData(response.data.data);
  //         }
  //       }
  //     } else {
  //       const response = await axios.get(mediaFilterApi, { headers });
  //       if (response.status === 200) {
  //         if (currentUser.userType === "USER") {
  //           getClearData(response.data.data);
  //         } else {
  //           setActualData(response.data.data);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     showErrorToast(error.response.data.message);
  //   }
  // };

  const getTotalRowsAndPagesCount = async () => {
    try {
      const headers = {
        "X-TenantID": tenant,
      };

      if (mediaFilterApi === null) {
        const response = await axios.get("/media/all?size=1&page=0", {
          headers,
        });
        if (response.status === 200) {
          setTotalRows(response.data.additionalData.totalElements);
          setTotalPages(
            Math.ceil(
              response.data.additionalData.totalElements / rowsPerPageLocal
            )
          );
        }
      } else {
        const response = await axios.get(mediaFilterApi + "&size=1&page=0", {
          headers,
        });
        if (response.status === 200) {
          setTotalRows(response.data.additionalData.totalElements);
          setTotalPages(
            Math.ceil(
              response.data.additionalData.totalElements / rowsPerPageLocal
            )
          );
        }
      }
    } catch (error) {
      // console.log(error.message);
      showErrorToast(error.response.data.message);
    }
  };

  const getActualData = async () => {
    try {
      const headers = {
        "X-TenantID": tenant,
      };

      if (mediaFilterApi === null) {
        if (currentUser.userType === "USER") {
          const response = await axios.get(
            `/media/all?uploadedById=${currentUser.id}&sortBy=uploadDate&order=desc&size=${rowsPerPageLocal}&page=${pageNumberLocal}`,
            {
              headers,
            }
          );
          if (response.status === 200) {
            setActualData(response.data.data);
          }
        } else {
          const response = await axios.get(
            `/media/all?sortBy=uploadDate&order=desc&size=${rowsPerPageLocal}&page=${pageNumberLocal}`,
            { headers }
          );
          if (response.status === 200) {
            setActualData(response.data.data);
          }
        }
      } else {
        const remainingApiEndpoint = `&size=${rowsPerPageLocal}&page=${pageNumberLocal}`;
        const response = await axios.get(
          mediaFilterApi + remainingApiEndpoint,
          { headers }
        );
        if (response.status === 200) {
          setActualData(response.data.data);
        }
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getActualData();
  }, [refreshMediaCount, tenant, rowsPerPageLocal, pageNumberLocal]);

  useEffect(() => {
    getTotalRowsAndPagesCount();
  }, [refreshMediaCount]);

  useEffect(() => {
    setRowsPerPageLocal(5);
    setPageNumberLocal(0);
  }, [mediaFilterAppliedCount, tenant]);

  useEffect(() => {
    if (rowsPerPageLocal === 5 && pageNumberLocal === 0) {
      getTotalRowsAndPagesCount();
      getActualData();
    }
  }, [rowsPerPageLocal, pageNumberLocal, mediaFilterAppliedCount, tenant]);

  const handleSortingOfData = (val) => {
    let tempData = [...actualData];

    if (val === "name" || val === "fileName") {
      tempData.sort((a, b) => {
        if (a[val] && b[val]) {
          return a[val].localeCompare(b[val]);
        }
        return 0;
      });
    } else if (val === "approvedStatus") {
      tempData.sort((a, b) => {
        return a[val] === b[val] ? 0 : a[val] ? -1 : 1;
      });
    } else if (val === "uploadedBy") {
      tempData.sort((a, b) => {
        if (a[val]["name"] && b[val]["name"]) {
          return a[val]["name"].localeCompare(b[val]["name"]);
        }
        return 0;
      });
    } else if (val === "id") {
      tempData.sort((a, b) => a[val] - b[val]);
    } else if (val === "uploadDate") {
      tempData.sort((a, b) => new Date(a[val]) - new Date(b[val]));
    }

    setActualData(tempData);
  };

  const isPermitted = (item) => {
    if (
      currentUser.userType === "ORGANIZATIONAL_ADMIN" ||
      currentUser.userType === "SUPER_ADMIN"
    ) {
      return true;
    } else {
      if (item.uploadedBy.id === currentUser.id) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getReadableDate = (val) => {
    const date = new Date(val);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  if (!actualData) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <ColorRing
          visible={!actualData ? true : false}
          height="70"
          width="70"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={[
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
            "#03c988",
          ]}
        />
      </div>
    );
  }

  return (
    Array.isArray(actualData) &&
    actualData && (
      <>
        <div id="media-data-container">
          {
            <>
              <div id="media-data-headings-div">
                <div id="media-heading-checkbox"></div>
                <p
                  className="media-heading-id"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortingOfData("id")}
                >
                  Id
                </p>
                <p className="media-heading-image">Preview</p>
                <p
                  className="media-heading-name"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortingOfData("fileName")}
                >
                  Name
                </p>
                {/* <p className="media-heading-size">Size</p> */}
                <p
                  className="media-heading-size"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortingOfData("approvedStatus")}
                >
                  Status
                </p>
                <p
                  className="media-heading-uploaded-by"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortingOfData("id")}
                >
                  Uploaded By
                </p>
                <p
                  className="media-heading-uploaded-at"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortingOfData("uploadDate")}
                >
                  Uploaded At
                </p>
                <div
                  className="media-data-option-div"
                  style={{ visibility: "hidden" }}
                >
                  <SlOptionsVertical size={12} />
                </div>
              </div>

              <div id="media-data-partition-horizontal"></div>
              {actualData.length == 0 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "2rem 0rem",
                  }}
                >
                  <p>No data</p>
                </div>
              )}
              {actualData.length > 0 && (
                <div id="media-data-content-div">
                  {actualData.map((item) => (
                    <div key={item.id} className="media-data-item-div">
                      <p className="media-heading-id media-data-item">
                        {item.id}
                      </p>
                      <div
                        className="media-heading-image media-data-item"
                        onClick={() => {
                          handleFilePreview(item);
                        }}
                      >
                        <img
                          className="media-data-image"
                          // src={item.filePath || "https://via.placeholder.com/40"}
                          // alt={item.fileName}
                          src={
                            item.mediaType === "IMAGE"
                              ? getMediaLink(item.filePath)
                              : "https://i.pinimg.com/564x/3c/00/86/3c00869f0e6f1cebb3125bf13512edc8.jpg"
                          }
                        />
                      </div>
                      <p className="media-heading-name media-data-item">
                        {item.fileName}
                      </p>
                      <p className="media-heading-size media-data-item">
                        {/* {(item.byteSize / (1024 * 1024)).toFixed(1)} MB */}
                        {item.approvedStatus === true
                          ? "Approved"
                          : "Not Approved"}
                      </p>
                      <p className="media-heading-uploaded-by media-data-item">
                        {item.uploadedBy.name}
                      </p>
                      <p className="media-heading-uploaded-at media-data-item">
                        {getReadableDate(item.uploadDate)}
                      </p>
                      <div
                        className="media-data-option-div"
                        onClick={(e) => toggleMediaMenu(item.id, e)} // Pass event to stop propagation
                      >
                        <SlOptionsVertical size={12} />
                      </div>

                      {/* Popup Menu */}
                      {visibleMediaMenuId === item.id && isPermitted(item) && (
                        <div className="popup-menu-media">
                          {/* <p
                        className="popup-menu-item-media"
                        onClick={() => handleView(item)} // Pass entire media object
                      >
                        View
                      </p> */}
                          {(currentUser.userType === "SUPER_ADMIN" ||
                            currentUser.userType ===
                              "ORGANIZATIONAL_ADMIN") && (
                            <>
                              <p
                                className="popup-menu-item-media"
                                onClick={() => handleApprove(item)}
                              >
                                Approve
                              </p>
                              <p
                                className="popup-menu-item-media"
                                onClick={() => handleReject(item)}
                              >
                                Reject
                              </p>
                            </>
                          )}

                          <p
                            className="popup-menu-item-media"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          }

          {/* Modal to display the selected media */}
          {/* <Modal
          show={modalVisible}
          close={() => setModalVisible(false)}
          media={selectedMedia}
        /> */}

          <DeleteMediaModal
            show={deleteMediaModalVisible}
            close={() => setdeleteMediaModalVisible(false)}
            mediaDetails={deleteMediaDetails}
          ></DeleteMediaModal>

          <ApproveMediaModal
            show={approveMediaModalVisible}
            close={() => setApproveMediaModalVisible(false)}
            mediaDetails={approveMediaDetails}
          ></ApproveMediaModal>

          <RejectMediaModal
            show={rejectMediaModalVisible}
            close={() => setRejectMediaModalVisible(false)}
            mediaDetails={rejectMediaDetails}
          ></RejectMediaModal>

          <FilePreviewModal
            show={filePreviewModalVisible}
            close={() => setFilePreviewModalVisible(false)}
            file={doc}
          ></FilePreviewModal>
        </div>

        {totalRows !== null && totalPages !== null && (
          <div className="media-pagination-container">
            <div className="media-pagination-pages-container">
              <p>Rows per page</p>
              <div
                style={{
                  width: "7rem",
                }}
              >
                <PaginationDropdown
                  options={options}
                  returnValue={(val) => {
                    // dispatch(setRowsPerPage(val));
                    setRowsPerPageLocal(val);
                    setPageNumberLocal(0);
                    setTotalPages(Math.ceil(totalRows / val));
                  }}
                  defaultValue={5}
                  resetTrigger={`${tenant}-${mediaFilterAppliedCount}`}
                ></PaginationDropdown>
              </div>
            </div>
            <div className="media-pagination-buttons-container">
              <div
                className="media-pagination-previous-button"
                style={{
                  opacity:
                    pageNumberLocal === 0 || actualData.length === 0
                      ? "0.2"
                      : "1",
                  cursor:
                    pageNumberLocal === 0 || actualData.length === 0
                      ? "default"
                      : "pointer",
                  pointerEvents:
                    pageNumberLocal === 0 || actualData.length === 0
                      ? "none"
                      : "auto", // Prevent hover interactions
                }}
                onClick={() => {
                  if (pageNumberLocal >= 1) {
                    setPageNumberLocal((prev) => Math.max(prev - 1, 0));
                  }
                }}
              >
                <IoIosArrowBack size={16} color="#36454f"></IoIosArrowBack>
              </div>
              <div>
                <input
                  className="media-pagination-page-number-field"
                  type="text"
                  value={pageNumberLocal + 1}
                  disabled={true}
                />
              </div>
              <div
                className="media-pagination-next-button"
                style={{
                  opacity:
                    pageNumberLocal === totalPages - 1 ||
                    actualData.length === 0
                      ? "0.2"
                      : "1",
                  cursor:
                    pageNumberLocal === totalPages - 1 ||
                    actualData.length === 0
                      ? "default"
                      : "pointer",
                  pointerEvents:
                    pageNumberLocal === totalPages - 1 ||
                    actualData.length === 0
                      ? "none"
                      : "auto", // Prevent hover interactions
                }}
                onClick={() => {
                  if (pageNumberLocal < totalPages - 1) {
                    setPageNumberLocal((prev) =>
                      prev < totalPages - 1 ? prev + 1 : prev
                    );
                  }
                }}
              >
                <IoIosArrowForward
                  size={16}
                  color="#36454f"
                ></IoIosArrowForward>
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default MediaData;
