import { useState } from 'react';

import ChangePassword from './ChangePassword';
import GeneralInfo from './GeneralInfo';
import ProfileNotifications from './ProfileNotifications';
import ProfileTabs from './ProfileTabs';
import ProfileWrapper from './ProfileWrapper';
import {
  useUpdateImageMutation,
  useUpdateProfileMutation,
  useGetUserQuery,
  useUpdatePasswordMutation,
} from '../../redux/user/userApiSlice';

const Profile = ({ setAlertText, setAlertSeverity, user, setOpenAlert }) => {
  const [activeSideTab, setActiveSideTab] = useState('general info');

  const isGoogleAuth = localStorage.getItem('googleAuth');

  //api
  const [updateImage] = useUpdateImageMutation();
  const [updateProfile, updateProfileResponse] = useUpdateProfileMutation();
  const [updatePassword, updatePasswordResponse] = useUpdatePasswordMutation();
  const getUserResponse = useGetUserQuery();

  const handleApiError = (error, errorMessage) => {
    setAlertSeverity('error');
    setAlertText(error?.data?.error ?? errorMessage);
    setOpenAlert(true);
  };

  const onSubmitUpdateProfile = async (data) => {
    try {
      await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName,
        organisation: data.organisation,
      });
      setAlertText('Succesfully updated');
      setOpenAlert(true);
      setAlertSeverity('success');
    } catch (error) {
      handleApiError(error, 'Failed to update profile');
    }
  };

  const onSubmitUpdatePassword = async (data) => {
    try {
      await updatePassword({
        old_password: data.oldPassword,
        new_password: data.newPassword,
      }).unwrap();
      setAlertText('Succesfully updated');
      setOpenAlert(true);
      setAlertSeverity('success');
    } catch (error) {
      handleApiError(error, 'Failed to update password');
    }
  };

  const handleUploadImage = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = async () => {
      if (reader.result) {
        const img = reader.result.split('base64,')[1];
        try {
          await updateImage({ data: { image: img }, id: user.id }).unwrap();
          getUserResponse.refetch();
          setOpenAlert(true);
          setAlertSeverity('success');
          setAlertText('Successfully updated');
        } catch (err) {
          setOpenAlert(true);
          setAlertSeverity('error');
          setAlertText('Failed to update image');
        }
      } else {
        setAlertText('Please choose your photo!');
        setAlertSeverity('warning');
        setOpenAlert(true);
      }
    };
  };

  const handleActiveSideTab = (value) => setActiveSideTab(value);

  return (
    <ProfileWrapper>
      <div className="profile-info">
        <div className="profile-info__container">
          <ProfileTabs
            handleActiveSideTab={handleActiveSideTab}
            isGoogleAuth={isGoogleAuth}
            activeSideTab={activeSideTab}
          />
          <div className="profile-info__wrapper">
            {activeSideTab === 'general info' && (
              <GeneralInfo
                user={user}
                handleUploadImage={handleUploadImage}
                onSubmitUpdateProfile={onSubmitUpdateProfile}
                isLoading={updateProfileResponse?.isLoading}
              />
            )}
            {activeSideTab === 'password' && (
              <ChangePassword
                onSubmitUpdatePassword={onSubmitUpdatePassword}
                isLoading={updatePasswordResponse?.isLoading}
              />
            )}
            {activeSideTab === 'notifications' && <ProfileNotifications />}
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
