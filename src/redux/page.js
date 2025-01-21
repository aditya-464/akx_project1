import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // page: "home",
  page: sessionStorage.getItem("page") || "login",
  // tenant: "",
  tenant: sessionStorage.getItem("tenant") || "",
  tenantOptions: [],
  // currentUser: {},
  currentUser: sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : {},
  homeComponent: sessionStorage.getItem("homeComponent") || "dashboard",
  refreshUserCount: 1,
  refreshMediaCount: 1,
  data_for_user: [
    {
      id: 1,
      name: "John Doe",
      mobile: "1234567890",
      email: "john.doe@example.com",
      image:
        "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600",
      createdAt: "2024-12-01T09:15:30Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobile: "9876543210",
      email: "jane.smith@example.com",
      image:
        "https://images.pexels.com/photos/10277582/pexels-photo-10277582.jpeg?auto=compress&cs=tinysrgb&w=600",
      createdAt: "2024-11-30T14:22:15Z",
    },
    {
      id: 3,
      name: "Alice Johnson",
      mobile: "4561237890",
      email: "alice.johnson@example.com",
      image:
        "https://images.pexels.com/photos/8837244/pexels-photo-8837244.jpeg?auto=compress&cs=tinysrgb&w=600",
      createdAt: "2024-11-29T08:45:50Z",
    },
    {
      id: 4,
      name: "Bob Brown",
      mobile: "7890123456",
      email: "bob.brown@example.com",
      image:
        "https://images.pexels.com/photos/16475273/pexels-photo-16475273/free-photo-of-urban-yellow-colonnade.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      createdAt: "2024-11-28T12:10:20Z",
    },
    {
      id: 5,
      name: "Charlie Davis",
      mobile: "3216549870",
      email: "charlie.davis@example.com",
      image:
        "https://images.pexels.com/photos/29150686/pexels-photo-29150686/free-photo-of-vintage-yellow-train-in-autumn-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      createdAt: "2024-11-27T16:30:45Z",
    },
  ],
  data_for_media: [
    {
      id: 1,
      name: "image1.jpg",
      size: "2.3 MB",
      filePreview:
        "https://images.pexels.com/photos/21600958/pexels-photo-21600958/free-photo-of-docked-boat-in-front-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      uploadedBy: "John Doe",
      uploadedAt: "2024-11-29 10:15:00",
    },
    {
      id: 2,
      name: "document1.pdf",
      size: "1.2 MB",
      filePreview:
        "https://images.pexels.com/photos/28283860/pexels-photo-28283860/free-photo-of-a-lake-in-the-mountains-with-clouds-above-it.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      uploadedBy: "Jane Smith",
      uploadedAt: "2024-11-28 14:45:00",
    },
    {
      id: 3,
      name: "image2.png",
      size: "3.1 MB",
      filePreview:
        "https://images.pexels.com/photos/29543323/pexels-photo-29543323/free-photo-of-charming-historic-hotel-in-rothenburg-architecture.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      uploadedBy: "Alice Johnson",
      uploadedAt: "2024-11-27 08:30:00",
    },
    {
      id: 4,
      name: "document2.pdf",
      size: "2.5 MB",
      filePreview:
        "https://images.pexels.com/photos/28692482/pexels-photo-28692482/free-photo-of-solitary-chapel-by-the-river-in-tlacotalpan.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      uploadedBy: "Michael Brown",
      uploadedAt: "2024-11-26 17:00:00",
    },
    {
      id: 5,
      name: "image3.jpg",
      size: "1.8 MB",
      filePreview:
        "https://images.pexels.com/photos/29233611/pexels-photo-29233611/free-photo-of-moody-autumn-forest-pathway-with-car-headlights.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      uploadedBy: "Emily Davis",
      uploadedAt: "2024-11-25 19:20:00",
    },
  ],
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    // changeUsername: (state, action) => {
    //   state.username = action.payload;
    // },
    setTenant: (state, action) => {
      state.tenant = action.payload;
    },
    setTenantOptions: (state, action) => {
      state.tenantOptions = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    refreshUser: (state, action) => {
      state.refreshUserCount += 1;
    },
    refreshMedia: (state, action) => {
      state.refreshMediaCount += 1;
    },
    insertUser: (state, action) => {
      state.data_for_user.push(action.payload);
    },
    insertMedia: (state, action) => {
      state.data_for_media.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changePage,
  setTenant,
  setTenantOptions,
  setCurrentUser,
  refreshUser,
  refreshMedia,
  insertUser,
  insertMedia,
} = pageSlice.actions;

export default pageSlice.reducer;
