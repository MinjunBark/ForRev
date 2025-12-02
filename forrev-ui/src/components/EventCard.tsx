import type { Event } from '../types/event';
import { useState } from 'react';

// Define what props (inputs) this component accepts
interface EventCardProps{
    event: Event;
    onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps ){

    // Hover Effect 
    const [isHovered, setIsHovered] = useState(false);

    // Reformatting time string into cleaner date format (Month/Day/Year, hour/minute)
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US',{
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
        });
    };
    
    
    
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
            backgroundColor: '#1f1f1f',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: isHovered
                ? '0 8px 24px rgba(0,198,255,0.3)'
                : '0 4px 12px rgba(0,0,0,0.4)',
            border: isHovered ? '2px solid #00c6ff' : '2px solid #333',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            width: '280px',
            height: '280px',
            flex: '0 0 280px',
            position: 'relative',
            overflow: 'hidden',
            }}
        >
            {/* Gradient accent bar */}
            <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
            }}
            />

            <h2
            style={{
                fontSize: '22px',
                marginBottom: '12px',
                color: '#f5f5f5',
                fontWeight: '600',
                marginTop: '8px',
            }}
            >
            {event.title}
            </h2>

            <p
            style={{
                color: '#ccc',
                marginBottom: '16px',
                lineHeight: '1.5',
                fontSize: '14px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }}
            >
            {event.description}
            </p>

            {/* Event timing information */}
            <div
            style={{
                backgroundColor: '#2b2b2b',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #333',
            }}
            >
            <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>
                🕐 <strong style={{ color: '#00c6ff' }}>Start:</strong>{' '}
                {formatDateTime(event.start_time)}
            </div>
            <div style={{ fontSize: '13px', color: '#aaa' }}>
                🕐 <strong style={{ color: '#00c6ff' }}>End:</strong>{' '}
                {formatDateTime(event.end_time)}
            </div>
            </div>

            {/* Location and creator info */}
            <div
            style={{
                display: 'flex',
                gap: '16px',
                fontSize: '13px',
                color: '#999',
                flexWrap: 'wrap',
            }}
            >
            <span>📍 {event.location}</span>
            <span>👤 {event.created_by}</span>
            </div>
        </div>
    );
}