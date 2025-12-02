import { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import api from "../../http-client";
import { eventsApi } from "../../services/event-service";
import type { Event } from "../../types/event";
import type { EventFormData } from "../../services/event-service";
import EventCard from "../../components/EventCard";
import EventDetailModal from "../../components/EventDetailModal";
import EditEventForm from "../../components/EditEventForm";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<"created" | "attending">("created");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserEvents();
    }
  }, [currentUser]);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/user/");
      const data = response.data;

      if (data.isAuthenticated) {
        setCurrentUser(data.user.username);
      } else {
        setCurrentUser(null);
        // Redirect to login if not authenticated
        window.location.href = '/login/';
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setCurrentUser(null);
      window.location.href = '/login/';
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const allEvents = await eventsApi.getAll();
      // Filter events created by current user
      const userEvents = allEvents.filter(event => event.created_by === currentUser);
      setCreatedEvents(userEvents);
      console.log(`✅ Found ${userEvents.length} events created by ${currentUser}`);
    } catch (err) {
      console.error("Failed to fetch user events:", err);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await eventsApi.delete(eventId);
      setCreatedEvents(createdEvents.filter(event => event.event_id !== eventId));
      console.log('✅ Event deleted successfully');
    } catch (err) {
      console.error('Failed to delete event', err);
      alert('Failed to delete event');
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
    handleCloseModal(); // Close the detail modal when opening edit
  };

  const handleUpdateEvent = async (eventId: number, eventData: EventFormData) => {
    try {
      const updatedEvent = await eventsApi.update(eventId, eventData);
      setCreatedEvents(createdEvents.map(e => e.event_id === eventId ? updatedEvent : e));
      setIsEditModalOpen(false);
      console.log('✅ Event updated successfully');
    } catch (err) {
      console.error('Failed to update event:', err);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout/');
      setCurrentUser(null);
      window.location.href = '/login/';
    } catch (err) {
      console.error("Failed to Logout", err);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login/';
  };

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <SideBar currentUser={currentUser} onLogout={handleLogout} onLogin={handleLoginRedirect} />
        <div style={{ flex: 1, padding: "40px", textAlign: "center", color: "#f5f5f5" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');
          
          @keyframes titleGlow {
            0%, 100% {
              filter: drop-shadow(0 0 20px rgba(0, 198, 255, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 30px rgba(0, 198, 255, 0.8));
            }
          }
        `}
      </style>
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
              maxWidth: "1400px",
              margin: "0 auto",
            }}>
              {/* Title */}
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
                  My Profile
                </h1>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "40px",
          }}>
            {/* User Info Card */}
            <div style={{
              backgroundColor: '#1f1f1f',
              padding: '32px',
              borderRadius: '16px',
              border: '2px solid #333',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Gradient accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
                borderRadius: '16px 16px 0 0',
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '8px',
              }}>
                {/* Profile Avatar */}
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "white",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0,198,255,0.4)",
                }}>
                  {currentUser?.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div>
                  <h2 style={{
                    fontSize: "32px",
                    margin: 0,
                    color: "#f5f5f5",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}>
                    {currentUser}
                  </h2>
                  <p style={{
                    color: "#999",
                    fontSize: "14px",
                    margin: 0,
                  }}>
                    Member since November 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div style={{
              backgroundColor: '#1f1f1f',
              borderRadius: '16px',
              border: '2px solid #333',
              overflow: 'hidden',
            }}>
              {/* Tab Headers */}
              <div style={{
                display: 'flex',
                borderBottom: '2px solid #333',
                background: '#1a1a1a',
              }}>
                <button
                  onClick={() => setActiveTab("created")}
                  style={{
                    flex: 1,
                    padding: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: activeTab === "created" ? '#00c6ff' : '#999',
                    background: activeTab === "created" ? 'rgba(0,198,255,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === "created" ? '3px solid #00c6ff' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "created") {
                      e.currentTarget.style.background = 'rgba(0,198,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "created") {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>📅</span>
                  <span>Events Created ({createdEvents.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("attending")}
                  style={{
                    flex: 1,
                    padding: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: activeTab === "attending" ? '#00c6ff' : '#999',
                    background: activeTab === "attending" ? 'rgba(0,198,255,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === "attending" ? '3px solid #00c6ff' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "attending") {
                      e.currentTarget.style.background = 'rgba(0,198,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "attending") {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>🎉</span>
                  <span>Events Attending (0)</span>
                </button>
              </div>

              {/* Tab Content */}
              <div style={{
                padding: '32px',
                minHeight: '400px',
              }}>
                {activeTab === "created" ? (
                  createdEvents.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: '#666',
                    }}>
                      <div style={{ fontSize: "64px", marginBottom: "16px" }}>📅</div>
                      <h3 style={{ fontSize: "24px", marginBottom: "8px", color: "#999" }}>
                        No events created yet
                      </h3>
                      <p style={{ color: "#666" }}>Events you create will appear here</p>
                    </div>
                  ) : (
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "24px",
                    }}>
                      {createdEvents.map((event) => (
                        <EventCard
                          key={event.event_id}
                          event={event}
                          onClick={() => handleEventClick(event)}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#666',
                  }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
                    <h3 style={{ fontSize: "24px", marginBottom: "8px", color: "#999" }}>
                      Not attending any events
                    </h3>
                    <p style={{ color: "#666" }}>Events you're attending will appear here</p>
                  </div>
                )}
              </div>
            </div>
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

        {/* Edit event modal */}
        {isEditModalOpen && editingEvent && (
          <div
            onClick={() => setIsEditModalOpen(false)}
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
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateEvent}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}