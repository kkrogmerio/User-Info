const ACCESSIBILITY_ROLES = {
  BUTTON: 'button',
  TEXT: 'text',
  LIST: 'list',
  HEADER: 'header',
  ALERT: 'alert',
} as const;
const ACCESSIBILITY_HINTS = {
  AFTER_READING_USER_INFORMATION:
    'Once you’ve reviewed the user’s contact information, proceed to the next user.',
  REDIRECTED_TO_ERROR_BOUNDARY_PAGE:
    'An error occurred loading this screen. Please tap the button at the bottom of the page to try again, or contact support if the problem continues.',
};
export { ACCESSIBILITY_HINTS, ACCESSIBILITY_ROLES };
