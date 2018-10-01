import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TableOfContents.module.scss';

const Entry = ({url, name, active, separator, children}) => (
    <li
        className={classNames({
            [styles.entry]: true,
            [styles.active]: active,
            [styles.separator]: separator,
        })}
    >
        {url && name && <a href={url}>{name}</a>}
        {children && <TOC toc={children} active={active} />}
    </li>
);

class TOC extends React.Component {
    state = {
        active: null,
    };
    componentDidMount() {
        if (this.props.toc.length > 0) {
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
        if (this.props.active) {
            this.setState({
                active: this.findActive(this.props.toc) || this.props.toc[0],
            });
        }
    };
    findActive = entries => {
        const header = document.querySelector('.site-header');
        const topOffset = header ? header.offsetHeight : 0;

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[entries.length - i - 1]; // bottom to top
            if (entry.separator) {
                continue;
            }

            const target = document.querySelector(entry.url); // the linked section
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
        const {toc} = this.props;
        if (toc.length > 0) {
            return (
                <ul className={styles.toc} hidden={!this.props.active}>
                    {toc.map(entry => (
                        <Entry
                            key={entry.url}
                            url={entry.url}
                            name={entry.name}
                            active={
                                entry === this.state.active && this.props.active
                            }
                            separator={entry.separator}
                        >
                            {entry.children}
                        </Entry>
                    ))}
                </ul>
            );
        }
        return null;
    }
}

// Recursive PropType (see explanation at https://stackoverflow.com/a/52411570/)
const entryShape = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    separator: PropTypes.bool,
};
entryShape.children = PropTypes.arrayOf(PropTypes.shape(entryShape));

TOC.propTypes = {
    toc: PropTypes.arrayOf(PropTypes.shape(entryShape)).isRequired,
    active: PropTypes.bool,
};

TOC.defaultProps = {
    toc: [],
    active: true,
};

const TableOfContents = ({toc}) => (
    <div className={styles.container}>
        <TOC toc={toc} />
    </div>
);

export default TableOfContents;
