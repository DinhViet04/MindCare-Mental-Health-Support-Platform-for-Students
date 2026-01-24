export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // 8+ chars, uppercase, lowercase, number, special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateFullName = (fullName: string): boolean => {
  const regex = /^[a-zA-ZÀ-ỹ\s]{3,30}$/;
  return regex.test(fullName);
};

export const validateOTP = (otp: string): boolean => {
  const regex = /^\d{6}$/;
  return regex.test(otp);
};