// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import axiosInstance from '../axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Profile = () => {
//   const { user, authTokens, updateUser } = useContext(AuthContext); // Assuming you have an updateUser function in context
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     username: user?.username || '',
//     email: user?.email || '',
//     phone: '',
//     address: '',
//     avatar: '',
//   });
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [passwordErrors, setPasswordErrors] = useState({});
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   // Fetch user profile on component mount
//   useEffect(() => {
//     axiosInstance
//       .get('/profile/', {
//         headers: {
//           Authorization: `Bearer ${authTokens}`,
//         },
//       })
//       .then((response) => {
//         setProfile(response.data);
//         if (response.data.avatar) {
//           setAvatarPreview(response.data.avatar);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching profile:', error);
//       });
//   }, [authTokens]);

//   // Handle input changes for edit profile form
//   const handleProfileChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'avatar') {
//       const file = files[0];
//       setProfile({ ...profile, avatar: file });
//       setAvatarPreview(URL.createObjectURL(file));
//     } else {
//       setProfile({ ...profile, [name]: value });
//     }
//   };

//   // Handle submit for edit profile
//   const handleEditProfileSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrors({});

//     const formData = new FormData();
//     formData.append('phone', profile.phone);
//     formData.append('address', profile.address);
//     if (profile.avatar) {
//       formData.append('image', profile.avatar);
//     }

//     try {
//       const response = await axiosInstance.put(`/profile/${user.id}/`, formData, {
//         headers: {
//           Authorization: `Bearer ${authTokens}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       updateUser(response.data); // Update the user context after successful update
//       setShowEditModal(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       if (error.response && error.response.data) {
//         setErrors(error.response.data);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle input changes for change password form
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData({ ...passwordData, [name]: value });
//   };

//   // Handle submit for change password
//   const handleChangePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setPasswordErrors({});

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordErrors({ confirmPassword: 'Passwords do not match.' });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await axiosInstance.post(
//         '/change-password/', // Adjust the endpoint if needed
//         {
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authTokens}`,
//           },
//         }
//       );

//       alert('Password changed successfully!');
//       setShowPasswordModal(false);
//     } catch (error) {
//       console.error('Error changing password:', error);
//       if (error.response && error.response.data) {
//         setPasswordErrors(error.response.data);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mb-4">
//         <div className="card-body text-center">
//           <img
//             src={avatarPreview || 'default-avatar.png'}
//             className="rounded-circle mb-3"
//             alt="Profile Avatar"
//             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//           />
//           <h3>{profile.username || profile.name}</h3>
//           <p>{profile.email}</p>
//           {profile.phone && <p>Phone: {profile.phone}</p>}
//           {profile.address && <p>Address: {profile.address}</p>}
//           <button
//             className="btn btn-primary me-2"
//             onClick={() => setShowEditModal(true)}
//           >
//             Edit Profile
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => setShowPasswordModal(true)}
//           >
//             Change Password
//           </button>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div
//           className="modal show fade d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//         >
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Profile</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowEditModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleEditProfileSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="phone" className="form-label">
//                       Phone
//                     </label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//                       id="phone"
//                       name="phone"
//                       value={profile.phone}
//                       onChange={handleProfileChange}
//                     />
//                     {errors.phone && (
//                       <div className="invalid-feedback">{errors.phone}</div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="address" className="form-label">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.address ? 'is-invalid' : ''}`}
//                       id="address"
//                       name="address"
//                       value={profile.address}
//                       onChange={handleProfileChange}
//                     />
//                     {errors.address && (
//                       <div className="invalid-feedback">{errors.address}</div>
//                     )}
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="avatar" className="form-label">
//                       Avatar
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       id="avatar"
//                       name="avatar"
//                       accept="image/*"
//                       onChange={handleProfileChange}
//                     />
//                     {avatarPreview && (
//                       <img
//                         src={avatarPreview}
//                         alt="Avatar Preview"
//                         className="mt-2 rounded-circle"
//                         style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                       />
//                     )}
//                     {errors.image && (
//                       <div className="invalid-feedback d-block">
//                         {errors.image}
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Saving...' : 'Save Changes'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Change Password Modal */}
//       {showPasswordModal && (
//         <div
//           className="modal show fade d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//         >
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Change Password</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowPasswordModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleChangePasswordSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="currentPassword" className="form-label">
//                       Current Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="currentPassword"
//                       name="currentPassword"
//                       value={passwordData.currentPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="newPassword" className="form-label">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="newPassword"
//                       name="newPassword"
//                       value={passwordData.newPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="confirmPassword" className="form-label">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={passwordData.confirmPassword}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                     {passwordErrors.confirmPassword && (
//                       <div className="invalid-feedback">
//                         {passwordErrors.confirmPassword}
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Changing...' : 'Change Password'}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from "../Resources/user_profile.png"

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5 mb-5" style={{ paddingBottom: "169px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h2>Profile</h2>
            </div>
            <div className="card-body text-center p-4">
              {user ? (
                <>
                  <div className="profile-image mb-4">
                    <img
                      src={img1} // Placeholder image or use user image if available
                      alt="Profile"
                      className="rounded-circle img-thumbnail"
                      width="150"
                      height="150"
                    />
                  </div>
                  <h5 className="mb-3">
                    <strong>Username:</strong> {user.username}
                  </h5>
                  <h5 className="mb-3">
                    <strong>Email:</strong> {user.email}
                  </h5>
                </>
              ) : (
                <p className="text-center">No user data available.</p>
              )}
            </div>
            <div className="card-footer text-center bg-light">
              <button className="btn btn-outline-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
