const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

const getHeaders = (includeAuth = false) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  
  if (includeAuth) {
    const token = authAPI.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Signup failed");
    }

    return response.json();
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
  },

  removeToken(): void {
    localStorage.removeItem("authToken");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem("user");
  },

  logout(): void {
    this.removeToken();
    this.removeUser();
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export const apiCall = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authAPI.logout();
        window.location.href = "/login";
      }
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authAPI.logout();
        window.location.href = "/login";
      }
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authAPI.logout();
        window.location.href = "/login";
      }
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        authAPI.logout();
        window.location.href = "/login";
      }
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  },
};
