import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProduct } from "../services/productService";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------- inline style system ----------
  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "1rem",
      boxSizing: "border-box",
      backgroundAttachment: "fixed",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      // Base fallback color (actual animated background comes from <style> below)
      backgroundColor: "#0f172a",
    },
    container: {
      width: "100%",
      maxWidth: 520,
      margin: "80px auto 32px",
      position: "relative",
    },
    card: {
      background: "rgba(15, 23, 42, 0.95)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(61,214,208,0.2)",
      borderRadius: 16,
      padding: "24px",
      boxShadow:
        "0 0 60px rgba(61,214,208,0.1), 0 20px 25px -5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    title: {
      margin: 0,
      color: "#f8fafc",
      fontWeight: 700,
      fontSize: "1.875rem",
      lineHeight: 1.2,
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 0,
      color: "#94a3b8",
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      marginTop: "6px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      color: "#cbd5e1",
      fontSize: "0.9rem",
      fontWeight: 600,
    },
    inputBase: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(30,41,59,0.8)",
      border: "1px solid rgba(71,85,105,0.5)",
      borderRadius: 8,
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.25s ease",
      boxSizing: "border-box",
    },
    textarea: {
      minHeight: 110,
      resize: "vertical",
    },
    rowActions: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "10px",
      marginTop: "6px",
    },
    primaryButton: {
      width: "100%",
      border: "none",
      borderRadius: 8,
      padding: "14px 18px",
      fontWeight: 700,
      fontSize: "0.95rem",
      cursor: "pointer",
      color: "#0f172a",
      backgroundImage: "linear-gradient(135deg, #3dd6d0, #06b6d4)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
    },
    ghostButton: {
      width: "100%",
      borderRadius: 8,
      padding: "12px 16px",
      fontWeight: 600,
      fontSize: "0.95rem",
      cursor: "pointer",
      color: "#3dd6d0",
      background: "transparent",
      border: "1px solid rgba(61,214,208,0.35)",
      transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
    },
    error: {
      background: "rgba(244,63,94,0.15)",
      border: "1px solid rgba(244,63,94,0.35)",
      color: "#fecdd3",
      padding: "10px 12px",
      borderRadius: 8,
      fontSize: "0.9rem",
      margin: "8px 0 4px",
    },
    footerNote: {
      marginTop: 12,
      color: "#64748b",
      fontSize: "0.8rem",
      textAlign: "center",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.price) {
      setError("Title, category, and price are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await addProduct(productData);
      alert("Product added successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-bg" style={styles.page}>
      {/* Inline CSS for animations, focus states, placeholders & responsive tweaks */}
      <style>{`
        /* Starfield + nebula gradient background (fixed, animated) */
        .space-bg {
          background:
            radial-gradient(ellipse at top, rgba(29, 78, 216, 0.15), transparent 50%),
            radial-gradient(ellipse at bottom, rgba(147, 51, 234, 0.1), transparent 50%),
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
          background-repeat: repeat;
          background-size: 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px;

        }
        @keyframes nebulaShift {
          0%, 100% {
            background-position: 0% 0%, 0% 100%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          }
          50% {
            background-position: 100% 50%, 100% 50%, 50% 50%, 25% 75%, 75% 25%, 60% 90%, 80% 10%;
          }
        }

        /* Inputs: focus ring, placeholder, disabled */
        .ap-input::placeholder { color: #64748b; }
        .ap-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .ap-input:focus {
          border-color: #3dd6d0 !important;
          box-shadow:
            0 0 0 3px rgba(61,214,208,0.2),
            0 0 20px rgba(61,214,208,0.25);
          background: rgba(30,41,59,0.95);
        }

        /* Buttons: hover/active/disabled */
        .ap-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 10px 20px rgba(61,214,208,0.3),
            0 0 30px rgba(61,214,208,0.2);
        }
        .ap-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .ap-btn-ghost:hover:not(:disabled) {
          background: rgba(61,214,208,0.1);
          border-color: #3dd6d0;
          transform: translateY(-1px);
        }
        .ap-btn-ghost:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* Responsive */
        @media (max-width: 768px) {
          .ap-card { padding: 18px !important; border-radius: 12px !important; }
          .ap-title { font-size: 1.5rem !important; }
          .ap-sub { font-size: 0.85rem !important; }
        }
        @media (max-width: 480px) {
          .ap-card { padding: 14px !important; }
          .ap-title { font-size: 1.25rem !important; }
        }
      `}</style>

      <Navbar />

      <div style={styles.container}>
        <div className="ap-card" style={styles.card}>
          <header style={styles.header}>
            <h1 className="ap-title" style={styles.title}>List a New Product</h1>
            <p className="ap-sub" style={styles.subtitle}>
              Showcase your eco-friendly product. Crisp details help buyers decide faster.
            </p>
          </header>

          {error ? <div style={styles.error}>{error}</div> : null}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label htmlFor="title" style={styles.label}>Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="ap-input"
                style={styles.inputBase}
                value={formData.title}
                onChange={handleChange}
                placeholder="Bamboo Toothbrush"
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="description" style={styles.label}>Description</label>
              <textarea
                id="description"
                name="description"
                className="ap-input"
                style={{ ...styles.inputBase, ...styles.textarea }}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell buyers what makes this product sustainable and awesome…"
                rows={5}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="category" style={styles.label}>Category</label>
              <input
                id="category"
                name="category"
                type="text"
                className="ap-input"
                style={styles.inputBase}
                value={formData.category}
                onChange={handleChange}
                placeholder="Hygiene / Home / Apparel…"
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="price" style={styles.label}>Price (Rs)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                className="ap-input"
                style={styles.inputBase}
                value={formData.price}
                onChange={handleChange}
                placeholder="9.99"
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="image" style={styles.label}>Image URL (Optional)</label>
              <input
                id="image"
                name="image"
                type="url"
                className="ap-input"
                style={styles.inputBase}
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/your-image.jpg"
              />
            </div>

            <div style={styles.rowActions}>
              <button
                type="submit"
                disabled={loading}
                className="ap-btn-primary"
                style={styles.primaryButton}
              >
                {loading ? "Listing..." : "List Product"}
              </button>

              <button
                type="button"
                className="ap-btn-ghost"
                style={styles.ghostButton}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>

          <div style={styles.footerNote}>
            Pro tip: great photos + specific materials = higher conversion 🚀
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
