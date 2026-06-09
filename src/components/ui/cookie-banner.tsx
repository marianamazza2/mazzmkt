import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TransitionLink } from "@/components/transition/transition-link";
import { loadAnalytics } from "@/lib/analytics";

const STORAGE_KEY = "mazzmkt_cookie_consent";

interface Preferences {
  analytics: boolean;
}

function getStored(): { decision: string; prefs: Preferences } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function save(prefs: Preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ decision: "custom", prefs }));
}

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const stored = getStored();
    if (!stored) {
      setVisible(true);
    } else if (stored.prefs?.analytics) {
      loadAnalytics();
    }
  }, []);

  function acceptAll() {
    save({ analytics: true });
    loadAnalytics();
    setVisible(false);
  }

  function rejectAll() {
    save({ analytics: false });
    setVisible(false);
  }

  function savePreferences() {
    save({ analytics });
    if (analytics) loadAnalytics();
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99]"
            style={{ background: "rgba(20, 20, 20, 0.7)", backdropFilter: "blur(2px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-5"
          >
            <div
              className="w-full max-w-md"
              style={{
                background: "#141414",
                border: "0.5px solid rgba(241, 237, 225, 0.12)",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                {!showPrefs ? (
                  /* ── Vista principal ── */
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="px-7 py-7"
                  >
                    <p
                      className="text-[#f1ede1] mb-3 font-sans"
                      style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}
                    >
                      {t("cookies_banner.title")}
                    </p>
                    <p
                      className="font-sans mb-6"
                      style={{ fontSize: "12px", fontWeight: 400, lineHeight: 1.7, color: "rgba(241,237,225,0.5)", letterSpacing: "0.01em" }}
                    >
                      {t("cookies_banner.body")}{" "}
                      <TransitionLink
                        to="/cookies"
                        className="transition-colors"
                        style={{ color: "rgba(241,237,225,0.7)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                        onClick={() => setVisible(false)}
                      >
                        {t("cookies_banner.link")}
                      </TransitionLink>
                      .
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={acceptAll}
                        className="font-sans w-full cursor-pointer transition-colors"
                        style={{
                          fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                          color: "#141414", background: "#f1ede1", padding: "13px 0", border: "none", borderRadius: "2px",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#ffffff")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#f1ede1")}
                      >
                        {t("cookies_banner.accept_all")}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPrefs(true)}
                          className="font-sans flex-1 cursor-pointer transition-colors"
                          style={{
                            fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                            color: "rgba(241,237,225,0.5)", background: "transparent", padding: "13px 0",
                            border: "0.5px solid rgba(241,237,225,0.1)", borderRadius: "2px",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "rgba(241,237,225,0.8)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(241,237,225,0.5)")}
                        >
                          {t("cookies_banner.preferences")}
                        </button>
                        <button
                          onClick={rejectAll}
                          className="font-sans flex-1 cursor-pointer transition-colors"
                          style={{
                            fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                            color: "rgba(241,237,225,0.5)", background: "transparent", padding: "13px 0",
                            border: "0.5px solid rgba(241,237,225,0.1)", borderRadius: "2px",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "rgba(241,237,225,0.8)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(241,237,225,0.5)")}
                        >
                          {t("cookies_banner.reject")}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Vista preferencias ── */
                  <motion.div
                    key="prefs"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    className="px-7 py-7"
                  >
                    <button
                      onClick={() => setShowPrefs(false)}
                      className="flex items-center gap-2 mb-5 cursor-pointer transition-colors"
                      style={{ color: "rgba(241,237,225,0.35)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "none", padding: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(241,237,225,0.7)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(241,237,225,0.35)")}
                    >
                      {t("cookies_banner.back")}
                    </button>

                    <p
                      className="text-[#f1ede1] mb-5 font-sans"
                      style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}
                    >
                      {t("cookies_banner.preferences")}
                    </p>

                    <div className="flex flex-col gap-4 mb-7">
                      <CookieRow
                        title={t("cookies_banner.necessary_title")}
                        description={t("cookies_banner.necessary_desc")}
                        enabled={true}
                        locked
                      />
                      <CookieRow
                        title={t("cookies_banner.analytics_title")}
                        description={t("cookies_banner.analytics_desc")}
                        enabled={analytics}
                        onChange={setAnalytics}
                      />
                    </div>

                    <button
                      onClick={savePreferences}
                      className="font-sans w-full cursor-pointer transition-colors"
                      style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "#141414", background: "#f1ede1", padding: "13px 0", border: "none", borderRadius: "2px",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#ffffff")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#f1ede1")}
                    >
                      {t("cookies_banner.save")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CookieRow({
  title,
  description,
  enabled,
  locked,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onChange?: (val: boolean) => void;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 pb-4"
      style={{ borderBottom: "0.5px solid rgba(241,237,225,0.07)" }}
    >
      <div className="flex-1">
        <p className="font-sans mb-1" style={{ fontSize: "12px", fontWeight: 500, color: "#f1ede1", letterSpacing: "0.03em" }}>
          {title}
        </p>
        <p className="font-sans" style={{ fontSize: "11px", fontWeight: 400, color: "rgba(241,237,225,0.4)", lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => !locked && onChange?.(!enabled)}
        className={locked ? "cursor-default" : "cursor-pointer"}
        style={{ background: "none", border: "none", padding: 0, flexShrink: 0, marginTop: "2px" }}
        aria-label={`Toggle ${title}`}
      >
        <div
          style={{
            width: "36px", height: "20px", borderRadius: "10px",
            background: enabled ? "#f1ede1" : "rgba(241,237,225,0.12)",
            position: "relative",
            transition: "background 0.2s",
            opacity: locked ? 0.4 : 1,
          }}
        >
          <div
            style={{
              position: "absolute", top: "3px",
              left: enabled ? "19px" : "3px",
              width: "14px", height: "14px", borderRadius: "50%",
              background: enabled ? "#141414" : "rgba(241,237,225,0.5)",
              transition: "left 0.2s",
            }}
          />
        </div>
      </button>
    </div>
  );
}
