import { CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { CssTextField } from '../../styles/muiComponentsStyles';
import {
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validators';

const validationSchema = {
  oldPassword: { required: true },
  newPassword: { required: true, validate: validatePassword.validate },
  confirmPassword: {
    required: true,
    validate: validateConfirmPassword.validate,
  },
};

const ChangePassword = ({ onSubmitUpdatePassword, isLoading }) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });
  return (
    <div className="password-profile">
      <form
        onSubmit={handleSubmit(onSubmitUpdatePassword)}
        className="user-profile-info__form"
      >
        <Controller
          name="oldPassword"
          control={control}
          rules={validationSchema.oldPassword}
          render={({ field }) => (
            <CssTextField
              {...field}
              type="password"
              label="OLD PASSWORD"
              variant="standard"
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          rules={validationSchema.newPassword}
          render={({ field }) => (
            <CssTextField
              {...field}
              type="password"
              label="NEW PASSWORD"
              variant="standard"
              error={errors?.newPassword}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={validationSchema.confirmPassword}
          render={({ field }) => (
            <CssTextField
              {...field}
              type="password"
              label="CONFIRM NEW PASSWORD"
              variant="standard"
              error={errors?.confirmPassword}
            />
          )}
        />
        <button
          className={`btn ${
            (errors?.confirmPassword ||
              errors?.newPassword ||
              !getValues()?.oldPassword) &&
            'btn--disabled'
          }`}
        >
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{
                color: '#fff',
              }}
            />
          ) : (
            'CONFIRM'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
