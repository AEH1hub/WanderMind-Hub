import React, { useState, useEffect } from 'react';

const LiveClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 font-sans">
            <span>{formatDate(time)}</span>
            <span className="font-bold">{formatTime(time)}</span>
        </div>
    );
};

export default LiveClock;
