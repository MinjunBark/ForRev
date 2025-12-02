import React, { useState } from "react";
import type { EventFormData } from "../services/event-service";

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: EventFormData) => Promise<void>;
}

export default function Eventform({ onClose, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !location || !startTime || !endTime) {
      setError("All fields are required!");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setError("End Time must be after Start Time");
      return;
    }

    setIsSubmitting(true);

    const eventData: EventFormData = {
      title,
      description,
      location,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      await onSubmit(eventData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create event");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div
    style={{
      backgroundColor: '#1f1f1f',
      padding: '32px',
      borderRadius: '16px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      border: '2px solid #333',
      color: '#f5f5f5',
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
        borderRadius: '16px 16px 0 0',
      }}
    />

    {/* Close button */}
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'none',
        border: 'none',
        fontSize: '32px',
        cursor: 'pointer',
        color: '#999',
        lineHeight: 1,
        padding: '8px',
        fontWeight: 'bold',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#00c6ff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
    >
      ×
    </button>

    {/* Title */}
    <h2
      style={{
        fontSize: '28px',
        marginTop: '8px',
        marginBottom: '24px',
        paddingRight: '40px',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700',
      }}
    >
      Create New Event
    </h2>

    {/* Error message */}
    {error && (
      <div
        style={{
          padding: '14px',
          marginBottom: '24px',
          backgroundColor: '#330000',
          color: '#ff6b6b',
          borderRadius: '10px',
          border: '1px solid #660000',
          fontSize: '14px',
        }}
      >
        {error}
      </div>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit}>
      {/* Title input */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ccc',
          }}
        >
          Event Title *
        </label>
        <input
          type="text"
          placeholder="e.g., Summer BBQ Party"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            border: '2px solid #444',
            borderRadius: '8px',
            boxSizing: 'border-box',
            backgroundColor: '#2b2b2b',
            color: '#f5f5f5',
            outline: 'none',
            transition: 'all 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#00c6ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#444';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ccc',
          }}
        >
          Description *
        </label>
        <textarea
          placeholder="Describe your event..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isSubmitting}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            border: '2px solid #444',
            borderRadius: '8px',
            boxSizing: 'border-box',
            backgroundColor: '#2b2b2b',
            color: '#f5f5f5',
            outline: 'none',
            fontFamily: 'inherit',
            resize: 'vertical',
            transition: 'all 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#00c6ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#444';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Location */}
      <div style={{ marginBottom: '20px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ccc',
          }}
        >
          Location *
        </label>
        <input
          type="text"
          placeholder="e.g., Central Park"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '15px',
            border: '2px solid #444',
            borderRadius: '8px',
            boxSizing: 'border-box',
            backgroundColor: '#2b2b2b',
            color: '#f5f5f5',
            outline: 'none',
            transition: 'all 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#00c6ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#444';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Date/Time grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Start time */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ccc',
            }}
          >
            Start Time *
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '15px',
              border: '2px solid #444',
              borderRadius: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#2b2b2b',
              color: '#f5f5f5',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00c6ff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#444';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* End time */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ccc',
            }}
          >
            End Time *
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '15px',
              border: '2px solid #444',
              borderRadius: '8px',
              boxSizing: 'border-box',
              backgroundColor: '#2b2b2b',
              color: '#f5f5f5',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00c6ff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#444';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '28px',
        }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: isSubmitting
              ? '#555'
              : 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(0,198,255,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,198,255,0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,198,255,0.4)';
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Event'}
        </button>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#999',
            backgroundColor: 'transparent',
            border: '2px solid #444',
            borderRadius: '10px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.borderColor = '#666';
              e.currentTarget.style.color = '#ccc';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.color = '#999';
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);
}
