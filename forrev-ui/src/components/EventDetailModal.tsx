import type { Event } from "../types/event";

interface EventDetailModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  currentUser: string | null;
  onDelete: (eventId: number) => void;
  onEdit: (event: Event) => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
  currentUser,
  onDelete,
  onEdit,
}: EventDetailModalProps) {
  if (!isOpen) return null;

  // Helper function to format dates (same as your EventCard)
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleString("en-US", {
      // Format for US locale
      month: "short", // "Nov"
      day: "numeric", // "10"
      year: "numeric", // "2025"
      hour: "2-digit", // "02"
      minute: "2-digit", // "30"
    });
  };

  const isOwner = currentUser === event.created_by;

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this event? "${event.title}" ?`
      )
    ) {
      onDelete(event.event_id);
      onClose();
    }
  };

  return (
    // Overlay - dark background that covers entire screen
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      {/* Modal Content - the dark themed box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#1f1f1f",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          border: "2px solid #333",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          color: "#f5f5f5",
        }}
      >
        {/* Gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
            borderRadius: "16px 16px 0 0",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "32px",
            cursor: "pointer",
            color: "#999",
            lineHeight: 1,
            padding: "8px",
            fontWeight: "bold",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c6ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Event Title */}
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "16px",
            marginTop: "8px",
            background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            paddingRight: "40px",
          }}
        >
          {event.title}
        </h2>

        {/* Is Owner Badge */}
        {isOwner && (
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
              color: "white",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,198,255,0.3)",
            }}
          >
            Your Event
          </div>
        )}

        {/* Event Description */}
        <p
          style={{
            color: "#ccc",
            marginBottom: "24px",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        >
          {event.description}
        </p>

        {/* Event timing information */}
        <div
          style={{
            backgroundColor: "#2b2b2b",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "24px",
            border: "1px solid #333",
          }}
        >
          <div
            style={{ fontSize: "15px", color: "#ccc", marginBottom: "10px" }}
          >
            🕐 <strong style={{ color: "#00c6ff" }}>Start:</strong>{" "}
            {formatDateTime(event.start_time)}
          </div>
          <div style={{ fontSize: "15px", color: "#ccc" }}>
            🕐 <strong style={{ color: "#00c6ff" }}>End:</strong>{" "}
            {formatDateTime(event.end_time)}
          </div>
        </div>

        {/* Location and Creator */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "15px",
            color: "#999",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <span>📍 {event.location}</span>
          <span>👤 {event.created_by}</span>
        </div>

        {/* Metadata footer */}
        <div
          style={{
            paddingTop: "16px",
            borderTop: "1px solid #333",
            fontSize: "13px",
            color: "#666",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span>
            Created: {new Date(event.created_at).toLocaleDateString()}
          </span>
          <span>
            Updated: {new Date(event.updated_at).toLocaleDateString()}
          </span>
        </div>

        {/* Edit/Delete buttons - only show if owner */}
        {isOwner && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              paddingTop: "24px",
              marginTop: "24px",
              borderTop: "1px solid #333",
            }}
          >
            {/* Edit button */}
            <button
              onClick={() => {
                onEdit(event);
                onClose();
              }}
              style={{
                flex: 1,
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                color: "white",
                background: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(255,193,7,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(255,193,7,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(255,193,7,0.3)";
              }}
            >
              ✏️ Edit Event
            </button>
            {/* Delete button */}
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                color: "white",
                background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(220,53,69,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(220,53,69,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(220,53,69,0.3)";
              }}
            >
              🗑️ Delete Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
