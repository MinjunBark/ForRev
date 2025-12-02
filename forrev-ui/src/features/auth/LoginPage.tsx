import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import api from '../../http-client';
import { login } from '../../services/auth-service';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const loginData = await login(formData.username, formData.password);
            console.log('Login Success:', loginData);

            const userData = await api.get('/auth/user/');
            console.log('User Data:', userData);

            if (userData.data.isAuthenticated){
                navigate({ to:'/'});
            }else {
                setError('Authentication Failed');
            }
        } catch (err) {
            if (axios.isAxiosError(err)){
                const message = err.response?.data?.error || err.response?.data?.detail || 'Login Failed';
                setError(message);
            }else{
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', // dark gradient
            fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
            <div style={{
            backgroundColor: '#1f1f1f', // dark card background
            padding: '48px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            width: '100%',
            maxWidth: '440px',
            position: 'relative',
            overflow: 'hidden',
            color: '#f5f5f5', // text color
            }}>
            {/* Top decorative bar */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)', // cyan accent top bar
            }} />

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
                }}>Welcome Back</h1>
                <p style={{ color: '#ccc', fontSize: '15px' }}>Sign in to continue</p>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                padding: '14px',
                marginBottom: '24px',
                backgroundColor: '#330000',
                color: '#ff6b6b',
                borderRadius: '10px',
                fontSize: '14px',
                textAlign: 'center',
                }}>
                {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#ccc' }}>Username</label>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#999' }}>👤</span>
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px 16px 14px 48px',
                        fontSize: '15px',
                        border: '2px solid #444',
                        borderRadius: '12px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        backgroundColor: '#2b2b2b',
                        color: '#f5f5f5',
                        outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#00c6ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#444'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#ccc' }}>Password</label>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#999' }}>🔒</span>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px 16px 14px 48px',
                        fontSize: '15px',
                        border: '2px solid #444',
                        borderRadius: '12px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        backgroundColor: '#2b2b2b',
                        color: '#f5f5f5',
                        outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#00c6ff'; e.target.style.boxShadow = '0 0 0 3px rgba(0,198,255,0.2)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#444'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    background: isLoading ? '#555' : 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(0,198,255,0.4)',
                }}
                >
                {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '14px', color: '#ccc' }}>
                Don't have an account?{' '}
                <a href="/register" style={{ color: '#00c6ff', textDecoration: 'none', fontWeight: '600' }}>
                Sign up
                </a>
            </div>
            </div>
        </div>
    );

};

export default LoginPage;