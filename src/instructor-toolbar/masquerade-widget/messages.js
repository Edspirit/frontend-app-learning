import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  genericError: {
    id: 'masquerade-widget.userName.error.generic',
    defaultMessage: 'An error has occurred; please try again.',
    description: 'Message shown after a general error when attempting to masquerade',
  },
  placeholder: {
    id: 'masquerade-widget.userName.input.placeholder',
    defaultMessage: 'Username or email',
    description: 'Placeholder text to prompt for a user to masquerade as',
  },
  userNameLabel: {
    id: 'masquerade-widget.userName.input.label',
    defaultMessage: 'Masquerade as this user',
    description: 'Label for the masquerade user input',
  },
  viewCourseAs: {
    id: 'masquerade.widget.viewCourseAs',
    defaultMessage: 'View this course as',
    description: 'Label for the masquerade dropdown that lets instructors view the course as different user types',
  },
  specificStudent: {
    id: 'masquerade.widget.specificStudent',
    defaultMessage: 'Specific Student...',
    description: 'Option to view course as a specific student',
  },
  staff: {
    id: 'masquerade.widget.staff',
    defaultMessage: 'Staff',
    description: 'Option to view course as staff',
  },
  learner: {
    id: 'masquerade.widget.learner',
    defaultMessage: 'Learner',
    description: 'Option to view course as a general learner',
  },
  audit: {
    id: 'masquerade.widget.audit',
    defaultMessage: 'Audit',
    description: 'Option to view course as an audit learner',
  },
});

export default messages;
