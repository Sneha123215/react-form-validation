import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <h2>Form Submitted Successfully!</h2>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
};

export default SuccessPage;