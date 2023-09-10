import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import placeholderImg from '../../assets/img/noname.svg';
import { CssTextField } from '../../styles/muiComponentsStyles';

const validationSchema = {
  firstName: { required: true },
  lastName: { required: true },
  organisation: { required: true },
};

const GeneralInfo = ({
  user,
  handleUploadImage,
  onSubmitUpdateProfile,
  isLoading,
}) => {
  const { handleSubmit, control, getValues, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: user?.first_name ?? '',
      lastName: user?.last_name ?? '',
      organisation: user?.organisation ?? '',
    },
  });

  useEffect(() => {
    setValue('firstName', user?.first_name ?? '');
    setValue('lastName', user?.last_name ?? '');
    setValue('organisation', user?.organisation ?? '');
  }, [user]);

  return (
    <div className="profile-info__content">
      <div className="user-profile-info flex-align-center">
        <div className="user-profile-info__img">
          <img
            src={
              user?.image
                ? `data:image/png;base64, ${user.image}`
                : placeholderImg
            }
            alt={`${user?.username} avatar`}
          />
          <input
            className="user-profile-info__upload-image"
            accept="image/*"
            type="file"
            onChange={handleUploadImage}
          />
        </div>

        <div>
          <p>Your Profile Picture </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitUpdateProfile)}
        className="user-profile-info__form"
      >
        <Controller
          name="firstName"
          control={control}
          rules={validationSchema.firstName}
          render={({ field }) => (
            <CssTextField {...field} label="First name" variant="standard" />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={validationSchema.lastName}
          render={({ field }) => (
            <CssTextField {...field} label="Last name" variant="standard" />
          )}
        />
        <Controller
          name="organisation"
          control={control}
          rules={validationSchema.organisation}
          render={({ field }) => (
            <CssTextField {...field} label="Organisation" variant="standard" />
          )}
        />
        <button
          className={`btn ${
            (!getValues()?.firstName ||
              !getValues()?.lastName ||
              !getValues()?.organisation) &&
            'btn--disabled'
          }`}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{
                color: '#fff',
              }}
            />
          ) : (
            'Update profile'
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneralInfo;
