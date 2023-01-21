import React, { useContext, useEffect, useState } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import { Alert, Button } from '@edx/paragon';
import { Info, WarningFilled } from '@edx/paragon/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { useModel } from '../../generic/model-store';

import messages from './messages';
import useEnrollClickHandler from './clickHook';

function EnrollmentAlert({ intl, payload }) {
  const {
    canEnroll,
    courseId,
    extraText,
    isStaff,
  } = payload;

  const {
    org,
  } = useModel('courseHomeMeta', courseId);

  const { enrollClickHandler, loading } = useEnrollClickHandler(
    courseId,
    org,
    intl.formatMessage(messages.success),
  );

  const { authenticatedUser } = useContext(AppContext);
  const [userData, setUserData] = useState();

  let text = intl.formatMessage(messages.alert);
  let type = 'warning';
  let icon = WarningFilled;
  if (isStaff) {
    text = intl.formatMessage(messages.staffAlert);
    type = 'info';
    icon = Info;
  } else if (extraText) {
    text = `${text} ${extraText}`;
  }

  async function fetchUserData() {
    try {
      const { data } = await getAuthenticatedHttpClient().get(
        `${getConfig().LMS_BASE_URL}/api/user/v1/accounts/${
          authenticatedUser.username
        }`,
      );
      setUserData(data);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  const button = canEnroll && (
    <Button disabled={loading} variant="link" className="p-0 border-0 align-top mx-1" size="sm" style={{ textDecoration: 'underline' }} onClick={enrollClickHandler}>
      {intl.formatMessage(messages.enrollNowSentence)}
    </Button>
  );

  return (
    <Alert variant={type} icon={icon}>
      <div className="d-flex">
        {!userData?.is_active ? (intl.formatMessage(messages.deActive)) : (
          <>
            {text}
            {button}
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          </>
        )}
      </div>
    </Alert>
  );
}

EnrollmentAlert.propTypes = {
  intl: intlShape.isRequired,
  payload: PropTypes.shape({
    canEnroll: PropTypes.bool,
    courseId: PropTypes.string,
    extraText: PropTypes.string,
    isStaff: PropTypes.bool,
  }).isRequired,
};

export default injectIntl(EnrollmentAlert);
