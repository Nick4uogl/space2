export const validatePassword = {
  required: true,
  validate: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    const uppercaseRegex = /^(?=.*[A-Z])/;
    if (!uppercaseRegex.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }
    const lowercaseRegex = /^(?=.*[a-z])/;
    if (!lowercaseRegex.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one digit";
    }
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    if (!specialCharRegex.test(value)) {
      return "Password must contain at least one special character";
    }
    return true;
  },
};

export const validateEmail = {
  required: true,
  validate: (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) return "Invalid email address";
    return true;
  },
};

export const validateConfirmPassword = {
  required: true,
  validate: (value, allValues) => {
    console.log(allValues);
    if (!value) return "Confirm Password is required";
    if (value === allValues?.newPassword) {
      return true;
    }
    if (value !== allValues.password) {
      return "Passwords must match";
    }
    return true;
  },
};
