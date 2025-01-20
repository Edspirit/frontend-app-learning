import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import messages from './messages';

class MasqueradeWidgetOption extends Component {
  onClick(event) {
    // TODO: Remove this hack when we upgrade Paragon
    // Note: The current version of Paragon does _not_ close dropdown components
    // automatically (or easily programmatically) when you click on an item.
    // We can simulate this behavior by programmatically clicking the
    // toggle button on behalf of the user.
    // The newest version of Paragon already contains this behavior,
    // so we can remove this when we upgrade to that point.
    event.target.parentNode.parentNode.click();
    const {
      groupId,
      role,
      userName,
      userPartitionId,
      userNameInputToggle,
    } = this.props;

    if (userName || userName === '') {
      userNameInputToggle(true);
      return false;
    }

    const payload = {};
    if (role) {
      payload.role = role;
    }
    if (groupId) {
      payload.group_id = parseInt(groupId, 10);
      payload.user_partition_id = parseInt(userPartitionId, 10);
    }
    this.props.onSubmit(payload).then(() => {
      global.location.reload();
    });
    return true;
  }

  getDisplayName() {
    const { userName, role, groupName } = this.props;

    // Handle backend-provided names
    if (groupName === 'Staff') {
      return this.props.intl.formatMessage(messages.staff);
    }
    if (groupName === 'Specific Student...') {
      return this.props.intl.formatMessage(messages.specificStudent);
    }
    if (groupName === 'Audit') { // Simplified condition
      return this.props.intl.formatMessage(messages.audit);
    }

    // Fallback cases
    if (userName !== null) {
      return this.props.intl.formatMessage(messages.specificStudent);
    }
    if (role === 'student') {
      return this.props.intl.formatMessage(messages.learner);
    }
    if (role === 'staff') {
      return this.props.intl.formatMessage(messages.staff);
    }

    return groupName;
  }

  isSelected() {
    const isEqual = [
      'groupId',
      'role',
      'userName',
      'userPartitionId',
    ].reduce((accumulator, currentValue) => (
      accumulator && (
        this.props[currentValue] === this.props.selected[currentValue]
      )
    ), true);
    return isEqual;
  }

  render() {
    const { groupName } = this.props;
    if (!groupName) {
      return null;
    }

    const selected = this.isSelected();
    let className = '';
    if (selected) {
      className = 'active';
    }

    return (
      <Dropdown.Item
        className={className}
        href="#"
        onClick={(event) => this.onClick(event)}
      >
        {this.getDisplayName()}
      </Dropdown.Item>
    );
  }
}

MasqueradeWidgetOption.propTypes = {
  groupId: PropTypes.number,
  groupName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  role: PropTypes.string,
  selected: PropTypes.shape({
    courseKey: PropTypes.string.isRequired,
    groupId: PropTypes.number,
    role: PropTypes.string,
    userName: PropTypes.string,
    userPartitionId: PropTypes.number,
  }),
  userName: PropTypes.string,
  userNameInputToggle: PropTypes.func.isRequired,
  userPartitionId: PropTypes.number,
  intl: intlShape.isRequired,
};

MasqueradeWidgetOption.defaultProps = {
  groupId: null,
  role: null,
  selected: null,
  userName: null,
  userPartitionId: null,
};

export default injectIntl(MasqueradeWidgetOption);
