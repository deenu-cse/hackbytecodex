const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchColleges(filters = {}, pagination = { page: 1, limit: 12 }) {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.city) queryParams.append("city", filters.city);
    if (filters.state) queryParams.append("state", filters.state);
    if (filters.tier) queryParams.append("tier", filters.tier);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.minRating) queryParams.append("minRating", filters.minRating);
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    
    queryParams.append("page", pagination.page);
    queryParams.append("limit", pagination.limit);
    
    const response = await fetch(`${API_BASE_URL}/public/colleges?${queryParams}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch colleges");
    const result = await response.json();
    
    return {
      colleges: result.data || [],
      total: result.meta?.pagination?.total || 0,
      totalPages: result.meta?.pagination?.pages || 0,
      raw: result
    };
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return { colleges: [], total: 0, totalPages: 0 };
  }
}

export async function fetchCollegeByName(collegeName) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/colleges/name/${encodeURIComponent(collegeName)}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch college");
    }
    const result = await response.json();
    console.log('result', result)
    return result.data || null;
  } catch (error) {
    console.error("Error fetching college:", error);
    return null;
  }
}

export async function fetchCollegeClubs(collegeName) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/colleges/name/${encodeURIComponent(collegeName)}/clubs`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch clubs");
    const result = await response.json();
    return result.data || [];
    console.log('result', result)
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }
}

export async function fetchFilterOptions() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/colleges/filters/options`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch filter options");
    const result = await response.json();
    console.log('result', result)
    return result.data || { cities: [], states: [], tiers: ["BRONZE", "SILVER", "GOLD", "PLATINUM"] };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return { cities: [], states: [], tiers: ["BRONZE", "SILVER", "GOLD", "PLATINUM"] };
  }
}

export async function fetchCollegeLeaderboard(limit = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/colleges/leaderboard?limit=${limit}`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch leaderboard");
    const result = await response.json();
    console.log('result', result)
    return result.data || [];
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
