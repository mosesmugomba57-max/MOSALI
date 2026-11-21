import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const SALIM_USER = {
  id: "usr_salim",
  name: "Salim",
  email: "salomonsterk@gmail.com",
  avatar: null, // No faces - sleek monogram icon
  plan: "Premium Ultra HD",
  language: "English",
  videoQuality: "1080p",
  autoplayNext: true,
  autoplayPreviews: true,
  notificationsEnabled: true,
  memberSince: "November 2026",
};

export function AuthProvider({ children }) {
  // Current active logged-in user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("mosali_current_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Replace previous Alex Vance account if it was saved
        if (parsed.email === "alex@mosali.tv") return SALIM_USER;
        return parsed;
      }
      return SALIM_USER;
    } catch {
      return SALIM_USER;
    }
  });

  // Mock database of registered users
  const [userDatabase, setUserDatabase] = useState(() => {
    try {
      const saved = localStorage.getItem("mosali_user_db");
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter((u) => u.email !== "alex@mosali.tv");
        if (!filtered.some((u) => u.email === "salomonsterk@gmail.com")) {
          return [SALIM_USER, ...filtered];
        }
        return filtered;
      }
      return [SALIM_USER];
    } catch {
      return [SALIM_USER];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("mosali_current_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("mosali_current_user");
      }
    } catch (err) {
      console.error("Failed to save auth state to localStorage", err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("mosali_user_db", JSON.stringify(userDatabase));
    } catch (err) {
      console.error("Failed to save user database", err);
    }
  }, [userDatabase]);

  // Login action accepting email or username "salim" with password "salim"
  const login = async (identifier, password) => {
    await new Promise((r) => setTimeout(r, 200));

    const idClean = identifier.trim().toLowerCase();
    const passClean = password.trim();

    // Check for Salim credentials
    if (
      (idClean === "salomonsterk@gmail.com" || idClean === "salim") &&
      passClean === "salim"
    ) {
      setUser(SALIM_USER);
      return { success: true, user: SALIM_USER };
    }

    if (
      (idClean === "salomonsterk@gmail.com" || idClean === "salim") &&
      passClean !== "salim"
    ) {
      return { success: false, error: "Incorrect password. For Salim, use password: salim" };
    }

    // Check user database
    const found = userDatabase.find(
      (u) =>
        u.email.toLowerCase() === idClean ||
        u.name.toLowerCase() === idClean
    );

    if (!found) {
      return {
        success: false,
        error: "No account found. Use email: salomonsterk@gmail.com or username: salim (password: salim).",
      };
    }

    if (found.password && found.password !== passClean) {
      return { success: false, error: "Incorrect password." };
    }

    setUser(found);
    return { success: true, user: found };
  };

  // Register action
  const register = async (name, email, password, plan = "Premium") => {
    await new Promise((r) => setTimeout(r, 200));

    const existing = userDatabase.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      avatar: null,
      plan: plan === "Free" ? "Free Plan" : "Premium Ultra HD",
      language: "English",
      videoQuality: "1080p",
      autoplayNext: true,
      autoplayPreviews: true,
      notificationsEnabled: true,
      memberSince: "November 2026",
    };

    setUserDatabase((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout action
  const logout = () => {
    setUser(null);
  };

  // Update profile
  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setUserDatabase((prev) =>
      prev.map((u) => (u.id === user.id ? updated : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
