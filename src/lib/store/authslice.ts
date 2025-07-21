import authService from "@/appwrite/auth";
import { AuthCredentials, AuthState, RegisterData, User } from "@/types/reduxTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState : AuthState = {
    user : null,
    isAuthenticated: false,
    loading : false,
    error: null
}

export const loginUser = createAsyncThunk<
    User,
    AuthCredentials,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            await authService.login(credentials)
            const user = await authService.getCurrentUser()
            if (!user) {
                return rejectWithValue('Failed to get user data')
            }
            return user as User
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed')
        }
    }
)

export const registerUser = createAsyncThunk<
    User,
    RegisterData,
    { rejectValue: string }
>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            await authService.createAccount(userData)
            const user = await authService.getCurrentUser()
            if (!user) {
                return rejectWithValue('Failed to get user data after registration')
            }
            return user as User
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed')
        }
    }
)

export const logoutUser = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout()
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed')
        }
    }
)

export const checkAuth = createAsyncThunk<
    User | null,
    void,
    { rejectValue: string }
>(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.getCurrentUser()
            return user as User | null
        } catch (error: any) {
            return rejectWithValue(error.message || 'Auth check failed')
        }
    }
)

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        clearError : (state)=>{
            state.error = null
        },
        resetAuth : (state)=>{
                        state.user = null 
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload || 'Login failed'
            })

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload || 'Registration failed'
            })

        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Logout failed'
            })

        // Check Auth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.user = action.payload
                    state.isAuthenticated = true
                } else {
                    state.user = null
                    state.isAuthenticated = false
                }
                state.error = null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload || 'Auth check failed'
            })
    },
})

export const { clearError, resetAuth } = authSlice.actions
export default authSlice.reducer
    
