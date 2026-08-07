/* -------------------------------------- */
/* Class Name Combiner (like clsx) */
/* -------------------------------------- */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};


/* -------------------------------------- */
/* Scroll to Top */
/* -------------------------------------- */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


/* -------------------------------------- */
/* Format Date */
/* -------------------------------------- */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


/* -------------------------------------- */
/* Truncate Text */
/* -------------------------------------- */
export const truncateText = (text, limit = 100) => {
  if (!text) return "";
  return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;
};


/* -------------------------------------- */
/* Slug Generator */
/* -------------------------------------- */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};


/* -------------------------------------- */
/* Debounce Function */
/* -------------------------------------- */
export const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


/* -------------------------------------- */
/* Copy to Clipboard */
/* -------------------------------------- */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Copy failed", err);
    return false;
  }
};


/* -------------------------------------- */
/* Validate Email */
/* -------------------------------------- */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


/* -------------------------------------- */
/* Capitalize First Letter */
/* -------------------------------------- */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};