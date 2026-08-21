import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * Team Dashboard — Admin (React version)
 *
 * Note: browser localStorage isn't available in this environment, so the
 * API base URL is kept in React state instead (it resets on reload — use
 * the sidebar/banner to set it each session, or wire up your own persistence
 * layer when you drop this into a real app).
 *
 * Now includes a "Contact Messages" section (Inbox) that lists submissions
 * from the public ContactForm, backed by:
 *   GET    /api/ma-architect/contact/all
 *   DELETE /api/ma-architect/contact/:id
 * (matches the ContactForm.jsx POST to /api/ma-architect/contact)
 * Adjust these two calls if your contactRoutes.js uses different paths.
 */

const DEFAULT_API_URL = "http://localhost:5000/api";

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function formatDate(value) {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }) +
      " · " +
      d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

const emptyForm = {
  name: "",
  code: "",
  role: "",
  description: "",
  order: "",
  isActive: true,
};

export default function TeamDashboard() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [apiUrlInput, setApiUrlInput] = useState(DEFAULT_API_URL);
  const [apiStatus, setApiStatus] = useState("checking"); // checking | ok | error

  // ---- Which top-level section is showing ----
  const [view, setView] = useState("team"); // "team" | "contacts"

  const [members, setMembers] = useState([]);
  const [loadError, setLoadError] = useState(false);

  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ---- Contact messages ----
  const [contacts, setContacts] = useState([]);
  const [contactsLoadError, setContactsLoadError] = useState(false);
  const [contactSearchTerm, setContactSearchTerm] = useState("");
  const [expandedContactId, setExpandedContactId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [toast, setToast] = useState({ show: false, message: "", error: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((message, isError = false) => {
    setToast({ show: true, message, error: isError });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  }, []);

  const checkApiStatus = useCallback(async (url) => {
    try {
      const res = await fetch(`${url}/team/all`);
      if (!res.ok) throw new Error("Bad response");
      setApiStatus("ok");
      return true;
    } catch (err) {
      setApiStatus("error");
      return false;
    }
  }, []);

  const loadMembers = useCallback(async (url) => {
    try {
      const res = await fetch(`${url}/team/all`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMembers(data);
      setLoadError(false);
    } catch (err) {
      console.error(err);
      setLoadError(true);
      showToast("Could not load team members", true);
    }
  }, [showToast]);

  const loadContacts = useCallback(async (url) => {
    try {
      const res = await fetch(`${url}/ma-architect/contact/all`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data);
      setContactsLoadError(false);
    } catch (err) {
      console.error(err);
      setContactsLoadError(true);
      showToast("Could not load contact messages", true);
    }
  }, [showToast]);

  const init = useCallback(async (url) => {
    const ok = await checkApiStatus(url);
    if (ok) {
      await loadMembers(url);
      await loadContacts(url);
    }
  }, [checkApiStatus, loadMembers, loadContacts]);

  useEffect(() => {
    init(apiUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  function saveApiUrl() {
    const newUrl = apiUrlInput.trim();
    if (!newUrl) return;
    setApiUrl(newUrl.replace(/\/$/, ""));
  }

  function promptApiUrl() {
    const newUrl = window.prompt("Enter backend API URL:", apiUrl);
    if (newUrl && newUrl.trim()) {
      setApiUrl(newUrl.trim().replace(/\/$/, ""));
    }
  }

  // ---- Filter nav (team view only) ----
  const filterTitles = { all: "All Team Members", active: "Active Members", inactive: "Hidden Members" };
  function setFilter(filter) {
    setView("team");
    setCurrentFilter(filter);
    setSidebarOpen(false);
  }

  function goToContacts() {
    setView("contacts");
    setSidebarOpen(false);
  }

  // ---- Derived stats (team) ----
  const total = members.length;
  const activeCount = members.filter((m) => m.isActive).length;
  const hiddenCount = total - activeCount;
  const withPhotos = members.filter((m) => m.image).length;

  // ---- Filtered / sorted team list ----
  let filtered = members.slice();
  if (currentFilter === "active") filtered = filtered.filter((m) => m.isActive);
  if (currentFilter === "inactive") filtered = filtered.filter((m) => !m.isActive);
  const term = searchTerm.trim().toLowerCase();
  if (term) {
    filtered = filtered.filter(
      (m) => (m.name || "").toLowerCase().includes(term) || (m.role || "").toLowerCase().includes(term)
    );
  }
  filtered = filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // ---- Filtered contact messages ----
  const contactTerm = contactSearchTerm.trim().toLowerCase();
  let filteredContacts = contacts.slice();
  if (contactTerm) {
    filteredContacts = filteredContacts.filter((c) => {
      const full = `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase();
      return (
        full.includes(contactTerm) ||
        (c.email || "").toLowerCase().includes(contactTerm) ||
        (c.subject || "").toLowerCase().includes(contactTerm) ||
        (c.phone || "").toLowerCase().includes(contactTerm)
      );
    });
  }
  filteredContacts = filteredContacts.sort((a, b) => {
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da; // newest first
  });

  // ---- Modal open/close (team member) ----
  function openModal(id = null) {
    setEditingId(id);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (id) {
      const m = members.find((x) => x.id === id);
      if (!m) return;
      setForm({
        name: m.name || "",
        code: m.code || "",
        role: m.role || "",
        description: m.description || "",
        order: m.order ?? "",
        isActive: !!m.isActive,
      });
      setSkills([...(m.skills || [])]);
    } else {
      setForm(emptyForm);
      setSkills([]);
    }
    setSkillInput("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  // ---- Skills chips ----
  function addSkill() {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills((s) => [...s, val]);
    }
    setSkillInput("");
  }
  function removeSkill(index) {
    setSkills((s) => s.filter((_, i) => i !== index));
  }
  function handleSkillKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  // ---- Save (create or update) team member ----
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("code", form.code.trim());
    formData.append("role", form.role.trim());
    formData.append("description", form.description.trim());
    formData.append("skills", JSON.stringify(skills));
    formData.append("order", form.order || "0");
    formData.append("isActive", form.isActive);
    if (imageFile) formData.append("image", imageFile);

    try {
      const url = editingId ? `${apiUrl}/team/${editingId}` : `${apiUrl}/team`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Save failed");
      }

      showToast(editingId ? "Team member updated" : "Team member added");
      closeModal();
      await loadMembers(apiUrl);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong", true);
    } finally {
      setSaving(false);
    }
  }

  // ---- Delete team member ----
  async function deleteMember(id, name) {
    if (!window.confirm(`Delete ${name}? This can't be undone.`)) return;
    try {
      const res = await fetch(`${apiUrl}/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast(`${name} removed`);
      await loadMembers(apiUrl);
    } catch (err) {
      console.error(err);
      showToast("Could not delete team member", true);
    }
  }

  // ---- Delete contact message ----
  async function deleteContact(id, displayName) {
    if (!window.confirm(`Delete message from ${displayName}? This can't be undone.`)) return;
    try {
      const res = await fetch(`${apiUrl}/ma-architect/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Message deleted");
      if (expandedContactId === id) setExpandedContactId(null);
      await loadContacts(apiUrl);
    } catch (err) {
      console.error(err);
      showToast("Could not delete message", true);
    }
  }

  const pageTitle = view === "contacts" ? "Contact Messages" : filterTitles[currentFilter];

  return (
    <div className="sa-root">
      <Styles />

      <div className="app">
        <div
          className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ===== Sidebar ===== */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            &times;
          </button>
          <div className="sidebar-brand">
            <div className="mark">Studio Athenaeum</div>
            <h1 className="serif">Team Dashboard</h1>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">View</div>
            <button
              className={`nav-item ${view === "team" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <span className="dot" /> All Members
              <span className="count">{total}</span>
            </button>

            <div className="nav-section-label" style={{ marginTop: 18 }}>
              Inbox
            </div>
            <button
              className={`nav-item ${view === "contacts" ? "active" : ""}`}
              onClick={goToContacts}
            >
              <span className="dot" /> Contact Messages
              <span className="count">{contacts.length}</span>
            </button>

            <div className="nav-section-label" style={{ marginTop: 18 }}>
              Actions
            </div>
            <button
              className="nav-item"
              onClick={() => {
                setView("team");
                openModal();
                setSidebarOpen(false);
              }}
            >
              <span className="dot" /> Add Team Member
            </button>
            <button
              className="nav-item"
              onClick={() => {
                loadMembers(apiUrl);
                loadContacts(apiUrl);
                setSidebarOpen(false);
              }}
            >
              <span className="dot" /> Refresh Data
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="status-row">
              <span
                className={`status-dot ${apiStatus === "ok" ? "ok" : apiStatus === "error" ? "error" : ""}`}
              />
              <span className="status-text">
                {apiStatus === "ok" ? "API Connected" : apiStatus === "error" ? "API Unreachable" : "Checking API…"}
              </span>
            </div>
            <div className="api-url" onClick={promptApiUrl} title="Click to change API URL">
              {apiUrl}
            </div>
          </div>
        </aside>

        {/* ===== Main ===== */}
        <div className="main">
          <div className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="topbar-title serif">Team Dashboard</span>
          </div>

          <div className="wrap">
            <header className="page-header">
              <div>
                <div className="eyebrow">{view === "contacts" ? "Inbox" : "Team Dashboard"}</div>
                <h2 className="page-title serif">{pageTitle}</h2>
              </div>
              {view === "team" && (
                <button className="btn btn-primary" onClick={() => openModal()}>
                  + Add Team Member
                </button>
              )}
            </header>

            {apiStatus === "error" && (
              <div className="config-banner show">
                <span>
                  API not reachable at <code>{apiUrl}</code>.
                </span>
                <input
                  type="text"
                  value={apiUrlInput}
                  onChange={(e) => setApiUrlInput(e.target.value)}
                  placeholder="http://localhost:5000/api"
                />
                <button className="btn btn-small btn-primary" onClick={saveApiUrl}>
                  Save
                </button>
              </div>
            )}

            {view === "team" ? (
              <>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">{total}</div>
                    <div className="stat-label">Total Members</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">{activeCount}</div>
                    <div className="stat-label">Active on Site</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">{hiddenCount}</div>
                    <div className="stat-label">Hidden</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">{withPhotos}</div>
                    <div className="stat-label">With Photos</div>
                  </div>
                </div>

                <div className="toolbar">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name or role…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="mono" style={{ fontSize: 12, color: "rgba(20,23,31,0.55)" }}>
                    {loadError
                      ? "Failed to load"
                      : `${filtered.length} of ${members.length} member${members.length === 1 ? "" : "s"}`}
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <p className="serif" style={{ fontSize: 18 }}>
                      No team members found.
                    </p>
                    <p style={{ fontSize: 13 }}>Try a different filter or search, or add a new member.</p>
                  </div>
                ) : (
                  <div className="grid">
                    {filtered.map((m) => (
                      <div className="card" key={m.id}>
                        <div
                          className={`card-photo ${m.image ? "" : "empty"}`}
                          style={m.image ? { backgroundImage: `url('${m.image}')` } : undefined}
                        >
                          {!m.image && "No Photo"}
                          <span className="code-tag mono" dangerouslySetInnerHTML={{ __html: escapeHtml(m.code || "") }} />
                          <span className={`status-tag ${m.isActive ? "active" : "inactive"}`}>
                            {m.isActive ? "Active" : "Hidden"}
                          </span>
                        </div>
                        <div className="card-body">
                          <h3 className="serif">{m.name}</h3>
                          <p className="role mono">{m.role}</p>
                          <p className="desc">{m.description}</p>
                          {m.skills && m.skills.length > 0 && (
                            <p
                              className="mono"
                              style={{ fontSize: 11, color: "rgba(20,23,31,0.5)", margin: "0 0 12px" }}
                            >
                              Skills: {m.skills.length}
                            </p>
                          )}
                          <div className="card-actions">
                            <button className="btn btn-ghost btn-small" onClick={() => openModal(m.id)}>
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-small"
                              onClick={() => deleteMember(m.id, m.name)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">{contacts.length}</div>
                    <div className="stat-label">Total Messages</div>
                  </div>
                </div>

                <div className="toolbar">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, email, phone or subject…"
                    value={contactSearchTerm}
                    onChange={(e) => setContactSearchTerm(e.target.value)}
                  />
                  <div className="mono" style={{ fontSize: 12, color: "rgba(20,23,31,0.55)" }}>
                    {contactsLoadError
                      ? "Failed to load"
                      : `${filteredContacts.length} of ${contacts.length} message${contacts.length === 1 ? "" : "s"}`}
                  </div>
                </div>

                {filteredContacts.length === 0 ? (
                  <div className="empty-state">
                    <p className="serif" style={{ fontSize: 18 }}>
                      No contact messages found.
                    </p>
                    <p style={{ fontSize: 13 }}>New submissions from the website will show up here.</p>
                  </div>
                ) : (
                  <div className="contact-list">
                    {filteredContacts.map((c) => {
                      const id = c.id || c._id;
                      const fullName = `${c.firstName || ""} ${c.lastName || ""}`.trim() || "Unknown";
                      const isOpen = expandedContactId === id;
                      return (
                        <div className={`contact-item ${isOpen ? "open" : ""}`} key={id}>
                          <button
                            className="contact-summary"
                            onClick={() => setExpandedContactId(isOpen ? null : id)}
                          >
                            <div className="contact-summary-main">
                              <span className="contact-name serif">{fullName}</span>
                              {c.subject && <span className="contact-subject-tag">{c.subject}</span>}
                            </div>
                            <div className="contact-summary-meta mono">
                              <span>{c.email}</span>
                              <span className="contact-date">{formatDate(c.createdAt)}</span>
                            </div>
                          </button>

                          {isOpen && (
                            <div className="contact-details">
                              <div className="contact-details-grid">
                                <div>
                                  <span className="label">Email</span>
                                  <a href={`mailto:${c.email}`}>{c.email}</a>
                                </div>
                                <div>
                                  <span className="label">Phone</span>
                                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                                </div>
                              </div>
                              <div>
                                <span className="label">Message</span>
                                <p className="contact-message">{c.message}</p>
                              </div>
                              <div className="card-actions" style={{ marginTop: 14 }}>
                                <a
                                  className="btn btn-ghost btn-small"
                                  href={`mailto:${c.email}?subject=${encodeURIComponent(
                                    `Re: ${c.subject || "Your enquiry"}`
                                  )}`}
                                >
                                  Reply by Email
                                </a>
                                <button
                                  className="btn btn-danger btn-small"
                                  onClick={() => deleteContact(id, fullName)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== Modal (team member) ===== */}
      <div
        className={`overlay ${modalOpen ? "show" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal">
          <h2 className="serif">{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
          <p className="sub">
            {editingId
              ? `Editing ${members.find((m) => m.id === editingId)?.name ?? ""}'s profile.`
              : "Fill in the details below."}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mohd Aslam"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Code Tag</label>
                <input
                  type="text"
                  placeholder="e.g. AR·01"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label>Role / Title</label>
              <input
                type="text"
                placeholder="e.g. Principal Architect"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Description / Bio</label>
              <textarea
                placeholder="Full profile description shown on the back of the card…"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Skills / Expertise Tags</label>
              <div className="skills-input-row">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
                <button type="button" className="btn btn-ghost btn-small" onClick={addSkill}>
                  Add
                </button>
              </div>
              <div className="skills-list">
                {skills.map((s, i) => (
                  <span className="skill-chip" key={`${s}-${i}`}>
                    {s}
                    <button type="button" onClick={() => removeSkill(i)}>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Display Order</label>
                <input
                  type="text"
                  placeholder="1"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Photo</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  ref={fileInputRef}
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="toggle-row">
              <input
                type="checkbox"
                id="f-active"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                style={{ width: 16, height: 16 }}
              />
              <label htmlFor="f-active">Visible on website (active)</label>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Save Changes" : "Save Team Member"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={`toast ${toast.show ? "show" : ""} ${toast.error ? "error" : ""}`}>{toast.message}</div>
    </div>
  );
}

function Styles() {
  return (
    <style>{`
  .sa-root {
    --sa-paper: #EFE9DC;
    --sa-paper-deep: #E6DFCE;
    --sa-ink: #14171F;
    --sa-ink-soft: #232838;
    --sa-brass: #A87F4A;
    --sa-brass-light: #D9BD8A;
    --sa-line: rgba(20, 23, 31, 0.14);
    --sa-danger: #B3452C;
    --sa-success: #4C7A5E;
    --sidebar-w: 240px;
    background: var(--sa-paper);
    color: var(--sa-ink);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
  }
  .sa-root * { box-sizing: border-box; }

  .serif { font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', serif; }
  .mono { font-family: 'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace; }

  .app { display: flex; min-height: 100vh; position: relative; }

  .sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    background: var(--sa-ink);
    color: var(--sa-paper);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 60;
    transition: transform 0.28s ease;
  }

  .sidebar-brand {
    padding: 24px 22px 18px;
    border-bottom: 1px solid rgba(239,233,220,0.12);
    position: relative;
  }
  .sidebar-brand .mark {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--sa-brass-light);
    margin-bottom: 8px;
  }
  .sidebar-brand .mark::before {
    content: "";
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sa-brass-light);
  }
  .sidebar-brand h1 { font-size: 19px; margin: 0; line-height: 1.25; }

  .sidebar-nav { flex: 1; padding: 18px 12px; overflow-y: auto; }
  .nav-section-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(239,233,220,0.4);
    padding: 6px 10px 8px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: rgba(239,233,220,0.75);
    font-family: inherit;
    font-size: 13.5px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 2px;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .nav-item .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.5; flex-shrink: 0; }
  .nav-item:hover { background: rgba(239,233,220,0.06); color: var(--sa-paper); }
  .nav-item.active { background: rgba(217,189,138,0.14); color: var(--sa-brass-light); }
  .nav-item .count {
    margin-left: auto;
    font-size: 11px;
    background: rgba(239,233,220,0.1);
    padding: 1px 8px;
    border-radius: 999px;
  }
  .nav-item.active .count { background: rgba(217,189,138,0.22); }

  .sidebar-footer { padding: 16px 18px 20px; border-top: 1px solid rgba(239,233,220,0.12); }
  .sidebar-footer .status-row { display: flex; align-items: center; gap: 8px; font-size: 11.5px; letter-spacing: 0.04em; }
  .sidebar-footer .status-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(239,233,220,0.3); flex-shrink: 0; }
  .sidebar-footer .status-dot.ok { background: #7FBF9E; box-shadow: 0 0 0 3px rgba(127,191,158,0.18); }
  .sidebar-footer .status-dot.error { background: #E08769; box-shadow: 0 0 0 3px rgba(224,135,105,0.18); }
  .sidebar-footer .status-text { color: rgba(239,233,220,0.6); }
  .sidebar-footer .api-url {
    font-size: 10.5px;
    color: rgba(239,233,220,0.35);
    margin-top: 6px;
    word-break: break-all;
    cursor: pointer;
    text-decoration: underline dotted;
  }

  .sidebar-close {
    display: none;
    position: absolute;
    top: 16px; right: 14px;
    background: none;
    border: none;
    color: rgba(239,233,220,0.6);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }

  .sidebar-backdrop { display: none; position: fixed; inset: 0; background: rgba(20,23,31,0.5); z-index: 55; }
  .sidebar-backdrop.show { display: block; }

  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-width: 0;
    background-image:
      linear-gradient(var(--sa-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--sa-line) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  .topbar {
    display: none;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: var(--sa-paper);
    border-bottom: 1px solid var(--sa-line);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .hamburger {
    background: none;
    border: 1px solid var(--sa-line);
    border-radius: 8px;
    width: 38px; height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }
  .hamburger svg { width: 18px; height: 18px; }
  .topbar .topbar-title { font-size: 15px; font-weight: 600; }

  .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 32px 80px; }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
    border-bottom: 2px solid var(--sa-ink);
    padding-bottom: 20px;
  }

  .page-header .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--sa-brass);
    border: 1px solid var(--sa-brass);
    background: rgba(168,127,74,0.08);
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 10px;
  }
  .page-header .eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--sa-brass); }

  .page-title { font-size: clamp(24px, 4vw, 32px); margin: 0; letter-spacing: -0.01em; }

  .btn {
    appearance: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    letter-spacing: 0.04em;
    padding: 11px 20px;
    border-radius: 8px;
    transition: transform 0.15s ease, opacity 0.15s ease;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.6; cursor: default; transform: none; }
  .btn-primary { background: var(--sa-ink); color: var(--sa-paper); }
  .btn-primary:hover { opacity: 0.9; }
  .btn-ghost { background: transparent; border: 1px solid var(--sa-line); color: var(--sa-ink); }
  .btn-danger { background: transparent; border: 1px solid var(--sa-danger); color: var(--sa-danger); }
  .btn-danger:hover { background: rgba(179,69,44,0.08); }
  .btn-small { padding: 7px 14px; font-size: 12px; }

  .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }

  .search-input {
    border: 1px solid var(--sa-line);
    border-radius: 8px;
    padding: 9px 14px;
    font-family: inherit;
    font-size: 13px;
    background: white;
    min-width: 200px;
    flex: 1;
    max-width: 320px;
  }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; }

  .card {
    background: white;
    border: 1px solid var(--sa-line);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(20,23,31,0.06);
    display: flex;
    flex-direction: column;
  }

  .card-photo { height: 150px; background: var(--sa-ink); background-size: cover; background-position: center; position: relative; }
  .card-photo.empty { display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.35); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; }
  .card-photo .code-tag {
    position: absolute; top: 10px; left: 10px;
    background: rgba(20,23,31,0.6);
    color: var(--sa-brass-light);
    font-size: 10px;
    letter-spacing: 0.15em;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .card-photo .status-tag {
    position: absolute; top: 10px; right: 10px;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .status-tag.active { background: rgba(76,122,94,0.85); color: white; }
  .status-tag.inactive { background: rgba(179,69,44,0.85); color: white; }

  .card-body { padding: 16px 18px 18px; flex: 1; display: flex; flex-direction: column; }
  .card-body h3 { margin: 0 0 2px; font-size: 17px; }
  .card-body .role { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--sa-brass); margin: 0 0 10px; }
  .card-body .desc {
    font-size: 12.5px;
    line-height: 1.5;
    color: rgba(20,23,31,0.65);
    margin: 0 0 12px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-actions { display: flex; gap: 8px; margin-top: auto; }
  .card-actions .btn { flex: 1; justify-content: center; }

  /* ---- Contact messages (Inbox) ---- */
  .contact-list { display: flex; flex-direction: column; gap: 10px; }
  .contact-item {
    background: white;
    border: 1px solid var(--sa-line);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(20,23,31,0.04);
  }
  .contact-item.open { box-shadow: 0 10px 28px rgba(20,23,31,0.08); }
  .contact-summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    padding: 16px 18px;
    font-family: inherit;
  }
  .contact-summary-main { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .contact-name { font-size: 15px; }
  .contact-subject-tag {
    font-size: 10.5px;
    letter-spacing: 0.05em;
    color: var(--sa-brass);
    background: rgba(168,127,74,0.1);
    border: 1px solid rgba(168,127,74,0.35);
    padding: 3px 10px;
    border-radius: 999px;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contact-summary-meta { display: flex; align-items: center; gap: 14px; font-size: 11.5px; color: rgba(20,23,31,0.5); }
  .contact-date { color: rgba(20,23,31,0.4); }

  .contact-details { padding: 0 18px 18px; border-top: 1px solid var(--sa-line); }
  .contact-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 16px 0;
  }
  .contact-details .label {
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(20,23,31,0.45);
    margin-bottom: 4px;
  }
  .contact-details a { color: var(--sa-ink); font-size: 13px; text-decoration: underline dotted; }
  .contact-message {
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(20,23,31,0.75);
    background: var(--sa-paper-deep);
    border-radius: 10px;
    padding: 14px 16px;
    margin: 4px 0 0;
    white-space: pre-wrap;
  }

  .overlay {
    position: fixed; inset: 0;
    background: rgba(20,23,31,0.55);
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 16px;
    overflow-y: auto;
    z-index: 70;
  }
  .overlay.show { display: flex; }

  .modal {
    background: var(--sa-paper);
    border-radius: 16px;
    border: 1px solid var(--sa-line);
    max-width: 560px;
    width: 100%;
    padding: 28px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
  }
  .modal h2 { margin: 0 0 4px; font-size: 22px; }
  .modal .sub { font-size: 12px; color: rgba(20,23,31,0.5); margin: 0 0 22px; }

  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(20,23,31,0.55); margin-bottom: 6px; }
  .field input[type="text"], .field textarea {
    width: 100%;
    border: 1px solid var(--sa-line);
    border-radius: 8px;
    padding: 10px 12px;
    font-family: inherit;
    font-size: 14px;
    background: white;
    color: var(--sa-ink);
  }
  .field textarea { resize: vertical; min-height: 90px; }
  .field input[type="file"] { font-size: 13px; width: 100%; }
  .field-row { display: flex; gap: 12px; }
  .field-row .field { flex: 1; min-width: 0; }

  .skills-input-row { display: flex; gap: 8px; }
  .skills-input-row input { flex: 1; }
  .skills-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: white;
    border: 1px solid var(--sa-line);
    border-radius: 999px;
    padding: 5px 6px 5px 12px;
    font-size: 12px;
  }
  .skill-chip button { background: none; border: none; cursor: pointer; color: var(--sa-danger); font-size: 14px; line-height: 1; padding: 2px 4px; }

  .toggle-row { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .toggle-row label { font-size: 13px; }

  .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

  .empty-state { text-align: center; padding: 60px 20px; color: rgba(20,23,31,0.5); }

  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--sa-ink);
    color: white;
    padding: 12px 22px;
    border-radius: 999px;
    font-size: 13px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
    z-index: 100;
    max-width: calc(100vw - 32px);
    text-align: center;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .toast.error { background: var(--sa-danger); }

  .config-banner {
    background: rgba(168,127,74,0.1);
    border: 1px solid var(--sa-brass);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 12.5px;
    margin-bottom: 24px;
    display: none;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .config-banner.show { display: flex; }
  .config-banner input { font-family: 'Courier New', monospace; font-size: 12px; border: 1px solid var(--sa-line); border-radius: 6px; padding: 6px 10px; flex: 1; min-width: 180px; }

  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: white; border: 1px solid var(--sa-line); border-radius: 12px; padding: 18px 20px; }
  .stat-card .stat-num { font-size: 28px; font-weight: 600; }
  .stat-card .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(20,23,31,0.5); margin-top: 4px; }

  @media (max-width: 900px) {
    .sidebar { transform: translateX(-100%); width: min(280px, 82vw); }
    .sidebar.open { transform: translateX(0); }
    .sidebar-close { display: block; }
    .main { margin-left: 0; }
    .topbar { display: flex; }
    .wrap { padding: 24px 18px 60px; }
    .page-header { flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 640px) {
    .wrap { padding: 20px 14px 50px; }
    .grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .card-photo { height: 110px; }
    .card-body { padding: 12px; }
    .card-body h3 { font-size: 14px; }
    .card-body .desc { -webkit-line-clamp: 2; font-size: 11.5px; }
    .card-actions { flex-direction: column; gap: 6px; }
    .btn-small { padding: 8px 10px; font-size: 11px; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-input { max-width: none; }
    .field-row { flex-direction: column; gap: 0; }
    .modal { padding: 20px; border-radius: 14px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .contact-details-grid { grid-template-columns: 1fr; }
    .contact-summary { padding: 14px; }
  }

  @media (max-width: 400px) {
    .grid { grid-template-columns: 1fr; }
  }
    `}</style>
  );
}