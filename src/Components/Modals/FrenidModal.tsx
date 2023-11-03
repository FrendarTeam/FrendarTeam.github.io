import React from 'react';
import ReactModal from 'react-modal';

interface Props {
    handleIsFreindModal: (isFreindModal: boolean) => void;
}

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: ' rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100vh',
        zIndex: '10',
        position: 'fixed',
        top: '0',
        left: '0',
    },
    content: {
        width: '80%',
        height: '100%',
        zIndex: '150',
        position: 'absolute',

        top: '50%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0px 10px 10px 0px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        justifyContent: 'center',
        overflow: 'auto',
    },
};

export default function FrenidModal(props: Props) {
    return (
        <div>
            <ReactModal
                isOpen={true}
                style={customModalStyles}
                onRequestClose={() => props.handleIsFreindModal(false)}
            ></ReactModal>
        </div>
    );
}
