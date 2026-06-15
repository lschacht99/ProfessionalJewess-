// The status vocabularies the matching workflow moves through.
// Used by the Worker (and ready for the dashboards) so the data model matches
// the curated, admin-driven flow rather than an open marketplace.

export const STUDENT_STATUS = [
  "draft",            // application started
  "submitted",
  "under_review",
  "more_info_needed",
  "waitlisted",
  "match_in_progress",
  "matched",
  "session_scheduled",
  "active",
  "completed",
];

export const MENTOR_STATUS = [
  "draft",
  "submitted",
  "under_review",
  "approved",
  "paused",
  "matched",
  "active",
  "alumni",
];

export const MATCH_STATUS = [
  "suggested",
  "contacted_mentor",
  "mentor_accepted",
  "student_accepted",
  "intro_sent",
  "first_session_scheduled",
  "active",
  "needs_follow_up",
  "closed",
];

// Mentor visibility — private by default. Controls how much (if anything)
// appears in curated previews. Names are never public until "public".
export const VISIBILITY = ["private", "members", "public"];
