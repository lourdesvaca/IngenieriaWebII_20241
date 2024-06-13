import PropTypes from 'prop-types';
const LabelBS = ({ text }) => {
    return (
        <label className="label">{text}</label>
    );
}
LabelBS.propTypes = {
    text: PropTypes.string.isRequired
}
export default LabelBS;