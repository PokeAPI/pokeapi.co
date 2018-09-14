import React from 'react';

/*
   A small, fixed panel in the bottom-right corner of the viewport that displays
   the current size of the viewport in ems. Helpful when writing CSS styles.
*/

const style = {
    position: 'fixed',
    right: 0,
    bottom: 0,
    background: 'hsla(0, 0%, 0%, 0.6)',
    color: 'white',
    padding: '0.2rem 0.2rem 0.1rem 0.4rem',
    fontSize: '0.9rem',
    borderRadius: '0.25rem 0 0 0',
    opacity: 0.9,
};

export default class ViewportSizeHint extends React.Component {
    state = {w: 0, h: 0};
    componentDidMount() {
        window.addEventListener('resize', this.handleResize, false);
        this.setState({
            w: window.document.documentElement.clientWidth,
            h: window.document.documentElement.clientHeight,
        });
    }
    handleResize = () => {
        this.setState({
            w: window.document.documentElement.clientWidth,
            h: window.document.documentElement.clientHeight,
        });
    };
    render() {
        return (
            <div style={style}>
                {this.state.w / 16}
                em x {this.state.h / 16}
                em
            </div>
        );
    }
}
