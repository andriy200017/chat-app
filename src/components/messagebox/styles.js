const styles = theme => ({
    messageBox: {
        flexGrow: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        minHeight: '80px',
        padding: '0 30px',
        position: 'absolute',
        bottom: 0,
        width: 'calc(100% - 60px)'
    },
    textField: {
        '&:hover:before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42) !important'
        },
        width: '95%',
    },
    button: {
        color: '#0874ff',
        cursor: 'pointer',
        marginLeft: '15px'
    },
});

export default styles;