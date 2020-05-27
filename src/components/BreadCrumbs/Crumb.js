import React, {useState, useEffect, useRef} from 'react';

import styles from './Crumb.module.scss';
import Menu from './Menu';
import MenuItem from './MenuItem';

export default function Crumb({activeEntry, entries}) {
    const [isOpen, setIsOpen] = useState(false);
    const breadcrumbRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);
        return function cleanup() {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        };
    });

    function handleKeyDown(event) {
        if (isOpen) {
            if (event.key === 'Escape') {
                event.preventDefault();
                close();
            }
        }
        if (
            event.key === 'ArrowDown' &&
            document.activeElement === buttonRef.current &&
            !isOpen
        ) {
            event.preventDefault();
            setIsOpen(true);
        }
    }

    function handleClick(event) {
        if (
            isOpen &&
            breadcrumbRef.current &&
            !breadcrumbRef.current.contains(event.target)
        ) {
            close();
        }
    }

    function close() {
        setIsOpen(false);
        buttonRef.current?.focus();
    }

    return (
        <div ref={breadcrumbRef} className={styles.crumb}>
            <button
                ref={buttonRef}
                className={styles.button}
                onClick={() => (isOpen ? close() : setIsOpen(true))}
                aria-expanded={isOpen}
                aria-controls="breadcrumb-menu"
            >
                {activeEntry.name}
            </button>
            {isOpen && (
                <Menu id="breadcrumb-menu">
                    {entries.map(entry => {
                        return (
                            <MenuItem
                                key={entry.id}
                                isActive={entry === activeEntry}
                                sectionId={entry.id}
                                name={entry.name}
                                done={close}
                                endOfSection={entry.endOfSection}
                            />
                        );
                    })}
                </Menu>
            )}
        </div>
    );
}
