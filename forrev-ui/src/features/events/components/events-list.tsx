import { useEffect, useState } from "react";
import type { Event } from "../../../types/event";
import { eventsApi } from "../../../services/event-service";
import EventCard from "../../../components/EventCard";
import EventDetailModal from "../../../components/EventDetailModal";
import Eventform from "../../../components/EventForm";
import type { EventFormData } from "../../../services/event-service";
import api from "../../../http-client";
import SideBar from "../../../components/sidebar";
import EditEventForm from "../../../components/EditEventForm";

export default function EventsList() {
  // creating state to store events
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for event detail modal
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for CREATE event modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // State to track for Current User
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // State to track for EDIT event Modal
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditModalOpen, setIsEditModelOpen] = useState(false);

  // fetch events when components load
  useEffect(() => {
    fetchEvents();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/user/");
      const data = response.data;

      if (data.isAuthenticated) {
        setCurrentUser(data.user.username);
        console.log("✅ Logged in as:", data.user.username);
      } else {
        setCurrentUser(null);
        console.log("❌ Not logged in");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout/');
      setCurrentUser(null);
      console.log("✅ Logged out successfully");
    } catch (err) {
      console.error("Failed to Logout", err);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login/';
  };

  const fetchEvents = async () => {
    try {
      setLoading(true); // Show loading indicator
      setError(null); // clear any previous errors
      const data = await eventsApi.getAll(); // Call our API function
      setEvents(data); //save the events to our state
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch events"; // is this a proper error obj?, if yes, get its message, if not use general error message
      setError(errorMessage); // if error respond with error message
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false); // hide loading when done
    }
  };
  // Function to OPEN event detail modal
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  // Function to CLOSE event detail modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  // Function to OPEN create event modal
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Function to CLOSE create event modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  // Function to handle form submission
  const handleCreateEvent = async (eventData: EventFormData) => {
    try {
      const newEvent = await eventsApi.create(eventData);
      setEvents([newEvent, ...events]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Failed to create event.", err);
      alert("Failed to create event");
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try{
      await eventsApi.delete(eventId);
      setEvents(events.filter(event => event.event_id != eventId));
      console.log('✅ Event deleted successfully');
    } catch (err) {
      console.error('Failed to delete event', err);
      alert('Failed to delete event');
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditModelOpen(true);
  };

  const handleUpdateEvent = async (eventId: number, eventData: EventFormData) => {
    try{
      const updateEvent = await eventsApi.update(eventId, eventData);
      setEvents(events.map(e => e.event_id === eventId ? updateEvent : e));
      setIsEditModelOpen(false);
      console.log('✅ Event updated successfully');
    } catch (err) {
      console.error('Failed to update event:', err);
      throw err;
    }
  };



  // show loading state
  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <SideBar currentUser={currentUser} onLogout={handleLogout} onLogin={handleLoginRedirect} />
        <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
          Loading events...
        </div>
      </div>
    );
  }
  // show error state
  if (error) {
    return (
      <div style={{ display: "flex" }}>
        <SideBar currentUser={currentUser} onLogout={handleLogout} onLogin={handleLoginRedirect} />
        <div
          style={{
            flex: 1,
            padding: "40px",
            textAlign: "center",
            color: "red",
          }}
        >
          <h2>Error: {error}</h2>
          <button onClick={fetchEvents}>Retry</button>
        </div>
      </div>
    );
  }
  // show events
  // flex container {sidebar: events(amount of events)}
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      background: "#0a0a0a",
    }}>
      <SideBar currentUser={currentUser} onLogout={handleLogout} onLogin={handleLoginRedirect} />

      <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        minHeight: "100vh",
        overflowY: "auto",
      }}>
        {/* Header Section */}
        <div style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
          padding: "32px 40px",
          borderBottom: "2px solid #333",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(10px)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}>
            {/* Title */}
            <>
              <style>
                {`
                  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');
                  
                  @keyframes titleGlow {
                    0%, 100% {
                      filter: drop-shadow(0 0 10px rgba(0, 198, 255, 0.5));
                    }
                    50% {
                      filter: drop-shadow(0 0 15px rgba(0, 198, 255, 0.8));
                    }
                  }
                `}
              </style>
              <div style={{ position: 'relative' }}>
                <h1 style={{
                  fontSize: "62px",
                  margin: 0,
                  background: "linear-gradient(135deg, #ffffffff 0%, #c2edffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                  fontFamily: "'Space Grotesk', sans-serif",
                  display: "inline-block",
                  animation: "titleGlow 3s ease-in-out infinite",
                }}>
                  Events Dashboard{" "}
                  <span style={{
                    background: "linear-gradient(135deg, #c2edffff 0%, #aae6ffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "62px",
                    fontWeight: "600",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    ({events.length})
                  </span>
                </h1>
              </div>
            </>

            {/* Create Button */}
            <button
              onClick={handleOpenCreateModal}
              style={{
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: "600",
                color: "white",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 15px rgba(0,198,255,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,198,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,198,255,0.4)";
              }}
            >
              <span style={{ fontSize: "20px" }}>+</span>
              Create Event
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px",
        }}>
          {events.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#666",
            }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📅</div>
              <h3 style={{ fontSize: "24px", marginBottom: "8px", color: "#999" }}>
                No events found
              </h3>
              <p>Create your first event to get started</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}>
              {events.map((event) => (
                <EventCard
                  key={event.event_id}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          currentUser={currentUser}
          onDelete={handleDeleteEvent}
          onEdit={handleEditEvent}
        />
      )}

      {/* Create event modal */}
      {isCreateModalOpen && (
        <div
          onClick={handleCloseCreateModal}
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
          <div onClick={(e) => e.stopPropagation()}>
            <Eventform
              onClose={handleCloseCreateModal}
              onSubmit={handleCreateEvent}
            />
          </div>
        </div>
      )}

      {/* Edit event modal */}
      {isEditModalOpen && editingEvent && (
        <div
          onClick={() => setIsEditModelOpen(false)}
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
          <div onClick={(e) => e.stopPropagation()}>
            <EditEventForm
              event={editingEvent}
              onClose={() => setIsEditModelOpen(false)}
              onSubmit={handleUpdateEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
}
