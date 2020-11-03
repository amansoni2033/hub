import { isUndefined } from 'lodash';
import React from 'react';

import { VulnerabilitySeverity } from '../../../types';
import { SEVERITY_ORDER, SEVERITY_RATING } from '../../../utils/data';
import sumObjectValues from '../../../utils/sumObjectValues';
import styles from './Summary.module.css';

interface Props {
  summary: {
    [key in VulnerabilitySeverity]?: number;
  };
}

const SecuritySummary = (props: Props) => {
  const total = sumObjectValues(props.summary);

  const getVulnerabilitiesNumber = (): JSX.Element => {
    if (total > 0) {
      return <span className="font-weight-bold">{total}</span>;
    } else {
      return <>No</>;
    }
  };

  return (
    <div className="mb-4">
      <div className="h5 my-3">
        {getVulnerabilitiesNumber()} vulnerabilities have been detected in the{' '}
        <span className="font-weight-bold">default images</span> used by this package.
      </div>

      {total > 0 && (
        <div className="progress mb-4" style={{ height: '25px' }}>
          {SEVERITY_ORDER.map((severity: VulnerabilitySeverity) => {
            if (
              !props.summary!.hasOwnProperty(severity) ||
              isUndefined(props.summary![severity]) ||
              props.summary![severity] === 0
            )
              return null;
            return (
              <div
                key={`summary_${severity}`}
                className={`progress-bar text-dark px-1 font-weight-bold ${styles.progressBar}`}
                role="progressbar"
                style={{
                  width: `${(props.summary[severity]! * 100) / total}%`,
                  backgroundColor: SEVERITY_RATING[severity]!.color,
                }}
              >
                <span className={`badge badge-pill badge-light text-center ${styles.badgeSummary}`}>
                  {props.summary[severity]}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SecuritySummary;
