import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number; // время отображения в мс
    onClose?: () => void;
}

const getBackgroundColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return '#d4edda';
        case 'error':
            return '#f8d7da';
        case 'warning':
            return '#fff3cd';
        case 'info':
            return '#d1ecf1';
        default:
            return '#fff';
    }
};

const getBorderColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return '#c3e6cb';
        case 'error':
            return '#f5c6cb';
        case 'warning':
            return '#ffeeba';
        case 'info':
            return '#bee5eb';
        default:
            return '#ccc';
    }
};

const getTextColor = (type: ToastType) => {
    switch (type) {
        case 'success':
            return '#155724';
        case 'error':
            return '#721c24';
        case 'warning':
            return '#856404';
        case 'info':
            return '#0c5460';
        default:
            return '#000';
    }
};

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onClose
}) => {
    const [visible, setVisible] = useState(true);
    const [fade, setFade] = useState(false);
    const transitionDuration = 300;

    useEffect(() => {
        requestAnimationFrame(() => setFade(true));

        let removeTimer: ReturnType<typeof setTimeout>;
        const fadeOutTimer = setTimeout(() => {
            setFade(false);
            removeTimer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, transitionDuration);
        }, duration);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(removeTimer);
        };
    }, [duration, onClose]);

    if (!visible) return null;

    const style: React.CSSProperties = {
        backgroundColor: getBackgroundColor(type),
        border: `1px solid ${getBorderColor(type)}`,
        color: getTextColor(type),
        padding: '16px',
        borderRadius: '4px',
        position: 'fixed',
        top: '16px',
        right: '50%',
        transform: `translateX(50%) translateY(${fade ? '0' : '-16px'})`,
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        opacity: fade ? 1 : 0,
        whiteSpace: "pre-line",
        transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`
    };

    return createPortal(
        <div style={style}>
            {message}
        </div>,
        document.body
    );
};

export default Toast;