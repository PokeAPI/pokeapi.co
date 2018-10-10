import React from 'react';
import PropTypes from 'prop-types';

export default class ActiveSection extends React.Component {
    static propTypes = {
        children: PropTypes.func,
        entries: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
            })
        ),
    };
    static defaultProsp = {
        children: () => {},
        entries: [],
    };
    state = {
        active: null,
    };
    componentDidMount() {
        if (this.props.entries.length > 0) {
            this.updateActive();
            window.addEventListener('scroll', this.updateActive);
            window.addEventListener('resize', this.updateActive);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateActive);
        window.removeEventListener('resize', this.updateActive);
    }
    updateActive = () => {
        this.setState({active: this.findActive(this.props.entries)});
    };
    findActive = entries => {
        const header = document.querySelector('.site-header');
        const topOffset = header ? header.offsetHeight : 0;

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[entries.length - i - 1]; // bottom to top
            if (entry.separator) {
                continue;
            }

            const target = document.getElementById(entry.id); // the linked page section
            if (target) {
                const distanceFromViewportTop = target.getBoundingClientRect()
                    .top;

                // If the element is at the very top of the viewport, or above it.
                if (distanceFromViewportTop - topOffset * 2 < 0) {
                    return entry;
                }
            }
        }
        return;
    };
    render() {
        return this.props.children(this.state.active || this.props.entries[0]);
    }
}
