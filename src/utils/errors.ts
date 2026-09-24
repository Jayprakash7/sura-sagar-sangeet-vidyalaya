/**
 * Maps Firebase error codes to user-friendly messages.
 * Ensures raw Firebase errors are never shown to end users.
 */
export const getFirebaseErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return 'Something went wrong. Please try again.';
  }

  const message = error.message.toLowerCase();

  // Authentication errors
  if (
    message.includes('invalid-login-credentials') ||
    message.includes('invalid-credential') ||
    message.includes('user-not-found') ||
    message.includes('wrong-password')
  ) {
    return 'Invalid email or password.';
  }
  if (message.includes('too-many-requests')) {
    return 'Too many attempts. Please try again later.';
  }
  if (message.includes('email-already-in-use')) {
    return 'This email is already registered.';
  }
  if (message.includes('weak-password')) {
    return 'Password should be at least 6 characters.';
  }
  if (message.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('user-disabled')) {
    return 'This account has been disabled.';
  }
  if (message.includes('configuration-not-found')) {
    return 'Authentication is not configured. Please contact the administrator.';
  }
  if (message.includes('network-request-failed')) {
    return 'Network error. Please check your connection.';
  }

  // Firestore / permission errors
  if (message.includes('permission-denied') || message.includes('insufficient permissions')) {
    return 'You do not have permission to perform this action.';
  }
  if (message.includes('not-found')) {
    return 'The requested item was not found.';
  }
  if (message.includes('unavailable')) {
    return 'Service temporarily unavailable. Please try again.';
  }

  // Session
  if (message.includes('token') && message.includes('expired')) {
    return 'Your session has expired. Please log in again.';
  }

  return 'Something went wrong. Please try again.';
};
