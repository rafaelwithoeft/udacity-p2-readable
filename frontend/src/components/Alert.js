import React from 'react';
//import PropTypes from 'prop-types';

const Alert = (props) => (
    <div className="row">
        <div className="col-lg-12 mt-3">
            <div className={props.classAlert} role="alert">
                <h3 className="text-center font-weight-bold p-3">
                    {props.message}
                </h3>
            </div>
        </div>
    </div>
);

//Alert.propTypes = {
//    classAlert: PropTypes.string.isRequired,
//    message: PropTypes.string.isRequired
//}

export default Alert;