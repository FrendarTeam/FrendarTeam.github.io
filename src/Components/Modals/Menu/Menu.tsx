import React from 'react';
import ReactModal from 'react-modal';
import './menu-modal.css';

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: ' rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100vh',
        zIndex: '10',
        // position: 'fixed',
        top: '0',
        left: '0',
    },

    content: {
        width: '80%',
        height: '100%',
        zIndex: '150',
        position: 'absolute',
        top: '0',
        right: '0',
        // transform: 'translate(-50%, -50%)',
        borderRadius: '10px 0px 0px 10px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',

        justifyContent: 'center',
        overflow: 'auto',
    },
};

interface Props {
    handleIsMenuModal: () => void;
}

export default function MenuModal(props: Props) {
    return (
        <ReactModal
            isOpen={true}
            style={customModalStyles}
            onRequestClose={() => props.handleIsMenuModal()}
            onAfterOpen={() => {
                console.log('onAfterOpen');
            }}
            closeTimeoutMS={2000}
        ></ReactModal>
    );
}
