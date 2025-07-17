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
};
export { ACCESSIBILITY_HINTS, ACCESSIBILITY_ROLES };
